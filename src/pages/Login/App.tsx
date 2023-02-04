import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdEmail, MdPassword } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient} from "./style";

interface ILoginForm {
  email: string
  password: string
}


const schema = yup.object({
    email: yup.string().email('email não é válido').required('Preencha o campo acima'),
    password: yup.string().min(8, 'no minimo 8 caracteres').required('Preencha o campo acima')
  }).required()



function App() {

  const { control, formState: {errors, isValid},} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })


  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <h1>Welcome to <Gradient>MyCompanion</Gradient>, Sign in to Continue.</h1>
          <p>Don't have an account? <a href="#">Create a account</a>  <br /> It takes less than a minute.</p>
          <Input leftIcon={<MdEmail />} label={'email'} placeHolder={'type your email'} control={control} errorMessage={errors.email?.message}/>
          <Input leftIcon={<MdPassword />} label={'password'} placeHolder={'********'} control={control} errorMessage={errors.password?.message}/>
          <span><a href="#">Forget Password?</a></span>
          <Button validForm={isValid} title={'Sign In'} type="submit"/>
        </LoginInfo>
      </LoginContainer>
      <LoginImage>

      </LoginImage>
    </Screen>
  );
}

export default App;
