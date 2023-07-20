import React, { FC } from "react";

interface ButtonProps {
  text: string;
  type?: 'transparent' | 'inverted' | 'solid' | 'gradient';
  width?: string;
  additionalStyles?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, type = 'gradient', additionalStyles}) => {
  return (
    <button className={`rounded-full font-metropolis transition-all ease-in-out duration-300 hover:shadow-lg hover:delay-100 ${type === 'transparent' ? 'bg-transparent text-nk-gray border border-nk-red' : type === 'inverted' ? 'bg-white' : type === 'solid' ? 'bg-nk-red text-white' : 'bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two text-white'} py-1 w-[16.25rem] md:w-[25rem] text-base md:text-lg ${additionalStyles}`}>
      <span className={`${type === 'inverted' && 'bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two bg-clip-text text-transparent'}`}>
       {text}
      </span>
    </button>
  );
};

export default Button;
