

'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";
import "../globals.css"

 export default function Cadastrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPass] = useState("");
    const [error, setError] = useState("")
    const route = useRouter();

    const alterarNome = (novoNome: string) => {
        setNome(novoNome)
    }


    const alterarPass = (novaPass: string) => {
        setPass(novaPass)
    }

    const alterarEmail = (novoEmail: string) => {
        setEmail(novoEmail)
    }

    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        try{
          const response = await fetch(`${apiURL}/auth/cadastro`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nome, email, passwd})
          });
          console.log(response)
          if(response){
            const data = await response.json();
            const {erro, mensagem, token} = data;
            console.log(data)
            if(erro){
              setError(mensagem)
            }else{
              setCookie(undefined, 'reservaToken', token, {
                maxAge: 60*60*1
              })
              route.push('/')
            }
          }
        }catch(erro){
          console.error('Ocorreu um erro ao efetuar a requisição')
        }
      }
    return(
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
              <label htmlFor="passwd">Senha: </label>
              <input
                  type="password"
                  id='passwd'
                  placeholder="Insira Senha"
                  value={passwd}
                  onChange={(e) => alterarPass(e.target.value)}
                  />
          </div>
        
          <button className="button" type="submit" onClick={handleSubmit}>Enviar</button>
      </form>
      </div>
  </div>
    )
} 