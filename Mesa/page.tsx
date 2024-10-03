'use client'
import { useState } from "react";
import Mesas from "../interfaces/mesas";

const InterMesa = () =>{
    const [mesa, setMesa] = useState<Mesas>({
        id: 1,
        codigo: '5X3',
        n_lugares: 6
        
    })
    return(
        <div>
            <h1>Perfil</h1>
            <p>Código: {mesa.codigo}</p>
            <p>Num de Lugares: {mesa.n_lugares}</p>
        </div>
    )
}

export default InterMesa;