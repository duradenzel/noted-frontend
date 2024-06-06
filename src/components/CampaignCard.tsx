import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Campaign {
  campaignId: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  console.log(campaign);
  return (
    <Link
      to={`/campaigns/${campaign.campaignId}`}
      className="text-decoration-none"
    >
      <Card className="campaign-card bg-bgcolor-0 text-text-0 m-2">
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
          <CardDescription>
            {campaign.description.length > 150
              ? campaign.description.slice(0, 150) + '...'
              : campaign.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>DM: {campaign.dmId}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CampaignCard;
