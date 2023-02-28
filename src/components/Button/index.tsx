import React, { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './style'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
    validForm?: boolean
    variant?: string
    onClick?: () => void
}

const Button = ({title, validForm = true, variant, onClick} :IButton) => {
  return (
    <ButtonContainer onClick={onClick} variant={variant} disabled={!validForm}>{title}</ButtonContainer>
  )
}

export default Button