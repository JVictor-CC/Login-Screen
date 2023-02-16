import styled from "styled-components";
import image from "../../assets/bg-m.jpg"

export const Screen = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    
    @media screen and (max-width: 700px){
        justify-content: center;
    }
`

export const LoginContainer = styled.div`
    max-width: 550px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 
`

export const LoginInfo = styled.div`
    width: 100%;
    text-align: left;
    margin: 40px;

    h1{
        margin: 10px 0 20px;
        line-height: 45px;
    }

    p{
        margin: 10px 0 50px;
        line-height: 22px;
    }
    
    a{
        color: #000;
        transition: 0.3s;
    }

    a:hover{
        color: gray;
        transition: 0.3s;
    }

    span{
        display: block;
        text-align: center;
        margin: 25px 0 50px;
    }
`

export const Gradient = styled.p`
    background: -webkit-linear-gradient(270deg, #AA00B3, #6B0071, #000);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline;
`

export const LoginImage = styled.div`
    background-image: url(${image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100%;

    @media screen and (max-width: 700px){
        display: none;
    } 
`  
