'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";
import Mesas from "../interfaces/mesas";

export default function Mesa() {
  const [mesas, setMesas] = useState<Mesas[]>([]);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verMesas = async () => {
      try {
        const response = await fetch(`${apiURL}/mesa`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMesas(data.mesas)
          
        } else {
          const errorData = await response.json();
          setError(errorData.mensagem || "Erro ao carregar mesas.");
        }
      } catch (err) {
        console.error("Erro ao carregar mesas:", err);
        setError("Erro de conexão com o servidor.");
      }
    };

    verMesas();
  }, []);

  const mesasPData = async (e: FormEvent) => {
    e.preventDefault();

    if(!data){
      setError("Insira uma data válida")
    }
    const dataCheck = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataCheck.test(data)) {
      setError("Data inválida. Use o formato yyyy-mm-dd.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/mesa/disponibilidade?data=${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
       const data = await response.json()

       if (data.mesas.length === 0){
        setError("Não há mesa disponivel para esta data")
        setMesas([]);
       }
        setMesas(data.mesas);
        setSuccessMessage("Mesas disponíveis")
      } else {
        const errorData = await response.json()
        setError(errorData.mensagem || "Erro ao buscar mesas");
      }
    } catch (err) {
      console.error("Erro ao buscar mesas: ", err)
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="main">
      <div className="form">
        <h1>Lista de Mesas</h1>

        <form onSubmit={mesasPData}>
          <div className="input">
            <label htmlFor="data">Data: </label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="yyyy-mm-dd"
              required
            />
          </div>
          <button  className="button" type="submit">Buscar por Data</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <div className="lista">
          <h2>Mesas Cadastradas</h2>
          {mesas.length === 0 ? (
            <p>Nenhuma mesa encontrada.</p>
          ) : (
            <ul className="lista">
              {mesas.map((mesa) => (
                <li className="item" key={mesa.id}>
                  <strong>Código:</strong> {mesa.codigo}
                  <strong>Lugares:</strong> {mesa.n_lugares}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="botaorota" title ="Efetuar reserva" onClick ={() => router.push('/CadastrarM')}>Nova Mesa</button>
      </div>
    </div>
  );
}