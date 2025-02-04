'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";

export default function Reservar() {
    const [dia, setDia] = useState("");
    const [n_pess, setPess] = useState(1);
    const [mesaId, setMesaId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
            console.error("Token não encontrado.");
            setError("Token não encontrado.");
            router.push("/Login")
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!dia) {
            setError("Selecione uma data válida.");
            return;
        }
        const diaFormatado = new Date(dia).toISOString().split('T')[0]

        if (n_pess < 1 || n_pess > 6) {
            setError("O número de pessoas deve estar entre 1 e 6.");
            return;
        }

        if (!mesaId || isNaN(mesaId)) {
            setError("Código da mesa inválido.");
            return;
        }

        try {
            const { reservaToken } = parseCookies();
            if (!reservaToken) {
                setError("Token não encontrado. Por favor, faça login novamente.");
                return;
            }

            console.log("Enviando para API:", { data: diaFormatado, n_pess, mesaId });

            const response = await fetch(`${apiURL}/reservas/novo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${reservaToken}`
                },
                body: JSON.stringify({ data: diaFormatado, n_pessoas: n_pess, mesaId }),
            });

            const data = await response.json();

            if (response.ok) {
                const { erro, mensagem } = data;

                if (erro) {
                    setError(mensagem);
                    setSuccessMessage("");
                } else {
                    setSuccessMessage(mensagem);
                    setError("");
                }
            } else {
                setError(data.mensagem || "Erro ao efetuar a reserva.");
                setSuccessMessage("");
            }
        } catch (erro) {
            console.error('Ocorreu um erro ao efetuar a requisição', erro);
            setError("Erro ao reservar. Tente novamente.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="data">Data da Reserva: </label>
                        <input
                            type="date"
                            id="data"
                            value={dia}
                            onChange={(e) => setDia(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="n_pessoas">Número de Pessoas: </label>
                        <input
                            type="number"
                            id="n_pessoas"
                            value={n_pess}
                            onChange={(e) => setPess(Number(e.target.value))}
                            max={6}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="mesaId">Código da Mesa: </label>
                        <input
                            type="number"
                            id="mesaId"
                            value={mesaId || ""}
                            onChange={(e) => setMesaId(Number(e.target.value))}
                            required
                        />
                    </div>

                    <button className="button" type="submit">
                        Efetuar Reserva
                    </button>
                </form>

                {error && <Message message={error} type="error" />}
                {successMessage && <Message message={successMessage} type="success" />}
            </div>
        </div>
    );
}

const Message = ({ message, type }: { message: string; type: "error" | "success" }) => (
    <div style={{ color: type === "error" ? "red" : "green", marginTop: "10px" }}>
        <p>{message}</p>
    </div>
);