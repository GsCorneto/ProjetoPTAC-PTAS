'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import "./globals.css"

export default function Home(){
  const router = useRouter()

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('http://localhost:3000/reservas')
      console.log(response)
    }
    fetchData()
  }, [])
  
  
  return (
   <div className="home">
   <div className="header">
     <h1>Página de Reservas</h1>
     <p>Reserve sua mesa com facilidade e rapidez</p>
   </div>

   <div className="navbar">
     <button className="botaorota" title="Efetuar Login" onClick={() => router.push('/Login')}>
       Efetuar Login
     </button>
     <button className="botaoreserva" title="Ver Mesas" onClick={() => router.push('/Mesas')}>
       Ver Mesas
     </button>
   </div>
 </div>
   );
}