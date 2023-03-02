import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdPassword } from 'react-icons/md'

import resetPassImage from '../../assets/resetPass-opt.jpg'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from '../../services/supabase'
import { toast } from "react-toastify";

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";
import { useAuth } from "../../context/userAuth";


interface ILoginForm {
  password: string
  confirmPassword: string
}


const schema = yup.object({
    password: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed'),
    confirmPassword: yup.string().required('Password Required').min(8, 'Password must be more than 8 characters').matches(/^\S*$/, 'No Whitespaces Allowed').oneOf([yup.ref('password')], 'Password doesnt match')
  }).required()



function Reset() {

  const navigate = useNavigate()
  const { updateUser } = useAuth()

  const { control, formState: {errors, isValid}, handleSubmit} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleReset = async (inputData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const response = await supabase.auth.admin.updateUserById(
        user.id,
        { password: inputData.password}
      )
      if(response.error){
        toast.error( response.error.message, {position: toast.POSITION.TOP_CENTER}) 
      }else{
        updateUser()
        toast.success('Password successfully changed', {position: toast.POSITION.TOP_CENTER})
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
          <Center><h1>Password <Gradient>Reset</Gradient></h1></Center>
          <Center><img src={resetPassImage} width={320} alt="" /></Center>
          <Center><p>For the safety of your account, please use a strong password.</p></Center>
          <form onSubmit={handleSubmit(handleReset)}>
            <Input leftIcon={<MdPassword/>} label={'New password'} type={'password'} placeHolder={'type your password'} control={control} controllerName={'password'} errorMessage={errors.password?.message}/>
            <Input leftIcon={<MdPassword />} label={'Confirm new password'} type={'password'} placeHolder={'confirm your password'} control={control} controllerName={'confirmPassword'} errorMessage={errors.confirmPassword?.message}/>
            <Button validForm={isValid} title={'Reset Password'} type="submit"/>
          </form>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Reset;
