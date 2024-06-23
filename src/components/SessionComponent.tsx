import React, { useState, ChangeEvent } from 'react';
import { Session } from '@/types';
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri';

interface SessionComponentProps {
  session: Session;
  formatDate: (dateString: string) => string;
  onEdit: (session: Session) => void;
  onDelete: (sessionId: number) => void;
  className?: string;
}

const SessionComponent: React.FC<SessionComponentProps> = ({
  session,
  formatDate,
  onEdit,
  onDelete,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(session.summary);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit({ ...session, summary: editedSummary });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedSummary(session.summary);
    setIsEditing(false);
  };

  const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedSummary(e.target.value);
  };

  return (
    <div id='session-wrapper' className={`relative pl-8 sm:pl-32 py-6 group w-full ${className}`}>
      <div className="w-full flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-accent-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-secondary-600 after:border-4 after:box-content after:border-secondary-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-primary-600 bg-primary-100 rounded-full">
          {formatDate(session.date)}
        </time>

        <div className='w-full flex flex-col'>
          <div id='title-buttons-wrapper' className='w-48 flex flex-row items-center justify-between'>
            <div className="text-xl font-bold text-accent-700">
            {session.title}
            </div>
            <div className="flex space-x-2">
            <button
              id='edit-session-button'
              onClick={handleEditClick}
              className="bg-primary-500 text-white rounded h-6 w-6 items-center flex justify-center"
              >
              <RiEditFill />
            </button>
            <button
              id='delete-session-button'
              onClick={() => onDelete(session.sessionId)}
              className="bg-red-500 text-white rounded h-6 w-6 items-center flex justify-center"
              >
              <RiDeleteBin6Line />
            </button>
          </div>

          </div>
          {isEditing ? (
            <div>
              <textarea
                id='session-summary-edit'
                className="text-text-700 w-full bg-bgcolor-50 h-auto min-h-64 resize-none"
                value={editedSummary}
                onChange={handleSummaryChange}
                />
              <div className="flex justify-end space-x-2">
                <button id='session-save-button' onClick={handleSaveClick} className="bg-primary-500 text-white px-3 py-1 rounded">
                  Save
                </button>
                <button id='session-cancel-button' onClick={handleCancelClick} className="bg-gray-300 text-black px-3 py-1 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div id='session-summary' className="text-text-700 text-left">
              {session.summary}
            </div>
          )}

         

      </div>
        </div>
    </div>
  );
};

export default SessionComponent;
