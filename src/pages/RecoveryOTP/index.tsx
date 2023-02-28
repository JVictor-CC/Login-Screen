import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdPassword } from 'react-icons/md'

import OTPImage from '../../assets/OTP2.jpg'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../services/supabase'
import { toast } from "react-toastify";
import { useAuth } from '../../context/userAuth';


import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  code: string
}


const schema = yup.object({
  code: yup.string().required('Code Required!').matches(/^\d+$/, 'The field should have digits only').min( 6, 'the code has exactly 6 numbers')
}).required()



function RecoveryOTP() {
  const navigate = useNavigate()
  const { recoveryEmail ,setRecoveryEmail } = useAuth()

  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { code: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleRecovery = async (data:any) => {
    try{
      let response = await supabase.auth.verifyOtp({
        email: recoveryEmail,
        token: data.code,
        type: 'email'
      })
      if(response.error){
        toast.error( response.error.message, {position: toast.POSITION.TOP_CENTER}) 
      }else{
        setRecoveryEmail(null)
        toast.success('OTP valid', {position: toast.POSITION.TOP_CENTER})
        navigate('/reset')
      }
    }catch(error:any){
      alert(error.message)
    }
  }


  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1>Password <Gradient>Recovery</Gradient></h1></Center>
          <Center><img src={OTPImage} width={320} alt="" /></Center>
          <Center><p>An OTP has been sent to your registered email</p></Center>
          <form onSubmit={handleSubmit(handleRecovery)}>
            <Input leftIcon={<MdPassword />} label={'OTP code'} placeHolder={'type your code'} control={control} controllerName={'code'} errorMessage={errors.code?.message} length={6}/>
            <Button validForm={isValid} title={'Verify'} type="submit"/>
            <Center><p>If you didn't receive a code! <button>Resend</button> </p></Center>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default RecoveryOTP;
