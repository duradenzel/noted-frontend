import React from 'react'
import { SidebarLayout } from '../SidebarLayout'
import { useAuth0 } from '@auth0/auth0-react';
import HomePageMain from '../HomepageMain';



const HomePage = () => {
  const { user } = useAuth0();
  console.log(user);

  return (
    <div className='flex flex-row-reverse bg-bgcolor-50'>
        <HomePageMain user={user}/>
        <SidebarLayout/>
    </div>
  )
}

export default HomePage