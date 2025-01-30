'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";
import Mesas from "../interfaces/mesas";

export default function Perfil() {
  const [mesas, setMesas] = useState<Mesas | null>(null);
  const [id, setId] = useState("");
  const [codigo, setEmail] = useState("");
  const [n_lugares, setLugar] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verPerfil = async () => {
      try {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
          console.error("Token não encontrado.");
          setError("Token não encontrado.");
          return;
        }

        const response = await fetch(`${apiURL}/perfil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${reservaToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${reservaToken}`,
        },
        body: JSON.stringify({ }),
      });

      if (response.ok) {
        const data = await response.json();
       
        setSuccessMessage("Perfil atualizado com sucesso!");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.mensagem || "Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="main">
      <div className="form">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <button type="submit">Atualizar Perfil</button>
      </div>
    </div>
  );
}