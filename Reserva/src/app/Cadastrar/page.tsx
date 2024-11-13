

'use client'

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import Button from "../components/Button"
import Usuario from "../interfaces/usuario"
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";

const PCadastro = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        passwd: '',
        tipo: 'cliente'
    })
    const [error, setError] = useState("")
    const route = useRouter();

    const alterarNome = (novoNome: string) => {
        setUsuario((vAnteriores) => ({
            ...vAnteriores,
            nome: novoNome
        }))
        console.log(usuario)
    }

    // const alterarTipo = (novoTipo: ("cliente" | "adm")) => {
    //     setUsuario((vAnteriores) => ({
    //         ...vAnteriores,
    //         tipo: novoTipo
    //     }))
    // }

    const alterarEmail = (novaEmail: string) => {
        setUsuario((vAnteriores) => ({
            ...vAnteriores,
            email: novaEmail
        }))
    }

    const alterarPasswd = (novaPasswd: string) => {
        setUsuario((vAnteriores) => ({
            ...vAnteriores,
            passwd: novaPasswd
        }))
    }

    const handleSubmmit = async (e: FormEvent) =>{
        e.preventDefault();
        try{
          const response = await fetch(`${apiURL}/auth/cadastro`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({})
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
                        value={usuario.nome}
                        onChange={(e) => alterarNome(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id='email'
                        value={usuario.email}
                        onChange={(e) => alterarEmail(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="passwd">Senha: </label>
                    <input
                        type="password"
                        id='passwd'
                        value={usuario.passwd}
                        onChange={(e) => alterarPasswd(e.target.value)}
                        />
                </div>

                <button onClick={handleSubmit} ></button>
            </form>
        </div>
    )
} 