import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InfoDisplay from "../../components/InfoDisplay";

import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

import { LoginInfo, LoginContainer, LoginImage, Screen, Gradient, Center} from "../../styles/styledpages";
import { useAuth } from "../../context/userAuth";


function ProfileInfo() {
  const navigate = useNavigate()
  const { setSigned, user, resetUser } = useAuth()
  
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

  const goToUpdate = () => {
    navigate('/update')
  }

  return (
    <Screen>
      <LoginContainer>
        <LoginInfo>
          <Center><h1><Gradient>Profile Details</Gradient></h1></Center>
          <Center><p>Check your account details.</p></Center>
          <InfoDisplay title={'Email'} text={user.email}/>
          <InfoDisplay title={'Name'} text={user.name}/>
          <InfoDisplay title={'Username'} text={user.username}/>
          <InfoDisplay title={'Mobile'} text={user.mobile}/>
          <InfoDisplay title={'Address'} text={user.address}/>

        <Button title={'Update Profile'} onClick={goToUpdate}/>
        <Center><Button onClick={handleLogout} title={'Log out'} variant={'logout'}/></Center>
        </LoginInfo>
      </LoginContainer>
      <LoginImage/>
    </Screen>
  );
}

export default ProfileInfo;
