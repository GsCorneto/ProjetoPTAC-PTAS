'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";
import Usuario from "../interfaces/usuario";

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState<"cliente" | "adm">("cliente");
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
          setUsuario(data.usuario);
          setNome(data.usuario.nome);
          setEmail(data.usuario.email);
          setTipo(data.usuario.tipo);
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
        body: JSON.stringify({ nome, email, tipo }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsuario(data.usuario);
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

        {usuario ? (
          <div>
            <h3>Informações do Perfil</h3>
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.email}</p>
            <p>Tipo: {usuario.tipo}</p>
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
          <button type="submit">Atualizar Perfil</button>
        </form>
      </div>
    </div>
  );
}