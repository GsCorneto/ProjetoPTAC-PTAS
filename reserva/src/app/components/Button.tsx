import "../globals.css"
type ButtonProp ={
    title: string,
    funcao : () => void,
}

const Button : React.FC<ButtonProp> = ({title, funcao}) => {
    return (
        <button className="botaorota" onClick={funcao}>{title}</button>
    )
}

export default Button;