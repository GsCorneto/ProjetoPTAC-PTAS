type ButtonProp ={
    title: string,
    funcao : () => void
}

const Button : React.FC<ButtonProp> = ({title, funcao}) => {
    return (<button title={title} onClick={funcao}></button>)
}

export default Button;