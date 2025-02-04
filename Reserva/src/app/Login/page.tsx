'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";
import "../globals.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("")
  
  const route = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    console.log("Cookies detectados ao iniciar:", cookies);
    if (cookies.reservaToken) {
        route.push('/Home');
        console.log("Redirecionado para a Home");
    }
  }, [route]);

  const handleSubmmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Resposta da API:", data); 

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao efetuar login.");
      }

      const { token } = data;
      if (!token) {
        throw new Error("Token não recebido do servidor.");
      }
      setCookie(undefined, 'reservaToken', token, {
        maxAge: 60 * 60 * 1, 
        path: '/' 
      });

      console.log("Token salvo:", token);
      route.push('/Home'); 

    } catch (error: any) {
      console.error("Erro ao efetuar login:", error.message);
      setError(error.message);
    }
  }

  return (
    <div className="main">
      <div className="form">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="input">
          <label htmlFor="email">E-mail</label>
          <input 
            type="text" 
            name="email" 
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <label>Senha</label>
          <input 
            type="password" 
            name="senha" 
            id="pass"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button className="button" title="Realizar Login" onClick={handleSubmmit}>
          Login
        </button>
      </div>

      <button className="botaorota" title="Efetuar cadastro" onClick={() => route.push('/Cadastrar')}>
        Não possui conta?
      </button>
    </div>
  );
}
