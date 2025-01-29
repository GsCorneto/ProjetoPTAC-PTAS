interface Reservas{
    id: number,
    usuario_id: number,
    mesa_id: number,
    n_pessoas: number,
    mesa: {
        id: string,
        codigo: string,
        n_lugares: number
    },
}


export default Reservas