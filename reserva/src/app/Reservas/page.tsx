'use client'

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";

export default function Reservas() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const [perfil, setPerfil] = useState<any>(null);

  const route = useRouter();

  useEffect(() => {
    const verReservas = async () => {
      try {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
          console.error("Token não encontrado.");
          setError("Token não encontrado.");
          return;
        }

        const response = await fetch(`${apiURL}/reservas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${reservaToken}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPerfil(data.usuario); 
          setId(data.usuario.id);
        } else {
          const errorData = await response.json();
          setError(errorData.mensagem || "Erro ao carregar perfil.");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError("Erro de conexão com o servidor.");
      }
    };

    verPerfil();
  }, []);

    const attPerfil = async (e: FormEvent) => {
    e.preventDefault();

    try {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
         setError("Token não encontrado. Por favor, faça login novamente.");
          return;
        }

    const response = await fetch(`${apiURL}/perfil`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${reservaToken}`
        },
        body: JSON.stringify({ id, nome, email, tipo }),
      });

    if (response.ok) {
    const data = await response.json();
        setPerfil(data.usuario); 
        alert("Perfil atualizado com sucesso!");
    }else {
    const errorData = await response.json();
        setError(errorData.mensagem || "Erro ao atualizar perfil.");
      }
    }catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="main">
      <div className="form">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {perfil ? (
          <div>
            <h3>Informações do Perfil</h3>
            <p>Nome: {perfil.nome}</p>
            <p>Email: {perfil.email}</p>
            <p>Tipo: {perfil.tipo}</p>
          </div>
        ) : (
          <p>Carregando perfil...</p>
        )}

        <form onSubmit={attPerfil}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <button type="submit">Atualizar Perfil</button>
        </form>
      </div>
    </div>
  );
}
