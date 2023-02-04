import React, { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './style'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
    validForm?: boolean
}

const Button = ({title, validForm} :IButton) => {
  return (<>
    <ButtonContainer disabled={!validForm}>{title}</ButtonContainer>
  </>)
}

export default Button