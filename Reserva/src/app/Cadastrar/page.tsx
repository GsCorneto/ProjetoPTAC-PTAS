

'use client'

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import Button from "../components/Button"
import Usuario from "../interfaces/usuario"
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";

const PCadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPass] = useState("");
    const [error, setError] = useState("")
    const route = useRouter();

    const alterarNome = (novoNome: string) => {
        setNome(novoNome)
    }

    // const alterarTipo = (novoTipo: ("cliente" | "adm")) => {
    //     setUsuario((vAnteriores) => ({
    //         ...vAnteriores,
    //         tipo: novoTipo
    //     }))
    // }

    const alterarPass = (novaPass: string) => {
        setNome(novaPass)
    }

    const alterarEmail = (novoEmail: string) => {
        setNome(novoEmail)
    }

    const handleSubmmit = async (e: FormEvent) =>{
        e.preventDefault();
        try{
          const response = await fetch(`${apiURL}/auth/cadastro`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nome, email, passwd})
          });
          if(response){
            const data = await response.json();
            const {erro, mensagem, token} = data;
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
        <div>
            <form>
                <h1>

                </h1>
                <div>
                    <label htmlFor="nome">Nome: </label>
                    <input 
                        type="text"
                        id='nome'
                        placeholder="Insira Nome Completo"
                        value={nome}
                        onChange={(e) => alterarNome(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id='email'
                        placeholder="Insira um Email"
                        value={email}
                        onChange={(e) => alterarEmail(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="passwd">Senha: </label>
                    <input
                        type="password"
                        id='passwd'
                        placeholder="Insira Senha"
                        value={passwd}
                        onChange={(e) => alterarPass(e.target.value)}
                        />
                </div>

                <button onClick={handleSubmmit}></button>
            </form>
        </div>
    )
} 