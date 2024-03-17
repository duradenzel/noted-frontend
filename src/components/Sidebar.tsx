import React, { createContext, useContext, useState, ReactNode } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import SidebarProfile from './SidebarProfile'

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-bgcolor-0 border-r shadow-sm">
        <div className={`p-4 pb-2 flex ${expanded ? "justify-between" : "justify-center"} items-center`}>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-accent-50 hover:bg-accent-100 text-accent-700"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

     <SidebarProfile expanded={expanded}/>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }: { 
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}) {
  const { expanded } = useContext(SidebarContext) as SidebarContextType;

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-primary-200 to-primary-100 text-primary-800"
            : "hover:bg-primary-50 text-primary-700"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-accent-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-primary-100 text-primary-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
