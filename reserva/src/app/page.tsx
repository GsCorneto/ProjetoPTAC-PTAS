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
     </div>
         <div className="buttonhome">
            <button title = "Efetuar Login" onClick ={() => router.push('/Login')}/>
         </div> 
    </div>
   );
}