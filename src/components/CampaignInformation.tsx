import React from 'react';

interface CampaignInformation {
  title: string;
  description: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const CampaignInformation: React.FC<CampaignInformation> = ({
  title,
  description,
  onChange,
}) => {
  return (
    <div>
      <input
        type="text"
        name="title"
        className="text-3xl font-bold mb-2 w-full bg-bgcolor-50 "
        value={title}
        onChange={onChange}
      />
      <textarea
        name="description"
        className="text-lg mb-4 w-full bg-bgcolor-50 h-auto min-h-64 resize-none "
        value={description}
        onChange={onChange}
      />
    </div>
  );
};

export default CampaignInformation;
