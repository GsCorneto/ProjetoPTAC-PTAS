'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import "../globals.css"

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
    <header className="header">
      <h1>Minha Aplicação de Reservas</h1>
      <div className="profile">
        <img
          src="/placeholder-profile.png" 
          alt="Foto de perfil"
          className="profile-pic"
        />
        <p>Bem-vindo, Matador de Porco</p>
      </div>
    </header>

  
    <nav className="navbar">
      <button
        className="navbar-button"
        onClick={() => router.push('/ReservarM')}
      >
        Reservar Mesa
      </button>
      <button
        className="navbar-button"
        onClick={() => router.push('/CancelarReserva')}
      >
        Cancelar Reserva
      </button>
      <button
        className="navbar-button"
        onClick={() => router.push('/ListaReservas')}
      >
        Lista de Reservas
      </button>
    </nav>
  </div>
   );
}