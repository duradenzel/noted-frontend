import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios, { AxiosError } from 'axios';
import { Campaign } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';

interface CampaignFormData {
  title: string;
  description: string;
  maxplayers: string;  // Update to string to handle input changes
}

const CampaignDialog: React.FC = () => {
  const { user } = useAuth0();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    maxplayers: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.title || !formData.description || !formData.maxplayers) {
      setError("All fields are required.");
      return;
    }

    const maxplayersNumber = parseInt(formData.maxplayers, 10);
    if (isNaN(maxplayersNumber) || maxplayersNumber < 1) {
      setError("Max players must be at least 1.");
      return;
    }

    setError(null);  // Clear previous errors

    try {
      await axios.post<Campaign>(
        `http://localhost:5170/campaigns?email=${user?.email}`,
        { ...formData, maxplayers: maxplayersNumber }  // Convert maxplayers to number
      );
      window.location.replace('/');
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error fetching users: ${axiosError.message}`);
    }

    setFormData({ title: '', description: '', maxplayers: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="" className='create-campaign' id='create-campaign-button'>
          <h1 className="bg-primary-400 text-white p-1  rounded-md">
            + Create New
          </h1>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new Campaign</DialogTitle>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  type='text'
                  placeholder="Campaign Name"
                  className="col-span-3"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  type="textarea"
                  placeholder="Campaign Description"
                  className="col-span-3"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxplayers" className="text-right">
                  Players
                </Label>
                <Input
                  id="maxplayers"
                  placeholder="Players"
                  className="col-span-1"
                  value={formData.maxplayers}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button id='submit-campaign' type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
