import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { InputLabel, InputContainer, IconContainer, DisplayError } from './style'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement>{
    leftIcon?: React.ReactNode
    label: string
    placeHolder: string
    errorMessage?: string
    control: Control<any, any>
}

const Input = ({control, label, placeHolder, leftIcon, errorMessage} : IInput) => {
  return (<>
    <InputLabel htmlFor={label}>{label}</InputLabel>
    <InputContainer>
      {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
      <Controller 
        control={control}
        name={label}
        render={({field}) => <input id={label} type={label} placeholder={placeHolder} {...field}/>}
      /> 
    </InputContainer>
    {errorMessage ? <DisplayError variant=''><p>{errorMessage}</p></DisplayError> : <DisplayError variant='nodisplay'></DisplayError>  }
  </>)
}

export default Input