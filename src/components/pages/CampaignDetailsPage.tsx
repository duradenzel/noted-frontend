import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendConnect from '../BackendConnect';
import { SidebarLayout } from '../SidebarLayout';
import {User, useAuth0} from '@auth0/auth0-react';
import CampaignHeader from '../CampaignHeader';
import Timeline from '../Timeline';
import { Separator } from '../ui/separator';
interface Campaign {
  campaignId: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;

}

const CampaignDetailsPage: React.FC = () => {
    const user = useAuth0();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaigns] = useState<Campaign | null>(null);

  useEffect(() => {
    BackendConnect({
      url: `http://localhost:5170/campaigns/${campaignId}`,
      method: 'GET',
      onSuccess: (data: any) => {
        setCampaigns(data.data);
      },
      onError: (error: any) => {
        console.log(error);
      }
    });
  }, [campaignId]);


  const dummySessions = [
    {
      sessionId: 1,
      campaignId: 1,
      date: "May 10, 2023",
      title: "Session 1: The Journey Begins",
      summary: "The adventurers meet in the town of Oakvale and embark on their first quest to retrieve a stolen artifact.",
    },
    {
      sessionId: 2,
      campaignId: 1,
      date: "May 17, 2023",
      title: "Session 2: Into the Goblin Cave",
      summary: "The party delves into the dark depths of the goblin cave, facing traps and enemies along the way.",
    },
    {
      sessionId: 3,
      campaignId: 1,
      date: "May 24, 2023",
      title: "Session 3: The Ancient Ruins",
      summary: "Exploring the ancient ruins, the adventurers uncover a hidden chamber and confront a powerful necromancer.",
    },
  ];


  
  return (
    <div className='flex bg-bgcolor-50'>
      <SidebarLayout/>
      <div className=" h-screen w-full">
        <div className="overflow-auto h-full flex-1 w-full px-5 ">
          {campaign && <CampaignHeader campaign={campaign}/>}
          <Separator className='bg-text-100'/>
        <Timeline sessions={dummySessions}/>
        </div>
      </div>
    </div>
  );
  
  
};

export default CampaignDetailsPage;
