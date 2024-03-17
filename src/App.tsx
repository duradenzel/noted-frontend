
import './App.css'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";

import { BrowserRouter, Navigate, Route, redirect as Router, Routes} from 'react-router-dom';
import Redirect from 'react-router-dom';

function App() {
  
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={isAuthenticated ? <HomePage/> : <Navigate to='/login'/>}/>
        <Route  path='/login' element={<LoginPage/>}/>
       
        {/* <Route  path='/login'>
          {isAuthenticated ? <HomePage/> : <Navigate to='/login'/>}
        </Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
