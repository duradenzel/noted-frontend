import React from 'react'
import LoginForm from './LoginForm'
import img from '../assets/login-image.jpg'

const LoginPage = () => {
  return (
    
    <div className='flex flex-row bg-cover'>
        <img src={img} alt="" className='w-2-5 h-screen'/>
        <LoginForm/>
    </div>
    
  )
}

export default LoginPage