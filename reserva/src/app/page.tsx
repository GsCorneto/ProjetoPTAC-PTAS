 'use client'

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Button from "./components/Button";



export default function Home() {
  const [user, setUser] = useState(true);
  const route = useRouter();

  if(user){
    return (
      <div>
       <div>
          <label>E-mail</label>
          <input type ="text" name="email" id="email"/>
       </div>

       <div>
          <label>Senha</label>
          <input type="password" name="senha" id="pass"/>
       </div>

          <Button title =" Zezé" funcao = {() => setUser(false)}/>
           Lelek
          

          <Button title = "almofada" funcao ={() => route.push('/Home')}/>
            Perfil
        
      </div>
     );
   } 

   else {
   return (
    <div>
      <h1>Usuário não existente!</h1>
      <Button title = "Volta" funcao={() => setUser(true)}/>

      <Button title ="Ratoeira" funcao={() => route.push('/Home')}/>
  
    </div>
   );
 }
  }
  
 