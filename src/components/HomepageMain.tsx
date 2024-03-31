import React, { useEffect, useState } from 'react';
import { User } from '@auth0/auth0-react'; 
import CampaignCard from './CampaignCard';
import CampaignDialog from './CampaignDialog';
import BackendConnect from './BackendConnect';

interface Campaign {
  campaignId: number;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && user.email) {
      BackendConnect({
        url: `http://localhost:5170/campaigns?email=${user.email}`,
        method: 'GET',
        onSuccess: (data: any) => {
          setUserCampaigns(data.data.campaigns); 
          setLoading(false); 
        },
        onError: (error: any) => {
          console.log(error);
          setLoading(false); 
        }
      });
    }
  }, [user]);

  return (
    <div className='m-2 p-2'>
      <div className='flex flex-row justify-between'>
        <h1 className='m-2 text-xl text-text-0 font-bold'>My Campaigns</h1>   
        <CampaignDialog/>
      </div>
      <div className=''>
        {loading ? (<p>Loading...</p>) 
        : (
          userCampaigns?.map((campaign, i) => (
            <CampaignCard key={i} campaign={campaign}/>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePageMain;
