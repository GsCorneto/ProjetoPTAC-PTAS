'use client'


import { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";
import "../globals.css"

export default function Login() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("")
  const [perfil, setPerfil] = useState<any>(null)
  
  const route = useRouter();

  useEffect(() => {
    const {'reservaToken' : token} = parseCookies()
    if(token){
        route.push('/Home')
        console.log("Redirecionado para a Home")
    }
  }, [route]);

  useEffect(() => {
    const {reservaToken} = parseCookies()
    if(reservaToken){
        console.log('Token Present', reservaToken);
    }else{
        console.log("Token não encontrado")
    }
  }, []);

    const verPerfil = async (e: FormEvent) =>{
      e.preventDefault();
      try{
        const response = await fetch(`${apiURL}/perfil`, {
          method: 'GET',
          headers: {'Content-Type':'application/json'},
        //   body: JSON.stringify({id, nome, email, tipo})
        });
        if(response.ok){
          const data = await response.json();
          const {error, mensagem, token} = data;
          if(error){
            setError(mensagem)
          }else{
            setCookie(undefined, 'reservaToken', token, {
              maxAge: 60*60*1
            })
            route.push('/')
          }
        }
      }catch(error){
        console.error('Ocorreu um erro ao efetuar a requisição')
      }
    }

    const attPerfil = async (e: FormEvent) =>{
        e.preventDefault();
        try{
          const response = await fetch(`${apiURL}/perfil`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id, nome, email, tipo})
          });
          if(response.ok){
            const data = await response.json();
            verPerfil(data);

            const {error, mensagem, token} = data;
            if(error){
              setError(mensagem)
            }else{
              setCookie(undefined, 'reservaToken', token, {
                maxAge: 60*60*1
              })
              route.push('/')
            }
          }
        }catch(error){
          console.error('Ocorreu um erro ao efetuar a requisição')
        }
      }

    return (
        <div className="main">
        <div className="form">
          <button className="button" onClick={verPerfil}>
            Buscar Perfil
          </button>
  
          {perfil && (
            <div>
              <h3>Informações do Perfil</h3>
              <p>Nome: {perfil.nome}</p>
              <p>Email: {perfil.email}</p>
              <p>Tipo: {perfil.tipo}</p>
            </div>
          )}
  
          <form onSubmit={attPerfil}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <button type="submit">Atualizar Perfil</button>
          </form>
        </div>
      </div>
     );
   } 

