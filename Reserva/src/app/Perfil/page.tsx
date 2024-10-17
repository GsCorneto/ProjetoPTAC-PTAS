'use client'
import { useState } from "react";
import Usuario from "../interfaces/usuario";

const InterUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        id: 1,
        nome: 'jose',
        email: 'jose@email.com',
        passwd: 'jose1234',
        tipo: 'cliente'
    })

    return (
        <div>
            <h1>Perfil</h1>
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.email}</p>
        </div>
    )
}

export default InterUsuario;