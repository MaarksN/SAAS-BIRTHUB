export interface CallRecording {
  id: string;
  url: string;
  durationSeconds: number;
}

export interface AnalysisResult {
  transcript: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  topics: string[];
}
