import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdEmail} from 'react-icons/md'

import forgetPassImage from '../../assets/forgetpassword-opt.jpg'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../services/supabase'
import { toast } from "react-toastify";
import { useAuth } from '../../context/userAuth';
import { useNavigate } from 'react-router-dom';

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  email: string
}

const schema = yup.object({
    email: yup.string().required('Email Required!').email('Invalid Email'),
}).required()


function Recovery() {
  const navigate = useNavigate()
  const { setRecoveryEmail } = useAuth()

  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: ''},
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleRecovery = async (data: any) => {
    try{
      let response = await supabase.auth.resetPasswordForEmail(data.email)
      if(response.error){
        toast.error( response.error.message, {position: toast.POSITION.TOP_CENTER}) 
      }else{
        setRecoveryEmail(data.email)
        toast.success('A code has been sent to your email', {position: toast.POSITION.TOP_CENTER}) 
        navigate('/recoveryOTP')
      }
    }
    catch(error: any){
      alert(error.message)
    }
  }

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1>Password <Gradient>Recovery</Gradient></h1></Center>
          <Center><img src={forgetPassImage} width={250} alt="" /></Center>
          <Center><p>Enter Your Registered Email</p></Center>
          
          <form onSubmit={handleSubmit(handleRecovery)}>
            <Input leftIcon={<MdEmail />} label={'email'} type={'email'} placeHolder={'type your email'} control={control} controllerName={'email'} errorMessage={errors.email?.message}/>
            <Button validForm={isValid} title={'Send OTP'} type="submit"/>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Recovery;
