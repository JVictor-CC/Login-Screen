import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { LoginInfo, LoginContainer, LoginImageContainer } from "./style";

function App() {
  return (<>
    <LoginContainer>
      <LoginInfo>
        <h1>Welcome to MyCompanion, <br /> Sign in to continue</h1>
        <p>Don't have an account? <a href="#">Create a account</a>  <br /> It takes less than a minute</p>
        <Input label={'Email'} placeHolder={'type your email'} />
        <Input label={'Password'} placeHolder={'********'} />
        <span><a href="">Forget Password?</a></span>
        <Button title={'Sign In'} />
        <hr />
        <Button title={'Sign In with Google'} variant={'secondary'}/>
        
      </LoginInfo>
    </LoginContainer>
    <LoginImageContainer>

    </LoginImageContainer>
    
  </>);
}

export default App;
