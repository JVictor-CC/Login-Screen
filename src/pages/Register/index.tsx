import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdEmail, MdPassword } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}


const schema = yup.object({
    name: yup.string().required('Please, enter your name').matches(/^\D*$/, 'No Numbers Allowed'),
    email: yup.string().required('Email Required!').email('Invalid Email'),
    password: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed'),
    confirmPassword: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed').oneOf([yup.ref('password')], 'Password doesnt match')
  }).required()



function Register() {

  const navigate = useNavigate()

  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmitRegister = (data:any) => {
    console.log('data: ', data)
    navigate('/')
  }

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <h1><Gradient>Create</Gradient> your account.</h1>
          
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <Input leftIcon={<FaUserAlt />} label={'name'} type={'text'} placeHolder={'type your name'} control={control} controllerName={'name'} errorMessage={errors.name?.message}/>
            <Input leftIcon={<MdEmail />} label={'email'} type={'email'} placeHolder={'type your email'} control={control} controllerName={'email'} errorMessage={errors.email?.message}/>
            <Input leftIcon={<MdPassword />} label={'password'} type={'password'} placeHolder={'********'} control={control} controllerName={'password'} errorMessage={errors.password?.message}/>
            <Input leftIcon={<MdPassword />} label={'Confirm password'} type={'password'} placeHolder={'********'} control={control} controllerName={'confirmPassword'} errorMessage={errors.confirmPassword?.message}/>
            <Button validForm={isValid} title={'Sign Up'} type="submit"/>
          </form>
          <Center><p>Already have an account? <Link to={'/'}>Log in</Link></p></Center>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Register;
