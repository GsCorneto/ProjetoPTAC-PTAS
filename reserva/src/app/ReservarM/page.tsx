'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { apiURL } from "../config";
import { setCookie, parseCookies } from "nookies";
import "../globals.css"

export default function ReservarM(){
  const [user, setUser] = useState('');
  const [assentos, setNumA] = useState(1);
  const [dia, setHor] = useState("");
  const route = useRouter();
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    setUser('');
    setNumA(0);
    setHor("")
  };

return(
    <div className="main">
       <h2>Faça sua Reserva</h2>
       <div className="form"></div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        
        <div className="input">
          <label htmlFor="people">Número de Pessoas:</label>
          <input
            type="number"
            id="people"
            value={assentos}
          />
        </div>

        <div className="input">
          <label htmlFor="people">Data: </label>
          <input
            type="date"
            id="people"
            value={dia}
          />
        </div>
        <button type="submit" className="button" onClick={handleSubmit} >Confirmar Reserva</button>
        <button className="botaorota" title ="Efetuar cadastro" onClick ={() => route.push('/Cadastrar')}>Efetuar Cadastro</button>
      </form>
    </div>
  )
} 