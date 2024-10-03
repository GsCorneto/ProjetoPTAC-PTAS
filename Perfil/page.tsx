'use client'
import { useState } from "react";
import Usuario from "../interfaces/usuario";

const InterUsuario = () =>{
    const [usuario, setUsuario] = useState<Usuario>({
        id: 1,
        nome: 'jose',
        email: 'jubileu@trator.com',
        passwd: 'alelek',
        tipo: 'cliente'
        
    })
    return(
        <div>
            <h1>Perfil</h1>
            <p>Nome: {usuario.nome}</p>
            <p>email: {usuario.email}</p>
        </div>
    )
}

export default InterUsuario;