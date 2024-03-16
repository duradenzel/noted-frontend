

import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { MdHistoryEdu } from "react-icons/md";
import { FaDragon } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";

import { PiBooksFill } from "react-icons/pi";





export function SidebarLayout() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<MdHistoryEdu className="text-2xl"/>} text="Campaigns" active />
        <SidebarItem icon={<FaDragon className="text-2xl"/>} text="Bestiary" />
        <SidebarItem icon={<PiBooksFill className="text-2xl"/>} text="Resources" />

        <SidebarItem icon={<IoSettingsSharp className="text-2xl"/>} text="Settings" />
        <SidebarItem icon={<IoIosNotifications className="text-2xl" />} text="Notifications" alert />
      </Sidebar>
      <div className="flex flex-col justify-center items-center w-full">
        <h1>Main Content Area</h1>
        <p>This is where your main content goes.</p>
      </div>
    </div>
  );
}