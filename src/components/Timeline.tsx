import React from 'react';

interface Session {
  sessionId: number;
  campaignId: number;
  date: string;
  title: string;
  summary: string;
}

interface TimelineProps {
  sessions: Session[];
}

const Timeline: React.FC<TimelineProps> = ({ sessions }) => {
  return (
    <div className="py-4">
        <h1 className='text-text-700 text-2xl font-bold'>Timeline</h1>
      {sessions.map((session) => (
        <div key={session.sessionId} className="relative pl-8 sm:pl-32 py-6 group">
          <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-accent-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-secondary-600 after:border-4 after:box-content after:border-secondary-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
            <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-primary-600 bg-primary-100 rounded-full">{session.date}</time>
            <div className="text-xl font-bold text-accent-700">{session.title}</div>
          </div>
          <div className="text-text-700">{session.summary}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;