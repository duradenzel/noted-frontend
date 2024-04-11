export interface Session {
  sessionId: number;
  campaignId: number;
  date: string;
  title: string;
  summary: string;
}

export interface Campaign {
  campaignId: number;
  title: string;
  description: string;
  dmId: number;
  maxPlayers: number;
}

export interface SessionResponse {
  sessions: Session[];
}

export interface CampaignResponse {
  campaigns: Campaign[];
}

export interface ApiError {
  message: string;
}
