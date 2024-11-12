'use client'

import { useState } from "react"
import { useRouter } from "next/router"
import Button from "../components/Button"
import Usuario from "../interfaces/usuario"

const PCadastro = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        passwd: '',
        tipo: 'cliente'
    })

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

    const router = useRouter();

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
                        type="text"
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

                <Button title="Cadastrar" funcao= {() => }/>
            </form>
        </div>
    )
} 