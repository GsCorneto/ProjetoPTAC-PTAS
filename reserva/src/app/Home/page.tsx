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
        <h1 className="page-title">Restaurante Almofada</h1>
        <div className="user-info">
          <p>Bem-vindo, <strong>Usuário</strong>!</p>
        </div>
      </header>

      <nav className="navbar">
        <button
          className="navbar-button"
          onClick={() => router.push('/Perfil')}
        >
         Perfil
        </button>
        <button
          className="navbar-button"
          onClick={() => router.push('/Reservas')}
        >
          Reservas
        </button>
        <button
          className="navbar-button"
          onClick={() => router.push('/CadastrarM')}
        >
          Cadastrar Mesa
        </button>
      </nav>
  </div>
   );
}