'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";
import Reservas from "../interfaces/reservas";

export default function Reserva() {
  const [reservas, setReservas] = useState<Reservas[]>([])
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

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
          setReservas(data.reservas);
        } else {
          const errorData = await response.json();
          setError(errorData.mensagem || "Erro ao carregar as reservas.");
        }
      } catch (err) {
        console.error("Erro ao carregar suas reservas:", err);
        setError("Erro de conexão com o servidor.");
      }
    };

    verReservas();
  }, [router]);

  const cancelarReserva = async (reservaId: number) => {
    try {
      const { reservaToken } = parseCookies();
      if (!reservaToken) {
        setError("Token não encontrado. Por favor, faça login novamente.");
        return;
      }

      const response = await fetch(`${apiURL}/reservas`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${reservaToken}`,
        },
        body: JSON.stringify({ reservaId }),
      });

      if (response.ok) {
        setSuccessMessage("Reserva cancelada com sucesso!");
        setError("");
        // Atualiza a lista de reservas após exclusão
        setReservas(reservas.filter((reserva) => reserva.Id ));
      } else {
        const errorData = await response.json();
        setError(errorData.mensagem || "Erro ao cancelar a reserva.");
      }
    } catch (err) {
      console.error("Erro ao cancelar reserva:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="main">
      <div className="form">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        {reservas.length > 0 ? (
          <div className="reservas-lista">
            {reservas.map((reserva) => (
              <div className="reserva-item" key={reserva.Id}>
                <h3>Reserva {reserva.Id}</h3>
                <p>Data: {new Date(reserva.data).toLocaleDateString("pt-br")}</p>
                <p>Num. Pessoas: {reserva.n_pessoas}</p>
                <p>Mesa: {reserva.mesa.codigo}</p>
                <button onClick={() => cancelarReserva(reserva.Id)}>
                  Cancelar Reserva
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma reserva ainda.</p>
        )}
      </div>
    </div>
  );
}
