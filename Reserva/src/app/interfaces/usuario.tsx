interface Usuario{
    id?: number,
    nome: string,
    email: string,
    passwd: string,
    tipo: ("cliente" | "adm")
}

// const InterUsuario: React.FC<{usuario: Usuario}> = ({usuario}) => {
//     return (
//         <div>
//             <h1>Perfil Usuário</h1>
//             <p>Nome: {usuario.nome}</p>
//             {usuario.email && <p>Email: {usuario.email}</p>}
//         </div>
//     )
// }
export default Usuario
// export default InterUsuario