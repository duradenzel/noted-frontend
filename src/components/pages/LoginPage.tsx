import img from '../../assets/login-image.jpg'
import LoginButton from '../LoginButton'


const LoginPage = () => {
  return (
    <>   
    <div className='flex flex-row bg-cover'>
        <img src={img} alt="" className='w-2-5 h-screen'/>
        <LoginButton/>
    </div>
    
    </>
  )
}

export default LoginPage