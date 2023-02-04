import React from 'react'
import { ButtonContainer } from './style'

interface IButton {
    title: string;
    variant?: string
}

const Button = ({title, variant} :IButton) => {
  return (
    <ButtonContainer variant={variant}>{title}</ButtonContainer>
  )
}

export default Button