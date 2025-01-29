'use client'

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";
import Reservas from "../interfaces/reservas";

export default function Reserva() {
 const [reservas, setReservas] = useState<Reservas>([]);
 const [error, setError] = useState("");
 const router = useRouter();

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
          setReservas(data.reservas); 
        } else {
          const errorData = await response.json();
          setError(errorData.mensagem || "ERRO ao carregar as reservas");
        }
      } catch (err) {
        console.error("Erro ao carregar suas reservas:", err);
        setError("Erro de conexão com o servidor.");
      }
    };

    verReservas();
  }, [router]);

  ;

  return (
    <div className="main">
      <div className="form">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {reservas? (
          <div className="reservas-lista">
            {reservas.map((reserva) =>(
              <div className="reserva-item" key={reserva.id}>
                <h3>Reserva {reserva.id}</h3>
                <p>Data: {new Date(reserva.data).toLocaleDateString('pt-br')}</p>
                <p>Num.Pessoas : {reserva.n_pessoas}</p>
                <p>Mesa: {reserva.mesa.codigo}</p>
             </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma reserva ainda</p>
        )}
      </div>
    </div>
  );
}
