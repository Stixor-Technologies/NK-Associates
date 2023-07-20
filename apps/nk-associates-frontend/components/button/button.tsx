import React, {FC} from 'react'

interface ButtonProps {
   text: string
}

const Button:FC<ButtonProps> = ({text}) => {
  return (
    <button>{text}</button>
  )
}

export default Button;