import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SidebarLayout } from '../SidebarLayout';
import CampaignHeader from '../CampaignHeader';
import Timeline from '../Timeline';
import { Separator } from '../ui/separator';
import { Campaign } from '@/types';
import axios, { AxiosError } from 'axios';


const CampaignDetailsPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaign] = useState<Campaign>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Campaign>(`http://localhost:5170/campaigns/${campaignId}`);
        setCampaign(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(`Error fetching users: ${axiosError.message}`);
        
      }
    };

    fetchData();
  }, [campaignId]);
  console.log(error);
  return (
    <div className='flex bg-bgcolor-50'>
      <SidebarLayout/>
      <div className="h-screen w-full">
        <div className="overflow-auto h-full flex-1 w-full px-5 ">
          {campaign && <CampaignHeader campaign={campaign}/>}
          <Separator className='bg-text-100'/>
          {campaign && <Timeline campaignId={campaign.campaignId}/>}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
