

import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";


export function SidebarLayout() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<i className="fas fa-home"></i>} text="Home" active />
        <SidebarItem icon={<i className="fas fa-user"></i>} text="Profile" />
        <SidebarItem icon={<i className="fas fa-cog"></i>} text="Settings" />
        <SidebarItem icon={<i className="fas fa-bell"></i>} text="Notifications" alert />
      </Sidebar>
      <div className="flex flex-col justify-center items-center w-full">
        <h1>Main Content Area</h1>
        <p>This is where your main content goes.</p>
      </div>
    </div>
  );
}