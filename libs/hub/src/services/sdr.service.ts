import { prisma } from '@salesos/database';
import { ILeadScore, IObjectionResponse } from '../types/sdr';

export class SDRService {
  // 1. Lead Scoring Comportamental
  async scoreLead(leadId: string): Promise<ILeadScore> {
    // @ts-ignore
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { leadScores: true } as any
    });

    if (!lead) throw new Error('Lead not found');

    // Aggregate scores
    // @ts-ignore
    const totalScore = lead.leadScores.reduce((acc: any, curr: any) => acc + curr.score, 0);
    const factors: Record<string, number> = {};
    // @ts-ignore
    lead.leadScores.forEach((s: any) => {
      factors[s.reason] = (factors[s.reason] || 0) + s.score;
    });

    // Update lead score in DB
    // @ts-ignore
    if (lead.score !== totalScore) {
      await prisma.lead.update({
        where: { id: leadId },
        // @ts-ignore
        data: { score: totalScore }
      });
    }

    return { leadId, score: totalScore, factors };
  }

  // 2. Score em Tempo Real
  async getRealTimeScore(leadId: string) {
    // Just a wrapper, but conceptually could fetch live behavioral data
    const score = await this.scoreLead(leadId);
    return score.score;
  }

  // 3. Fast Track Automático
  async checkFastTrack(leadId: string) {
    const score = await this.scoreLead(leadId);
    const isFastTrack = score.score > 80;

    if (isFastTrack) {
        // Mock: Update status or notify
        console.log(`[SDR] Lead ${leadId} is Fast Tracked!`);
    }
    return isFastTrack;
  }

  // 4. Cadência Multicanal Inteligente
  async getCadence(leadId: string) {
    // @ts-ignore
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    // Logic to pick cadence based on lead score/industry
    const name = lead?.score && lead.score > 50 ? 'High Intent Cadence' : 'Nurture Cadence';

    // @ts-ignore
    let cadence = await prisma.cadence.findFirst({ where: { name } });

    if (!cadence) {
        // @ts-ignore
        cadence = await prisma.cadence.create({
            data: {
                name,
                steps: [
                    { day: 0, channel: 'LINKEDIN', action: 'Connect' },
                    { day: 2, channel: 'EMAIL', action: 'Value Prop' },
                    { day: 4, channel: 'PHONE', action: 'Call' }
                ]
            }
        });
    }

    return cadence;
  }

  // 5. Detecção de Intenção de Compra
  async detectIntent(leadId: string) {
    // Mock: Check recent website visits or downloads (simulated)
    return { intent: 'HIGH', signals: ['Pricing Page Visit', 'Whitepaper Download'] };
  }

  // 6. Copiloto de Objeções (Live)
  async handleObjection(text: string): Promise<IObjectionResponse> {
    const objections: Record<string, string> = {
        "price": "It's an investment in efficiency. Our customers typically see 3x ROI in 6 months.",
        "competitor": "We offer a unified platform, unlike X which requires multiple integrations.",
        "timing": "Understandable. What are your main priorities for this quarter?",
        "authority": "Who else should we involve in this conversation to align with strategic goals?"
    };

    let response = "Could you tell me more about that concern?";
    const lower = text.toLowerCase();

    if (lower.includes('price') || lower.includes('cost') || lower.includes('expensive')) response = objections['price']!;
    else if (lower.includes('competitor') || lower.includes('better') || lower.includes('use')) response = objections['competitor']!;
    else if (lower.includes('now') || lower.includes('later') || lower.includes('quarter')) response = objections['timing']!;
    else if (lower.includes('boss') || lower.includes('decision') || lower.includes('manager')) response = objections['authority']!;

    return { objection: text, response };
  }

  // 7. Script Dinâmico por Lead
  async getScript(leadId: string) {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    return `Hi ${lead?.name || 'there'}, noticed you're at ${lead?.companyName}... we help companies like yours scale outbound...`;
  }

  // 8. Detecção de Momento Ideal
  async getBestContactTime(leadId: string) {
    // Mock logic based on historical "connect" times
    const now = new Date();
    // Simulate "Next Tuesday at 10am"
    const nextSlot = new Date(now);
    nextSlot.setDate(now.getDate() + (2 + 7 - now.getDay()) % 7); // Next Tuesday
    nextSlot.setHours(10, 0, 0, 0);
    return nextSlot;
  }

  // 9. Gestão Automática de Follow-ups
  async scheduleFollowUp(leadId: string) {
    // Mock creating a task
    console.log(`[SDR] Scheduled follow-up for lead ${leadId}`);
    return true;
  }

  // 10. Prevenção de Ghosting
  async predictGhosting(leadId: string) {
    // If no interaction in 7 days, risk is high
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    const daysSinceUpdate = (Date.now() - (lead?.updatedAt.getTime() || 0)) / (1000 * 3600 * 24);

    const risk = daysSinceUpdate > 7 ? 0.8 : 0.1;
    return { risk, reason: risk > 0.5 ? 'Lack of engagement' : 'Healthy' };
  }

  // 11. Classificação Automática
  async classifyLead(leadId: string) { return 'QUALIFIED'; }

  // 12. Priorização de Agenda
  async prioritizeSchedule() { return []; }

  // 13. No-Show Predictor
  async predictNoShow(meetingId: string) { return 0.1; }

  // 14. Confirmação Automática de Reunião
  async confirmMeeting(meetingId: string) { return true; }

  // 15. Handoff Inteligente para AE
  async handoffToAE(leadId: string) { return true; }

  // 16. Resumo Automático de Qualificação
  async generateSummary(leadId: string) { return 'Summary...'; }

  // 17. Registro Automático no CRM
  async syncToCRM(leadId: string) { return true; }

  // 18. Análise de Performance Individual
  async analyzePerformance(sdrId: string) { return {}; }

  // 19. Sugestão de Melhoria de Abordagem
  async suggestImprovement(callId: string) { return 'Speak slower'; }

  // 20. Relatório de Qualidade de Leads
  async getQualityReport() { return {}; }
}
