import styled, {css} from "styled-components"

interface IErrorMessage{
    variant: string
}

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
    border-radius: 6px;
`

export const DisplayError = styled.div<IErrorMessage>`
    position: relative;
    height: 30px;
    top: -9.5px;
    background-color: #3B2F30;
    border-radius: 0 0 5px 5px;
    color: #fff;
    transition: 0.5s;

    ${({variant}) => variant === 'nodisplay' && css`
        height: 0px;
        overflow: hidden;
        padding: 0;
    `}

    p{
        font-size: 14px;
        transform: translate(4%, 20%);
    }
`