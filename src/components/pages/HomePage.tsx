import { SidebarLayout } from '../SidebarLayout'
import { useAuth0 } from '@auth0/auth0-react';
import HomePageMain from '../HomepageMain';

const HomePage = () => {
  const { user } = useAuth0();
  console.log(user);

  return (
    
    <div className='flex flex-row bg-bgcolor-50'>
        
        <SidebarLayout/>
        <HomePageMain user={user}/>
    </div>
  )
}

export default HomePage