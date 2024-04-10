import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MoreVertical } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import LogoutButton from "./Logout";


interface ProfileProps {
    expanded: boolean; 
  }

const Profile: React.FC<ProfileProps> = ({expanded}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="border-t flex p-3">
      <img
        src={isAuthenticated ? user?.picture : "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
        alt=""
        className="w-10 h-10 rounded-md"
      />
      <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="leading-4">
            <h4 className="font-semibold text-text-0">{isAuthenticated ? user?.name : "Name"}</h4>
            <span className="text-xs text-text-0">{isAuthenticated ? user?.email : "email@gmail.com"}</span>
          </div>
        )}
        <Popover>
  <PopoverTrigger><MoreVertical size={20} />
  </PopoverTrigger>
  <PopoverContent className="w-auto h-auto"><LogoutButton/></PopoverContent>
</Popover>
        
      </div>
    </div>
  );
};

export default Profile;