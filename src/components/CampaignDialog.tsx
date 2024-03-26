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

interface CampaignFormData {
  name: string;
  description: string;
}

const CampaignDialog: React.FC = () => {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Now formData contains the values of inputs, you can send this data to your backend
    console.log(formData);
    // Reset form data if needed
    setFormData({ name: "", description: "" });
  };

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
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Campaign Name"
                  className="col-span-3"
                  value={formData.name}
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
