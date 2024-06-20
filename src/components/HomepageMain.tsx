import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError } from 'axios';
import CampaignCard from './CampaignCard';
import CampaignDialog from './CampaignDialog';
import NotificationComponent from './NotificationComponent';
import { CampaignResponse } from '@/types';

interface Campaign {
  campaignId: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

const HomePageMain: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log('Error', error);
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
          const token = await getAccessTokenSilently();
          console.log('Access Token:', token); 

          const response = await axios.get<CampaignResponse>(
            `http://localhost:5170/campaigns?email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('API Response:', response.data.campaigns); // Log the response
          setUserCampaigns(response.data.campaigns);
          setLoading(false);
        } catch (error) {
          const axiosError = error as AxiosError;
          console.error('API Request Error:', axiosError.response); // Log the error response
          setError(`Error fetching campaigns: ${axiosError.message}`);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="m-2 p-2">
      <div className="flex flex-row justify-between">
        <h1 className="m-2 text-xl text-text-0 font-bold">My Campaigns</h1>
        <CampaignDialog />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          userCampaigns.length > 0 ? (
            userCampaigns.map((campaign, i) => (
              <CampaignCard key={i} campaign={campaign} />
            ))
          ) : (
            <p>You are not part of any campaigns</p>
          )
        )}
      </div>
      <NotificationComponent />
    </div>
  );
};

export default HomePageMain;
