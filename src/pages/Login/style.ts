import styled from "styled-components";

export const LoginContainer = styled.div`
    max-width: 600px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid;
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

    hr{
        color: #D5D6E0;
        width: 100%;
        margin: 10px 0 20px;
    }
`

export const LoginImageContainer = styled.div`
    width: 100%;
`

export const LoginImage = styled.img`

`  
