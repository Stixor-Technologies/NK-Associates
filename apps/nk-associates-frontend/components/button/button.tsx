import React, {FC} from 'react'

interface ButtonProps {
   text: string,
   type?: "solid" | "transparent" | "inverted",
}

const Button:FC<ButtonProps> = ({text, type = "default"}) => {
  return (
    <button className={`rounded-full px-4 py-2 w-56 lg:py-3 text-lg font-vietnam-pro ${type === 'solid' ? 'bg-red-700' : type === 'inverted' ? 'bg-green-200' : 'bg-transparent'}`}>{text}</button>
  )
}

export default Button;