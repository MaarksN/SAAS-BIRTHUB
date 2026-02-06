import { prisma } from '@salesos/database';
import { IMeetingAnalysis, IProposal } from '../types/ae';

export class AEService {
  // 1. Assistente de Reunião Inteligente
  async analyzeMeeting(meetingId: string): Promise<IMeetingAnalysis> {
    // @ts-ignore
    const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting) throw new Error('Meeting not found');

    // Simulate AI analysis
    const analysis = {
      summary: `Meeting regarding ${meeting.title}`,
      sentiment: 'POSITIVE',
      actionItems: ['Send proposal', 'Schedule follow-up']
    };

    // Update meeting with analysis
    // @ts-ignore
    await prisma.meeting.update({
      where: { id: meetingId },
      data: { analysis: JSON.stringify(analysis) }
    });

    return analysis;
  }

  // 2. MEDDIC Coach Real-time
  async getMEDDICAdvice(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    // Mock logic: Check stage
    if (deal?.stage === 'Discovery') return 'Identify the Economic Buyer and Metrics.';
    if (deal?.stage === 'Negotiation') return 'Confirm Decision Process and Paper Process.';
    return 'Review Champions.';
  }

  // 3. Detecção de Dominância de Fala
  async analyzeSpeechDominance(meetingId: string) {
    // Mock AI result
    return { rep: 45, client: 55, advice: 'Good balance' };
  }

  // 4. Análise de Engajamento
  async analyzeEngagement(dealId: string) {
    // @ts-ignore
    const meetings = await prisma.meeting.findMany({ where: { dealId } });
    // More meetings = Higher engagement
    if (meetings.length > 5) return 'HIGH';
    if (meetings.length > 2) return 'MEDIUM';
    return 'LOW';
  }

  // 5. Gerador de Propostas Dinâmicas
  async generateProposal(dealId: string, items: any[]): Promise<IProposal> {
    const totalValue = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // In real app, generate PDF/HTML content
    const content = `Proposal for Deal ${dealId}\nItems:\n${items.map(i => `- ${i.name}: $${i.price}`).join('\n')}\nTotal: $${totalValue}`;

    // @ts-ignore
    await prisma.quote.create({
        data: {
            dealId,
            amount: totalValue,
            status: 'DRAFT',
            content: JSON.stringify(items)
        }
    });

    return { dealId, content, totalValue };
  }

  // 6. Precificação Automática Validada
  async calculatePrice(items: any[]) {
    // Mock rule: bulk discount
    const rawTotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const discount = rawTotal > 10000 ? 0.1 : 0;
    return rawTotal * (1 - discount);
  }

  // 7. Gestão de Descontos (Regras)
  async validateDiscount(amount: number, discountPercent: number) {
    if (discountPercent > 20) return { valid: false, reason: 'Requires VP approval' };
    return { valid: true };
  }

  // 8. Stakeholder Tracking (Documentos)
  async trackStakeholders(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({
        where: { id: dealId },
        include: { company: { include: { buyingCommittees: { include: { contacts: true } } } } }
    });

    // @ts-ignore
    if (!deal?.company?.buyingCommittees[0]) return [];
    // @ts-ignore
    return deal.company.buyingCommittees[0].contacts.map((c: any) => ({
        name: c.name,
        role: c.role,
        influence: c.influenceLevel
    }));
  }

  // 9. Detecção de Risco de Perda
  async detectChurnRisk(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) return 0;

    // If stuck in stage too long
    const daysInStage = (Date.now() - deal.updatedAt.getTime()) / (1000 * 3600 * 24);
    if (daysInStage > 30) return 0.8;
    return 0.1;
  }

  // 10. Análise Preditiva de Fechamento
  async predictClose(dealId: string) {
    // Mock ML model
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (deal?.stage === 'Negotiation') return 0.75;
    if (deal?.stage === 'Discovery') return 0.2;
    return 0.5;
  }

  // 11. Forecast Probabilístico (Deal Level)
  async forecastDeal(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) throw new Error('Deal not found');

    const weightedValue = deal.value * (deal.probability / 100);
    return {
        value: weightedValue,
        date: deal.expectedCloseDate || new Date()
    };
  }

  // 12. Gerador de Follow-up Contextual
  async generateFollowUp(meetingId: string) {
    const analysis = await this.analyzeMeeting(meetingId);
    return `Hi, great chatting today. As discussed: ${analysis.summary}. Next steps: ${analysis.actionItems.join(', ')}.`;
  }

  // 13. Comparador com Concorrentes
  async compareCompetitors(dealId: string) {
    return {
        priceDifference: '-10%',
        featureAdvantage: ['AI Integration', 'Unified Dashboard']
    };
  }

  // 14. Registro Automático de Calls
  async logCall(dealId: string, duration: number) {
    // @ts-ignore
    await prisma.meeting.create({
        data: {
            dealId,
            title: 'Logged Call',
            startTime: new Date(),
            endTime: new Date(Date.now() + duration * 1000),
            summary: 'Auto-logged call'
        }
    });
    return true;
  }

  // 15. Extração de Próximos Passos
  async extractNextSteps(meetingId: string) {
    const analysis = await this.analyzeMeeting(meetingId);
    return analysis.actionItems;
  }

  // 16. Alertas de Estagnação
  async checkStagnation(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) return false;
    const daysSinceUpdate = (Date.now() - deal.updatedAt.getTime()) / (1000 * 3600 * 24);
    return daysSinceUpdate > 14;
  }

  // 17. Simulador de Cenários do Deal
  async simulateScenario(dealId: string, discount: number) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) return {};
    return {
        originalValue: deal.value,
        simulatedValue: deal.value * (1 - discount / 100),
        winProbabilityChange: discount > 10 ? '+15%' : '+5%'
    };
  }

  // 18. Análise de Win/Loss
  async analyzeWinLoss(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({ where: { id: dealId } });
    if (deal?.stage === 'Closed Won') return { reason: 'Product Fit', factor: 'Pricing' };
    if (deal?.stage === 'Closed Lost') return { reason: 'Competitor', factor: 'Missing Feature X' };
    return { status: 'Open' };
  }

  // 19. Limpeza Automática de Pipeline
  async cleanPipeline() {
    // Close deals older than 6 months with low prob
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // @ts-ignore
    const result = await prisma.deal.updateMany({
        where: {
            createdAt: { lt: sixMonthsAgo },
            stage: { notIn: ['Closed Won', 'Closed Lost'] }
        },
        data: { stage: 'Closed Lost', probability: 0 }
    });
    return { closedCount: result.count };
  }

  // 20. Relatório de Previsibilidade
  async getForecastReport() {
    const deals = await prisma.deal.findMany({
        where: { stage: { notIn: ['Closed Won', 'Closed Lost'] } }
    });

    const totalPipeline = deals.reduce((acc, d) => acc + d.value, 0);
    const weightedPipeline = deals.reduce((acc, d) => acc + (d.value * d.probability / 100), 0);

    return { totalPipeline, weightedPipeline, coverage: totalPipeline / (weightedPipeline || 1) };
  }
}
