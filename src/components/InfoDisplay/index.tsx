import React from 'react'
import {  InfoContainer  } from './style'

interface IDisplayInfo{
    title: string
    text: string | null
}

const InfoDisplay = ({ title, text } :IDisplayInfo) => {
  return (<>
    
    <InfoContainer>
        <p>{title}:</p><p> {text ? text : 'None' }</p>
    </InfoContainer>
  </>)
}

export default InfoDisplay