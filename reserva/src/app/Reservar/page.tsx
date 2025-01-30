'use client'

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { apiURL } from "../config";
import { parseCookies } from "nookies";
import "../globals.css";

export default function Reservar() {
    const [dia, setDia] = useState(() => {
        const hoje = new Date().toISOString().split("T")[0];
        return hoje;
    });
    const [n_pess, setPess] = useState(0);
    const [mesaId, setMesa] = useState(0);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
            console.error("Token não encontrado.");
            setError("Token não encontrado.");
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        const diaFormatado = /^\d{4}-\d{2}-\d{2}$/;
        if (!dia || !diaFormatado.test(dia)) {
            setError("Data inválida. Use o formato yyyy-mm-dd.");
            setLoading(false);
            return;
        }

        if (n_pess < 1 || n_pess > 6) {
            setError("O número de pessoas deve estar entre 1 e 6.");
            setLoading(false);
            return;
        }

        if (!mesaId || mesaId <= 0) {
            setError("ID da mesa inválido.");
            setLoading(false);
            return;
        }

        try {
            const { reservaToken } = parseCookies();
            if (!reservaToken) {
                setError("Token não encontrado. Por favor, faça login novamente.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${apiURL}/reservas/novo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${reservaToken}`
                },
                body: JSON.stringify({ dia, n_pess, mesaId }),
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
                    setTimeout(() => {
                        router.push("/reservas");
                    }, 2000);
                }
            } else {
                setError(data.mensagem || "Erro ao efetuar a reserva.");
                setSuccessMessage("");
            }
        } catch (erro) {
            console.error('Ocorreu um erro ao efetuar a requisição', erro);
            setError("Erro ao reservar. Tente novamente.");
            setSuccessMessage("");
        } finally {
            setLoading(false);
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
                            placeholder="yyyy-mm-dd"
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="n_pessoas">Número de Pessoas: </label>
                        <input
                            type="number"
                            id="n_pessoas"
                            placeholder="Insira o número de pessoas"
                            value={n_pess}
                            onChange={(e) => setPess(Number(e.target.value))}
                            min={1}
                            max={6}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="mesaId">ID da Mesa: </label>
                        <input
                            type="number"
                            id="mesaId"
                            placeholder="Insira o ID da mesa"
                            value={mesaId}
                            onChange={(e) => setMesa(Number(e.target.value))}
                        />
                    </div>

                    <button className={`button ${loading ? "button-disabled" : ""}`} type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner"></span> Reservando...
                            </>
                        ) : (
                            "Efetuar Reserva"
                        )}
                    </button>
                </form>

                {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        <p>{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div style={{ color: 'green', marginTop: '10px' }}>
                        <p>{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}