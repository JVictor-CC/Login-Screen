import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { InputLabel, InputContainer, IconContainer, DisplayError } from './style'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement>{
    leftIcon?: React.ReactNode
    label: string
    type?: string
    placeHolder: string
    errorMessage?: string
    length?: number
    controllerName: string
    control: Control<any, any>
}

const Input = ({control, controllerName, label, type, placeHolder, leftIcon, errorMessage, length = Infinity} : IInput) => {
  return (<>
    <InputLabel htmlFor={label}>{label}</InputLabel>
    <InputContainer>
      {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
      <Controller 
        control={control}
        name={controllerName}
        render={({field}) => <input id={label} type={type} maxLength={length} placeholder={placeHolder} {...field}/>}
      /> 
    </InputContainer>
    {errorMessage ? <DisplayError variant=''><p>{errorMessage}</p></DisplayError> : <DisplayError variant='nodisplay'></DisplayError>  }
  </>)
}

export default Input