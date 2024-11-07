'use client'

import styles from "../";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import Button from "../components/Button";
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPass] = useState("");
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
    const userLog = localStorage.getItem('usuario');
    if(userLog){
        route.push('')
    }
  }, []);

    return (
      <div>
       <div>
          <label>E-mail</label>
          <input 
          type ="text" 
          name="email" 
          id="email"
          />
       </div>

       <div>
          <label>Senha</label>
          <input 
          type="password" 
          name="senha" 
          id="pass"
          />
       </div>

          <Button title ="Realizar Login" funcao = {() => setUser(false)}/>
           
          <Button title = "Efetuar Cadastro" funcao ={() => route.push('/Cadastrar')}/>
             
      </div>
     );
   } 


  
 