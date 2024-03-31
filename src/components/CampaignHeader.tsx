import React from 'react';
import DefaultImage from '../assets/campaign-banner.png';

interface HeaderProps {
  campaign: Campaign;
}

interface Campaign {
  campaignid: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

const CampaignHeader: React.FC<HeaderProps> = ({ campaign }) => {
  return (
    <div className="text-text-700 py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <div className='mb-5 border-bottom-2 '>
            {DefaultImage && <img src={DefaultImage} alt="Campaign Banner" className="w-full h-48 object-cover" />}
        </div>
        <div className="header-content">
          <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-lg mb-4">{campaign.description}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">DM Information</h2>
          <p>{campaign.dmId}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Player Invitation</h2>
          <p>Player Count: 0/{campaign.maxPlayers}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Invite Players</button>
          <p className="mt-2">No players invited yet. Invite some to join!</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
