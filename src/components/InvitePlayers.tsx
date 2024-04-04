import React from 'react';

const InvitePlayers: React.FC = () => {
  return (
    <div className='bg-bgcolor-100 p-2'>
      <div className='flex items-center justify-between'>
        <h1>0 Players</h1>
        <button className="bg-primary-500 text-white px-4 py-2 rounded mt-2 justify-end">Invite Players</button>
      </div>
      <p className="py-5 mx-auto text-center">No players invited yet. Invite some to join!</p>
    </div>
  );
};

export default InvitePlayers;
