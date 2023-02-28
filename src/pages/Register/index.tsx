import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdEmail, MdPassword } from 'react-icons/md'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../services/supabase'
import { toast } from "react-toastify";
//import { useAuth } from '../../context/userAuth';
import { useNavigate } from 'react-router-dom';

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  email: string
  password: string
  confirmPassword: string
}


const schema = yup.object({
    email: yup.string().required('Email Required!').email('Invalid Email'),
    password: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed'),
    confirmPassword: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed').oneOf([yup.ref('password')], 'Password doesnt match')
  }).required()



function Register() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleRegister = async (data:any) => {
    try{
        let responseAuth = await supabase.auth.signUp({
            email: data.email,
            password: data.password
        })
        if(responseAuth.error){  
            toast.error(responseAuth.error.message, {position: toast.POSITION.TOP_CENTER})  
        }else{
            toast.success('Account succesfully created', {position: toast.POSITION.TOP_CENTER})  
            navigate('/')
        }
    }catch(error:any){
        alert(error.message)
    } 
}

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <h1><Gradient>Create</Gradient> your account.</h1>
          
          <form onSubmit={handleSubmit(handleRegister)}>
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
