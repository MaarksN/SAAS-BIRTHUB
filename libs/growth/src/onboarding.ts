export interface TourStep {
  target: string;
  title: string;
  content: string;
}

export class OnboardingService {
  getTour(featureId: string): TourStep[] {
    console.log(`Fetching tour for ${featureId}`);
    return [
      { target: '#header', title: 'Welcome', content: 'This is your dashboard.' },
      { target: '#search', title: 'Search', content: 'Find leads here.' }
    ];
  }
}
