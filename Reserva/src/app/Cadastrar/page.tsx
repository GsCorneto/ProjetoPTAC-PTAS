'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie } from "nookies";
import "../globals.css"

export default function Cadastrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [adminPass, setAdPass] = useState("")
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const route = useRouter();

    const alterarNome = (novoNome: string) => {
        setNome(novoNome);
    }

    const alterarPass = (novaPass: string) => {
        setPass(novaPass);
    }

    const alterarAdminPass = (novoAdPass: string) => {
        setAdPass(novoAdPass);
    }

    const alterarEmail = (novoEmail: string) => {
        setEmail(novoEmail);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch(`${apiURL}/auth/cadastro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, password })
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
                        <label htmlFor="nome">Nome: </label>
                        <input
                            type="text"
                            id='nome'
                            placeholder="Insira Nome Completo"
                            value={nome}
                            onChange={(e) => alterarNome(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            id='email'
                            placeholder="Insira um Email"
                            value={email}
                            onChange={(e) => alterarEmail(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Senha: </label>
                        <input
                            type="password"
                            id='password'
                            placeholder="Insira Senha"
                            value={password}
                            onChange={(e) => alterarPass(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="adminPass">Passe de Admin (Opcional): </label>
                        <input
                            type="text"
                            id='adminPass'
                            placeholder="Insira o passe de ADM (se aplicável)"
                            value={adminPass}
                            onChange={(e) => alterarAdminPass(e.target.value)}
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
