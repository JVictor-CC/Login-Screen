import React from "react"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { MdEmail, MdPassword } from 'react-icons/md'

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../services/supabase'
import { toast } from "react-toastify"
import { useAuth } from '../../context/userAuth';
import { useNavigate } from 'react-router-dom'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages"



interface ILoginForm {
  email: string
  password: string
}


const schema = yup.object({
    email: yup.string().required('Email Required!').email('Invalid Email'),
    password: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed')
  }).required()



function Login() {
  const navigate = useNavigate()
  const { setSigned, signed, updateUser, user } = useAuth()

  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleLogin = async (inputData: any) => {
    try{
        let response = await supabase.auth.signInWithPassword({
            email: inputData.email,
            password: inputData.password
        })
        if(response.error){
            toast.error(response.error.message, { position: toast.POSITION.TOP_CENTER })
        }else{
            toast.success('Succesfully Logged In', { position: toast.POSITION.TOP_CENTER })
            updateUser()
            setSigned(true)
            navigate('/profile')
        }
    }catch(error: any){
        alert(error.message)
    } 
  }
  return (
    <Screen>
      <LoginContainer> 
        <LoginInfo>
          <h1>Welcome to <Gradient>MyCompanion</Gradient>, Sign in to Continue.</h1>
          <p>Don't have an account? <Link to="/register">Create a account</Link>  <br /> It takes less than a minute.</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Input leftIcon={<MdEmail />} label={'email'} type={'email'} placeHolder={'type your email'} control={control} controllerName={'email'} errorMessage={errors.email?.message}/>
            <Input leftIcon={<MdPassword />} label={'password'} type={'password'} placeHolder={'********'} control={control} controllerName={'password'} errorMessage={errors.password?.message}/>
            <Center><Link to="/recovery">Forget Password?</Link></Center>
            <Button validForm={isValid} title={'Sign In'} type="submit"/>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Login;
