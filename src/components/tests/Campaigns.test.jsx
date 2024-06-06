import { render, test } from '@testing-library/react';
import CampaignCard from '../CampaignCard';

const campaign = {
    campaignId: 1,
    title: "test title",
    description: "test desc",
    dmId:1,
    maxPlayers: 4,

}

test('render card',() => {
    render(<CampaignCard campaign={campaign}/>)
}) 