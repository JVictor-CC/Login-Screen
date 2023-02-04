import styled from "styled-components"

export const InputLabel = styled.label`
    display: block;
    font-size: 16px;
    margin-top: 35px;
    text-transform: capitalize;
`

export const InputContainer = styled.div`
    margin: 10px 0;
    width: 100%;
    height: 50px;
    background-color: #D5D6E0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    input{
        background-color: transparent;
        border: none;
        flex: 1;
        height: 100%;
        text-align: center;
        outline: none;
    }
`

export const IconContainer = styled.div`
    padding: 10px;
    font-size: 20px;
    color: #66645D;
    margin: 0;
    
    background-color: #fff;
    border: solid 3px #D5D6E0;
`

export const DisplayError = styled.p`
    color: red;
    font-size: 14px;
`