import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@auth0/auth0-react'; 
import CampaignCard from './CampaignCard';

interface Campaign {
  id: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

interface UserProps {
  user: User | undefined;
}

const HomePageMain: React.FC<UserProps> = ({ user }) => {
  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]); 
  console.log(userCampaigns);
  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:5170/api/campaign/get?email=${user.email}`)
        .then((response) => {
          setUserCampaigns(response.data.campaigns); 
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]); 

  return (
    <div className='m-2 p-2'>
      <h1 className='m-2 text-xl text-text-0 font-bold'>My Campaigns</h1>   
      <div className=' flex flex-row justify-between'>
        {userCampaigns.map((campaign, i) => (
          <CampaignCard key={i} campaign={campaign}/>
        ))}
      </div>
    </div>
  );
};

export default HomePageMain;
