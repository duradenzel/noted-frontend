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

interface SessionFormData {
  campaignId: number,
  title: string;
  summary: string;
  date: string;  // Update to string to handle input changes
}

interface DialogProps {
  campaignId: number;
}

const SessionDialog: React.FC<DialogProps> = ({ campaignId }) => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<SessionFormData>({
    campaignId: campaignId,
    title: '',
    summary: '',
    date: '',
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
    if (!formData.title || !formData.summary || !formData.date) {
      setError("All fields are required.");
      return;
    }

    setError(null);  // Clear previous errors

    try {
      await axios.post<Campaign>(
        `http://localhost:5170/sessions`,
        formData
      );
      setOpen(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error creating session: ${axiosError.message}`);
    }

    setFormData({ campaignId, title: '', summary: '', date: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="" className='create-campaign'>
          <h1 id="create-session-button" className="bg-primary-400 text-white p-1 rounded-md">
            + New Session
          </h1>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new Session</DialogTitle>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  type='text'
                  placeholder="Session Title"
                  className="col-span-3"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  Summary
                </Label>
                <Input
                  id="summary"
                  type="textarea"
                  placeholder="What happened last time?"
                  className="col-span-3"
                  value={formData.summary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type='date'
                  className="col-span-1"
                  value={formData.date}
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

export default SessionDialog;
