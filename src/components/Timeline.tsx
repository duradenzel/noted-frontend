import React, { useEffect, useState } from 'react';
import { Session, SessionResponse } from '@/types';
import axios, { AxiosError } from 'axios';
import SessionComponent from './SessionComponent';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import SessionDialog from './SessionDialog';

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
          `http://localhost:5170/sessions?campaignId=${campaignId}`
        );
        setSessions(response.data.sessions);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(`Error fetching users: ${axiosError.message}`);
      }
    };

    fetchData();
  }, [campaignId]);

  const handleEditSession = async (updatedSession: Session) => {
    try {
      await axios.put<Session>(
        `http://localhost:5170/sessions/${updatedSession.sessionId}`,
        updatedSession
      );
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.sessionId === updatedSession.sessionId ? updatedSession : session
        )
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error editing session: ${axiosError.message}`);
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      await axios.delete(`http://localhost:5170/sessions/${sessionId}`);
      setSessions((prevSessions) => prevSessions.filter((session) => session.sessionId !== sessionId));
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`Error deleting session: ${axiosError.message}`);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

  return (
    <div className="py-4 mb-5">
      <div className='flex items-center justify-between'>
        <h1 className="text-text-700 text-2xl font-bold">Timeline</h1>
        <SessionDialog campaignId={campaignId} />
      </div>
      {sessions && sessions.map((session) => (
        <Collapsible key={session.sessionId} className=' transition max-h 0.3s ease-in-out'>
          <CollapsibleTrigger>
            <SessionComponent
              session={session}
              formatDate={formatDate}
              onEdit={handleEditSession}
              onDelete={handleDeleteSession}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='bg-bgcolor-100 rounded-sm p-4 border border-bgcolor-300 w-5/6 m-auto'>
            <div className='flex flex-col'>
              <p className='flex-1 grow'>
                {session.summary}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Timeline;
