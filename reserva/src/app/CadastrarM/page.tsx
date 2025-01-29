'use client'

import { useState, FormEvent,useEffect } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { parseCookies, setCookie } from "nookies";
import "../globals.css"


export default function Cadastrar() {
    const [codigo, setCode] = useState("");
    const [n_lugares, setLugar] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const route = useRouter();
    
    useEffect(() => {
        const { reservaToken } = parseCookies();
        if (!reservaToken) {
          console.error("Token não encontrado.");
          setError("Token não encontrado.");
          return;
        }
      }, []);

    const alterarCode = (novoCode: string) => {
        if (novoCode.length <= 2) {
            setCode(novoCode);
        }
    }

    const alterarLugar = (novoLugar: string) => {
        setLugar(novoLugar);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        
        if (codigo.length !== 2) {
            setError("O código deve conter 2 dígitos.");
            return;
        }

        const nn_lugares = Number(n_lugares);
        if (isNaN(nn_lugares) || nn_lugares <= 0 || nn_lugares > 6) {
            setError("O número de lugares deve ser um número entre 1 e 6.");
            return;
        }

        try {
            const { reservaToken } = parseCookies();
            if (!reservaToken) {
             setError("Token não encontrado. Por favor, faça login novamente.");
              return;
            }
            const response = await fetch(`${apiURL}/mesa/novo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${reservaToken}` },
                body: JSON.stringify({ codigo, n_lugares: nn_lugares }),
            });

            const data = await response.json();

            if (response.ok) {
                const { erro, mensagem, token } = data;

                if (erro) {
                    setError(mensagem);
                    setSuccessMessage("");
                    setCookie(undefined, 'reservaToken', token, {
                        maxAge: 60 * 60 * 1
                    });
                } else {
                    setSuccessMessage(mensagem);
                    setError("");
                    route.push('/');
                }
            } else {
                setError(data.mensagem || "Erro ao cadastrar a mesa.");
                setSuccessMessage("");
                console.log("N-Lugares ->" + n_lugares + " Código ->" + codigo);
                console.log("URL da requisição:", `${apiURL}/mesa/novo`);
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
                        <label htmlFor="">Código da Mesa: </label>
                        <input
                            type="text"
                            id='code'
                            placeholder="Insira Código da Mesa"
                            value={codigo}
                            onChange={(e) => alterarCode(e.target.value)}
                            maxLength={2} 
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="nlugar">Número de lugares: </label>
                        <input
                            type="number"
                            id='numl'
                            placeholder="Insira o número de lugares"
                            value={n_lugares}
                            onChange={(e) => alterarLugar(e.target.value)}
                            min={1}
                            max={6}
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