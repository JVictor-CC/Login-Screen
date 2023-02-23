import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdEmail} from 'react-icons/md'

import forgetPassImage from '../../assets/forgetpassword.jpg'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  email: string
}

const schema = yup.object({
    email: yup.string().required('Email Required!').email('Invalid Email'),
}).required()


function Recovery() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: ''},
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmitRecovery = (data:any) => {
    console.log(data)
    navigate('/recoveryOTP')
  }

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1>Password <Gradient>Recovery</Gradient></h1></Center>
          <Center><img src={forgetPassImage} width={250} alt="" /></Center>
          <Center><p>Enter Your Registered Email</p></Center>
          <form onSubmit={handleSubmit(onSubmitRecovery)}>
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
