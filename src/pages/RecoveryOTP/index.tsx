import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdPassword } from 'react-icons/md'

import OTPImage from '../../assets/OTP2.jpg'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  code: string
}


const schema = yup.object({
  code: yup.string().required('Code Required!').matches(/^\d+$/, 'The field should have digits only').min( 6, 'the code has exactly 6 numbers')
}).required()



function RecoveryOTP() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { code: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmitRecovery = (data:any) => {
    console.log(data)
    navigate('/reset')
  }


  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1>Password <Gradient>Recovery</Gradient></h1></Center>
          <Center><img src={OTPImage} width={320} alt="" /></Center>
          <Center><p>An OTP has been sent to your registered email</p></Center>
          <form onSubmit={handleSubmit(onSubmitRecovery)}>
            <Input leftIcon={<MdPassword />} label={'OTP code'} placeHolder={'type your code'} control={control} controllerName={'code'} errorMessage={errors.code?.message} length={6}/>
            <Button validForm={isValid} title={'Verify'} type="submit"/>
            <span><p>If you didn't receive a code! <button>Resend</button> </p></span>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default RecoveryOTP;
