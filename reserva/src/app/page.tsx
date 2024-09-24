 'use client'

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation'

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
            <label>Nome</label>
            <input type="text" name="senha" id="pass"/>
       </div>
       <a href="/"></a>
        <button onClick={() => 
          setUser(false)
          }>Efetuar Login</button>
      </div>
     );
   } 

   else {
   return (
    <div>
      <h1>Usuário não existente!</h1>
    </div>
   );
 }
  }
  
 