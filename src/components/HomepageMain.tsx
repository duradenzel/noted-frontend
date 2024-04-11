import React, { useEffect, useState } from 'react';
import { User } from '@auth0/auth0-react';
import CampaignCard from './CampaignCard';
import CampaignDialog from './CampaignDialog';
import axios, { AxiosError } from 'axios';
import { CampaignResponse } from '@/types';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const response = await axios.get<CampaignResponse>(
            `http://localhost:5170/campaigns?email=${user.email}`,
          );
          console.log(response.data.campaigns);
          setUserCampaigns(response.data.campaigns);
          setLoading(false);
        } catch (error) {
          const axiosError = error as AxiosError;
          setError(`Error fetching users: ${axiosError.message}`);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  console.log(error);
  return (
    <div className="m-2 p-2">
      <div className="flex flex-row justify-between">
        <h1 className="m-2 text-xl text-text-0 font-bold">My Campaigns</h1>
        <CampaignDialog />
      </div>
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : (
          userCampaigns?.map((campaign, i) => (
            <CampaignCard key={i} campaign={campaign} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePageMain;
