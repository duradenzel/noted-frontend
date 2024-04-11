import React, { useState, useCallback, ChangeEvent } from 'react';
import DefaultImage from '../assets/campaign-banner.png';
import { RiEditFill } from 'react-icons/ri';
import CampaignInformation from './CampaignInformation';
import InvitePlayers from './InvitePlayers';
import CampaignCreatorDetails from './CampaignCreatorDetails';
import ConfirmationDialog from './ConfirmationDialog';
import axios, { AxiosError } from 'axios';

interface HeaderProps {
  campaign: Campaign;
}

interface Campaign {
  campaignId: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

const useCampaignLogic = (campaign: Campaign) => {
  const [editedCampaign, setEditedCampaign] = useState<Campaign>({
    ...campaign,
  });
  const [error, setError] = useState<string | null>(null);

  const handleEditCampaign = useCallback(async () => {
    try {
      await axios.put<Campaign>(
        `http://localhost:5170/campaigns/${campaign.campaignId}`,
        editedCampaign,
      );
      window.location.reload();
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error fetching users: ${axiosError.message}`);
    }

    // BackendConnect({
    //   url: `${API_BASE_URL}${campaign.campaignId}`,
    //   method: 'PUT',
    //   data: editedCampaign,
    //   onSuccess: () => {
    //     console.log('Campaign updated successfully');
    //     window.location.reload();
    //   },
    //   onError: (error: any) => {
    //     console.error('Error updating campaign:', error);
    //   }
    // });
  }, [editedCampaign, campaign.campaignId]);
  console.log(error);
  const handleDeleteCampaign = useCallback(async () => {
    try {
      await axios.delete<Campaign>(
        `http://localhost:5170/campaigns/${campaign.campaignId}`,
      );
      window.location.replace('/');
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error fetching users: ${axiosError.message}`);
    }
    // BackendConnect({
    //   url: `${API_BASE_URL}${campaign.campaignId}`,
    //   method: 'DELETE',
    //   onSuccess: () => {
    //     console.log('Campaign deleted successfully');
    //     window.location.replace("/");
    //   },
    //   onError: (error: any) => {
    //     console.error('Error deleting campaign:', error);
    //   }
    // });
  }, [campaign]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setEditedCampaign((prevCampaign) => ({ ...prevCampaign, [name]: value }));
    },
    [],
  );

  return {
    editedCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleInputChange,
  };
};

const CampaignHeader: React.FC<HeaderProps> = ({ campaign }) => {
  const {
    editedCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleInputChange,
  } = useCampaignLogic(campaign);
  const isChanged =
    editedCampaign.title !== campaign.title ||
    editedCampaign.description !== campaign.description;

  return (
    <div className="text-text-700 py-12  flex flex-col md:flex-row items-start w-full">
      <div className="w-full mb-4 md:mb-0 md:mr-4">
        <div className="mb-5 border-bottom-2 w-full">
          {DefaultImage && (
            <img
              src={DefaultImage}
              alt="Campaign Banner"
              className="w-full h-[13.75rem] object-cover"
            />
          )}
        </div>
        <div className="header-content w-full">
          <div className="flex justify-between items-start w-full">
            <CampaignInformation
              title={editedCampaign.title}
              description={editedCampaign.description}
              onChange={handleInputChange}
            />
            {isChanged && (
              <div
                className="bg-primary-500 text-white rounded h-6 w-6 items-center  flex justify-center"
                onClick={handleEditCampaign}
              >
                <RiEditFill className="" />
              </div>
            )}
            <ConfirmationDialog onConfirm={handleDeleteCampaign} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/5 mx-auto">
        <CampaignCreatorDetails dmId={campaign.dmId} />
        <InvitePlayers />
      </div>
    </div>
  );
};

export default CampaignHeader;
