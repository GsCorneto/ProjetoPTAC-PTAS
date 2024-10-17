'use client'

import {useState} from "react"
import Reservas from "../interfaces/reservas"

const InterReserva = () =>{
    const [reserva, setReserva] = useState<Reservas>({
        id: 1,
        usuario_id: 1,
        mesa_id: 1,
        n_pessoas: 1,
        status: true
    })
}

export default InterReserva;