'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import "../globals.css"

export default function Home(){
  const router = useRouter()

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('http://localhost:3000/')
      console.log(response)
    }
    fetchData()
  }, [])
  
  
  return (
    <div className="home">
    <header className="header">
      <h1>Restaurante Almofada</h1>
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
        onClick={() => router.push('/')}
      >
        Reservar Mesa
      </button>
      <button
        className="navbar-button"
        onClick={() => router.push('/')}
      >
        Cancelar Reserva
      </button>
      <button
        className="navbar-button"
        onClick={() => router.push('/')}
      >
        Lista de Reservas
      </button>
    </nav>
  </div>
   );
}