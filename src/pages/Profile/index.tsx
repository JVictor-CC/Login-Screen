import React from "react";
//import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";


interface ILoginForm {
  name: string
  username: string
  email: string
  mobile: string
  address: string
}


const schema = yup.object({
    name: yup.string().min(2, 'At least 2 characters'),
    username: yup.string().min(4, 'At least 4 character').matches(/^\S*$/, 'No Whitespaces Allowed'),
    email: yup.string().email('It must be a valid email'),
    mobile: yup.number(),
    address: yup.string()
  }).required()



function Profile() {

  const { control, formState: {errors, isValid}, handleSubmit} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', username: '', email: '', mobile: '', address: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmitProfile = (data: any) => {
    console.log('data:', data)
  }

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1><Gradient>Profile</Gradient></h1></Center>
          <Center><p>Update your account details.</p></Center>
          <form onSubmit={handleSubmit(onSubmitProfile)}>
            <Input label={'name'} type={'text'} placeHolder={'Your name'} control={control} controllerName={'name'} errorMessage={errors.name?.message}/>
            <Input label={'Username'} type={'text'} placeHolder={'Username'} control={control} controllerName={'username'} errorMessage={errors.username?.message}/>
            <Input label={'email'} type={'email'} placeHolder={'Email'} control={control} controllerName={'email'} errorMessage={errors.email?.message}/>
            <Input label={'mobile'} type={'text'} placeHolder={'(xx) xxxxx-xxxx'} length={11} control={control} controllerName={'mobile'} errorMessage={errors.mobile?.message}/>
            <Input label={'address'} type={'text'} placeHolder={'Address'} control={control} controllerName={'address'} errorMessage={errors.address?.message}/>
            <Button validForm={isValid} title={'Update'} type="submit"/>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Profile;
