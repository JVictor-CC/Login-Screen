import React from 'react'
import { InputLabel, InputContainer } from './style'

interface IInput {
    label: string
    placeHolder: string
}

const Input = ({label, placeHolder} : IInput) => {
  return (<>
    <InputLabel htmlFor={label}>{label}</InputLabel>
    <InputContainer id={label} placeholder={placeHolder} />
  </>)
}

export default Input