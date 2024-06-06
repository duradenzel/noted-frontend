import React, { useEffect, useState } from 'react';
import { Session, SessionResponse } from '@/types';
import axios, { AxiosError } from 'axios';

import SessionComponent from './SessionComponent';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export interface TimelineProps {
  campaignId: number;
}

const Timeline: React.FC<TimelineProps> = ({ campaignId }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SessionResponse>(
          `http://localhost:5170/sessions?campaignId=${campaignId}`,
        );
        setSessions(response.data.sessions);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(`Error fetching users: ${axiosError.message}`);
      }
    };

    fetchData();
  }, [campaignId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

 return (
    <div className="py-4">
      <h1 className="text-text-700 text-2xl font-bold">Timeline</h1>
      {sessions &&
        sessions.map((session) => (
          <Collapsible className=' transition max-h 0.3s ease-in-out'>
          <CollapsibleTrigger>  
            <SessionComponent
                key={session.sessionId}
                session={session}
                formatDate={formatDate}
              />
          </CollapsibleTrigger>
          <CollapsibleContent>
          Hello
          </CollapsibleContent>
          </Collapsible>
        ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Timeline;
