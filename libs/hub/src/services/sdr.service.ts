import { ILeadScore, IObjectionResponse } from "../types/sdr";
import { LeadRepository } from "@salesos/database";
import { llmGateway } from "@salesos/ai";

export class SDRService {
  private leadRepo: LeadRepository;

  constructor() {
    this.leadRepo = new LeadRepository();
  }

  // --- EXISTING METHODS ---
  async scoreLead(leadId: string, data?: any): Promise<ILeadScore> {
    const signals = data || { websiteVisits: 5, emailOpens: 2, pricingPageViews: 1, role: "Decision Maker" };
    let score = 0;
    if (signals.role === "Decision Maker") score += 30;
    if (signals.pricingPageViews > 0) score += 25;
    score += (signals.websiteVisits * 2);
    score += (signals.emailOpens * 5);

    try {
        await this.leadRepo.update(leadId, { score });
    } catch(e) {}

    return { leadId, score: Math.min(score, 100), factors: { behavioral: score * 0.6, demographic: score * 0.4 } };
  }

  async handleObjection(text: string): Promise<IObjectionResponse> {
    const prompt = `Act as an expert Sales Objection Handler. The prospect said: "${text}". Provide a concise, empathetic, and persuasive response to overcome this objection using the "Feel, Felt, Found" or "Challenger" methodology.`;

    const response = await llmGateway.complete({
        prompt,
        userId: 'system', // In real app, pass actual user ID
        model: 'gpt-4-turbo'
    });

    return { objection: text, response };
  }

  // --- ARSENAL EXPANSION (REAL AI CONNECTED) ---

  // 1. Cold Call Script
  async generateColdCallScript(persona: string, valueProp: string): Promise<string> {
    const prompt = `Write a high-converting Cold Call Script for a ${persona}. Value Proposition: "${valueProp}". Structure: Opener -> Problem Statement -> Solution Hook -> Permission to Proceed. Keep it conversational.`;
    return await llmGateway.complete({ prompt, userId: 'system' });
  }

  // 2. Email Roast
  async roastEmail(emailContent: string): Promise<string> {
    const prompt = `Roast this cold email. Be harsh but constructive. Give a score /10. List 3 specific improvements. Email: "${emailContent}"`;
    return await llmGateway.complete({ prompt, userId: 'system' });
  }

  // 3. LinkedIn Icebreaker
  async generateIcebreaker(profileBio: string): Promise<string> {
    const prompt = `Generate 3 distinct LinkedIn connection request messages (max 300 chars) based on this bio: "${profileBio}". 1. Compliment 2. Common Ground 3. Direct Value.`;
    return await llmGateway.complete({ prompt, userId: 'system' });
  }

  // 4-6. Objection Killers (Specific)
  async killObjectionPrice(): Promise<string> {
    return await llmGateway.complete({ prompt: "Provide a 2-sentence response to 'It's too expensive' focusing on ROI.", userId: 'system' });
  }
  async killObjectionCompetitor(competitor: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Provide a diplomatic but strong differentiator against competitor "${competitor}". Focus on our specialization vs their generalization.`, userId: 'system' });
  }
  async killObjectionTime(): Promise<string> {
    return await llmGateway.complete({ prompt: "Provide a response to 'I don't have time right now' that creates urgency without pressure.", userId: 'system' });
  }

  // 7. Follow-up Builder
  async generateFollowUp(context: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Write a short follow-up email. Context of previous interaction: "${context}". Value add: Sharing a relevant resource.`, userId: 'system' });
  }

  // 8. Break-up Email
  async generateBreakUp(): Promise<string> {
    return await llmGateway.complete({ prompt: "Write a 'Break-up Email' for a prospect who has ghosted. Use the 'stripping line' technique. Be professional.", userId: 'system' });
  }

  // 9. Gatekeeper Bypass
  async bypassGatekeeper(role: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Write a script to get past a ${role} (Gatekeeper) to reach the Director. Tone: Senior, confident, respectful.`, userId: 'system' });
  }

  // 10. Value Proposition Canvas
  async createValueProp(product: string, pain: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Create a Value Proposition Canvas for Product: "${product}" addressing Pain: "${pain}". Output format: Markdown list of Gain Creators and Pain Relievers.`, userId: 'system' });
  }

  // 11. Pain Magnifier
  async magnifyPain(pain: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Magnify the business pain: "${pain}". Describe the 1st, 2nd, and 3rd order consequences (Financial, Strategic, Personal).`, userId: 'system' });
  }

  // 12. ROI Calculator
  async calculateROI(cost: number, gain: number): Promise<string> {
    return await llmGateway.complete({ prompt: `Generate a persuasive ROI paragraph. Cost: $${cost}. Gain: $${gain}. Calculate percentage and months to payback. Write for a CFO.`, userId: 'system' });
  }

  // 13. Competitor Battlecard
  async battlecard(competitor: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Generate a sales battlecard against "${competitor}". List 3 weaknesses and how to position against them.`, userId: 'system' });
  }

  // 14. SPIN Questions
  async generateSPIN(product: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Generate 4 SPIN questions (Situation, Problem, Implication, Need-Payoff) to sell "${product}".`, userId: 'system' });
  }

  // 15. MEDDIC Checklist
  async checkMEDDIC(): Promise<string> {
    return await llmGateway.complete({ prompt: "Generate a MEDDIC qualification checklist with specific questions for a SaaS deal.", userId: 'system' });
  }

  // 16. BANT Qualifier
  async checkBANT(): Promise<string> {
    return await llmGateway.complete({ prompt: "Generate a BANT qualification script. Soft but direct questions.", userId: 'system' });
  }

  // 17. Referral Request
  async requestReferral(): Promise<string> {
    return await llmGateway.complete({ prompt: "Write a script to ask a happy client for a referral. Low pressure.", userId: 'system' });
  }

  // 18. Case Study Storyteller
  async tellStory(client: string, result: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Write a 'Hero's Journey' micro-story about client "${client}" achieving "${result}". Start with the struggle, then the guide (us), then the victory.`, userId: 'system' });
  }

  // 19. WhatsApp Audio Script
  async whatsappAudio(lead: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Write a 45-second script for a WhatsApp voice note to lead "${lead}". Tone: Casual, urgent, friendly.`, userId: 'system' });
  }

  // 20. Voice Note Summary
  async summarizeVoice(text: string): Promise<string> {
    return await llmGateway.complete({ prompt: `Summarize this sales call transcript into bullet points (Pain, Interest, Next Steps): "${text}"`, userId: 'system' });
  }
}
