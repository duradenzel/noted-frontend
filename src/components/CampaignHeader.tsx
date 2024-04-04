import React, { useState } from 'react';
import DefaultImage from '../assets/campaign-banner.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import BackendConnect from './BackendConnect';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

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

const CampaignHeader: React.FC<HeaderProps> = ({ campaign }) => {
  const [editedCampaign, setEditedCampaign] = useState<Campaign>({ ...campaign });

  const isChanged = () => {
    return editedCampaign.title !== campaign.title || editedCampaign.description !== campaign.description;
  };

  const handleEditCampaign = () => {
    console.log(editedCampaign);

    BackendConnect({
      url: `http://localhost:5170/campaigns/${campaign.campaignId}`,
      method: 'PUT',
      data: editedCampaign,
      onSuccess: (response) => {
        console.log('Campaign updated successfully:', response.data);
        window.location.reload();
      },
      onError: (error) => {
        console.error('Error updating campaign:', error);
      }
    });
  };

  const handleDeleteCampaign = () => {
    BackendConnect({
      url: `http://localhost:5170/campaigns/${campaign.campaignId}`,
      method: 'DELETE',
      onSuccess: (response) => {
        console.log('Campaign deleted successfully:', response.data);
      window.location.replace("/")
      },
      onError: (error) => {
        console.error('Error deleting campaign:', error);
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedCampaign({ ...editedCampaign, [name]: value });
  };

  return (
    <div className="text-text-700 py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start w-full">
      <div className=" w-full mb-4 md:mb-0 md:mr-4">
        <div className='mb-5 border-bottom-2 w-full '>
          {DefaultImage && <img src={DefaultImage} alt="Campaign Banner" className="w-full h-[13.75rem] object-cover" />}
        </div>
        <div className="header-content w-full">
          <div className=' flex justify-between items-center'>
            <input
              type="text"
              name="title"
              className="text-3xl font-bold mb-2 w-full bg-bgcolor-50 "
              value={editedCampaign.title}
              onChange={handleInputChange}
            />
            {isChanged() && (
              <button className='bg-primary-500 text-white rounded h-6 w-6 items-center ml-2 ' onClick={handleEditCampaign}><RiEditFill className='w-4/5 h-4/5 m-auto'/></button>
            )}
            <button className='bg-accent-500 text-white rounded h-6 w-6 items-center ml-2 '><MdDelete className='w-4/5 h-4/5 m-auto'/></button>
          </div>
          <textarea
            name="description"
            className="text-lg mb-4 w-full bg-bgcolor-50 h-auto min-h-64 resize-none "
            value={editedCampaign.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="w-full md:w-3/5 mx-auto">
        <div className="mb-4 ">
          <h2 className="text-lg font-semibold mb-2">Created By</h2>
          <div className='flex items-center'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="ml-2">{campaign.dmId}</p> 
        </div>
        </div>

        <div className='bg-bgcolor-100 p-2'>
          
          <div className='flex items-center justify-between'>
            <h1>0 Players</h1>
            <button className="bg-primary-500 text-white px-4 py-2 rounded mt-2 justify-end">Invite Players</button>
          </div>
          <p className="py-5 mx-auto text-center">No players invited yet. Invite some to join!</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
