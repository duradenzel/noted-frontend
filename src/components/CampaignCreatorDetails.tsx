import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface CampaignCreatorDetailsProps {
  dmId: number;
}

const CampaignCreatorDetails: React.FC<CampaignCreatorDetailsProps> = ({ dmId }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Created By</h2>
      <div className='flex items-center'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="ml-2">{dmId}</p>
      </div>
    </div>
  );
};

export default CampaignCreatorDetails;
