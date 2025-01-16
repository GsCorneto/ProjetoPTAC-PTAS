'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie } from "nookies";
import "../globals.css"

export default function Cadastrar() {
    const [codigo, setCode] = useState("");
    const [n_lugares, setLugar] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const route = useRouter();

    const alterarCode = (novoCode: string) => {
        setCode(novoCode);
    }

    const alterarLugar = (novoLugar: string) => {
        setLugar(novoLugar);
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch(`${apiURL}/auth/cadastroMesa`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo, n_lugares  })
            });

            if (response.ok) {
                const data = await response.json();
                const { erro, mensagem, token } = data;

                if (erro) {
                    setError(mensagem);
                    setSuccessMessage("");
                } else {
                    setSuccessMessage(mensagem);
                    setError("");
                    setCookie(undefined, 'reservaToken', token, {
                        maxAge: 60 * 60 * 1
                    });
                    route.push('/');
                }
            } else {
                const data = await response.json();
                setError(data.mensagem);
                setSuccessMessage("");
            }
        } catch (erro) {
            console.error('Ocorreu um erro ao efetuar a requisição', erro);
            setError("Erro ao realizar o cadastro. Tente novamente.");
            setSuccessMessage("");
        }
    }

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="nome">Código da Mesa: </label>
                        <input
                            type="text"
                            id='code'
                            placeholder="Insira Código da Mesa"
                            value={codigo}
                            onChange={(e) => alterarCode(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="email">Número de lugares: </label>
                        <input
                            type="number"
                            id='numl'
                            placeholder="Insira o número de lugares"
                            value={n_lugares}
                            onChange={(e) => alterarLugar(e.target.value)}
                        />
                    </div>


                    <button className="button" type="submit">Enviar</button>
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
