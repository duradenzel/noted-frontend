import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  

  interface Campaign {
    id: number;
    title: string;
    description: string;
    dmId: number;
    maxPlayers: number;
  }

  interface CampaignCardProps{
    campaign: Campaign
  }
  const CampaignCard: React.FC<CampaignCardProps> = ({campaign}) => {
    return (
      <Card className='bg-bgcolor-0 text-text-0'>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
          <CardDescription>{campaign.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>DM : {campaign.dmId}</p>
        </CardContent>
      </Card>
    );
  };
  
  export default CampaignCard