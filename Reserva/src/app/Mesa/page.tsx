'use client'
import {useState} from "react";
import Mesas from "../interfaces/mesas";

const InterMesa = () =>{
    const[mesa, setMesa] = useState<Mesas>({
        id:1,
        codigo: '4B5',
        n_lugares: 6
    })
    return(
        <div>
            <h1>Mesa</h1>
            <p>Código: {mesa.codigo}</p>
            <p>Num de Assentos: {mesa.n_lugares}</p>
        </div>
    )
}