'use client'

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Button from "./components/Button";


export default function Home(){
  const router = useRouter()
  return (
    <div className="home">
     <div>
        <h1>Página de Reservas</h1>
     </div>
         <div>
            <Button title = "Efetuar Login" funcao ={() => router.push('/Login')}/>
         </div> 
    </div>
   );
}