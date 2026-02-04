export interface ILeadScore {
  leadId: string;
  score: number;
  factors: Record<string, number>;
}

export interface IObjectionResponse {
  objection: string;
  response: string;
}

// ... more interfaces for 20 tools
