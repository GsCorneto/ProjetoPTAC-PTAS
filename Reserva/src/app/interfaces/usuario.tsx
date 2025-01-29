interface Usuario{
    id?: number,
    nome: string,
    email: string,
    passwd: string,
    tipo: ("cliente" | "adm")
}

export default Usuario
