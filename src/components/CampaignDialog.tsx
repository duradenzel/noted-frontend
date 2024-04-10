import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios, { AxiosError } from "axios";
import { Campaign } from "@/types";
import {useAuth0 } from "@auth0/auth0-react";
interface CampaignFormData {
  title: string;
  description: string;
  maxplayers: number;
}

const CampaignDialog: React.FC = () => {
  const { user } = useAuth0();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    maxplayers: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ title: "", description: "" , maxplayers: 0});
    try {
      await axios.post<Campaign>(`http://localhost:5170/campaigns?email=${user?.email}`, formData);
      window.location.replace("/")
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error fetching users: ${axiosError.message}`);
    }
  
  };
console.log(error)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="">
          <h1 className="bg-primary-400 text-white p-1  rounded-md">+ Create New</h1>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new Campaign</DialogTitle>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
