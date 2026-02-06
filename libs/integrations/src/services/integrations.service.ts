export class HubSpotService {
  async syncContact(email: string): Promise<boolean> { console.log('Syncing to HubSpot'); return true; }
}
export class SalesforceService {
  async pushLead(lead: any): Promise<boolean> { console.log('Pushing to Salesforce'); return true; }
}
export class SlackService {
  async notify(channel: string, msg: string): Promise<boolean> { console.log('Slack Notify'); return true; }
}
export class StripeService {
  async createCustomer(email: string): Promise<string> { return 'cus_123'; }
}
