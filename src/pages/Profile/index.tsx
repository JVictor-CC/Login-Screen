import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";
import { useAuth } from "../../context/userAuth";



interface ILoginForm {
  name: string
  username: string
  mobile: string
  address: string
}


const schema = yup.object({
    name: yup.string().min(2, 'At least 2 characters'),
    username: yup.string().min(4, 'At least 4 character').matches(/^\S*$/, 'No Whitespaces Allowed'),
    mobile: yup.number(),
    address: yup.string()
  }).required()



function Profile() {
  const navigate = useNavigate()
  const { setSigned, resetUser, updateUser} = useAuth()
  const { control, formState: {errors, isValid}, handleSubmit} = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', username: '', mobile: '', address: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const handleUpdateProfile = async (data: any) => {
    try{
      let response = await supabase.auth.getSession()
      if(response.error){
        toast.error( response.error.message, {position: toast.POSITION.TOP_CENTER}) 
      }else if(response.data.session !== null){
        toast.success( 'Your account was successfully updated', {position: toast.POSITION.TOP_CENTER})
        const userData = response.data.session.user
        try {
          const responseDb = await supabase
            .from('profiles')
            .update({ full_name: data.name, username: data.username, mobile: data.mobile, address: data.address})
            .eq('id', userData.id)
          if(responseDb.error){
              toast.error(responseDb.error.message, { position: toast.POSITION.TOP_CENTER })
          }else{
              updateUser()
          }
        }catch(error: any){
          alert(error.message)          
        }
      }
    }catch(error: any){
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if(error){
      toast.error( error.message, {position: toast.POSITION.TOP_CENTER}) 
    }else{
      setSigned(false) 
      resetUser()
      toast.success( 'You logged out', {position: toast.POSITION.TOP_CENTER})
      navigate('/')
    }
  }
  
  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1><Gradient>Profile</Gradient></h1></Center>
          <Center><p>Update your account details.</p></Center>
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <Input label={'name'} type={'text'} placeHolder={'Your name'} control={control} controllerName={'name'} errorMessage={errors.name?.message}/>
            <Input label={'Username'} type={'text'} placeHolder={'Username'} control={control} controllerName={'username'} errorMessage={errors.username?.message}/>
            <Input label={'mobile'} type={'text'} placeHolder={'(xx) xxxxx-xxxx'} length={11} control={control} controllerName={'mobile'} errorMessage={errors.mobile?.message}/>
            <Input label={'address'} type={'text'} placeHolder={'Address'} control={control} controllerName={'address'} errorMessage={errors.address?.message}/>
            <Button validForm={isValid} title={'Update'} type="submit"/>
          </form>
        <Center><Button onClick={handleLogout} title={'Log out'} variant={'logout'}/></Center>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default Profile;
