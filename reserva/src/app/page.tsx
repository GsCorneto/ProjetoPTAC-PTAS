'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import "./globals.css"

export default function Home(){
  const router = useRouter()
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
     <button className="botaoreserva" title="Efetuar Reserva" onClick={() => router.push('/ReservarM')}>
       Reservar Mesa
     </button>
   </div>
 </div>
   );
}