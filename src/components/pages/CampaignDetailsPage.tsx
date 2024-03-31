import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendConnect from '../BackendConnect';
import { SidebarLayout } from '../SidebarLayout';
import {User, useAuth0} from '@auth0/auth0-react';
import CampaignHeader from '../CampaignHeader';
interface Campaign {
  campaignid: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;

}

const CampaignDetailsPage: React.FC = () => {
    const user = useAuth0();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaigns] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    BackendConnect({
      url: `http://localhost:5170/campaigns/${campaignId}`,
      method: 'GET',
      onSuccess: (data: any) => {
        console.log(data);
        setCampaigns(data.data);
        setLoading(false);
      },
      onError: (error: any) => {
        console.log(error);
        setLoading(false);
      }
    });
  }, [campaignId]);
  
  return (
    <div className='flex flex-row bg-bgcolor-50'>
      <SidebarLayout/>
      <div className=" h-screen">
        <div className="overflow-auto h-full">
          {campaign && <CampaignHeader campaign={campaign}/>}
        </div>
      </div>
    </div>
  );
  
  
};

export default CampaignDetailsPage;
