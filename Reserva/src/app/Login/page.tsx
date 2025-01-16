'use client'


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

  // const response = await fetch(`${apiURL}/auth/login`, {
  //   method : 'POST',
  //   headers :{
  //     'Content-type' : 'application/json'
  //   },
  //   body: 
  // })

// const teste = [1,2,3,4]
// const result = teste.find((item) => item = 1)


//   const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try{
//       const response = await fetch('https://prof-jeferson.github.io/API-reservas/usuarios.json')
//       if (!response){
//         console.log('Erro ao buscar!')
//       }
//       const usuarios = await response.json();
//       const usuConvert = Usuario[] = usuarios as Usuario[]
//       const user = usuarios.find((user) => user.email == email && user.password == password )
//       localStorage.setItem('usuario', JSON.stringify(user))

//       console.log(usuarios)
//     }catch{
        
//     }
//   }

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

    const handleSubmmit = async (e: FormEvent) =>{
      e.preventDefault();
      try{
        const response = await fetch(`${apiURL}/auth/login`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({email, password})
        });
        if(response){
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

    return (
      <div className="main">
       <div className="form">
        <div className="input">
          <label htmlFor="email">E-mail</label>
          <input 
          type ="text" 
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

          <button  className="button" title ="Realizar Login" onClick={handleSubmmit}>Login</button>
           </div>
          <button className="botaorota" title ="Efetuar cadastro" onClick ={() => route.push('/Cadastrar')}>Efetuar Cadastro</button>
             
      </div>
     );
   } 