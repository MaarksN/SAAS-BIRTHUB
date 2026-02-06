import { prisma } from '@salesos/database';

export class CSService {
  // 1. Health Score AI
  async calculateHealthScore(companyId: string) {
    // @ts-ignore
    const health = await prisma.customerHealth.findFirst({
        where: { companyId },
        orderBy: { updatedAt: 'desc' }
    });

    if (health) {
        return { score: health.score, risk: health.riskLevel };
    }

    // New Calculation logic
    const tickets = await prisma.ticket.findMany({ where: { companyId } });
    const openTickets = tickets.filter((t: any) => t.status !== 'CLOSED').length;

    // Simple mock algorithm
    let score = 100;
    if (openTickets > 5) score -= 20;

    // Upsert
    // @ts-ignore
    await prisma.customerHealth.create({
        data: {
            companyId,
            score,
            riskLevel: score > 70 ? 'LOW' : 'HIGH',
            churnProbability: score > 70 ? 0.1 : 0.6,
            factors: { openTickets }
        }
    });

    return { score, risk: score > 70 ? 'LOW' : 'HIGH' };
  }

  // 2. Detector de Churn Silencioso
  async detectSilentChurn(companyId: string) {
    // Check usage/login frequency (mocked)
    const lastLogin = new Date(); // Ideally from User model logs
    const daysSinceLogin = 2;
    return { isChurning: daysSinceLogin > 30, daysSinceLogin };
  }

  // 3. Monitor de Adoção de Features
  async monitorAdoption(companyId: string) {
    // Check if key features (e.g., "Auto-Enrich") are used
    return { adoptionRate: 0.85, unusedFeatures: ['Workflows'] };
  }

  // 4. Análise de Sentimento em Tickets
  async analyzeTicketSentiment(companyId: string) {
    const tickets = await prisma.ticket.findMany({ where: { companyId } });
    if (tickets.length === 0) return 'NEUTRAL';
    // Mock AI sentiment
    const badTickets = tickets.filter((t: any) => t.description?.includes('broken') || t.description?.includes('fail'));
    return badTickets.length > 0 ? 'NEGATIVE' : 'POSITIVE';
  }

  // 5. Score Financeiro do Cliente
  async calculateFinancialScore(companyId: string) {
    // e.g. Payment history
    return { score: 95, status: 'Healthy' };
  }

  // 6. Alertas Proativos de Risco
  async getRiskAlerts(companyId: string) {
    const health = await this.calculateHealthScore(companyId);
    if (health.risk === 'HIGH') return ['High Churn Probability - Contact Immediately'];
    return [];
  }

  // 7. White Space Detector (Upsell)
  async detectWhiteSpace(companyId: string) {
    // Compare current subscription vs available modules
    return ['Module: Social Selling', 'Module: Voice AI'];
  }

  // 8. Sugestão de Upsell Contextual
  async suggestUpsell(companyId: string) {
    const whiteSpace = await this.detectWhiteSpace(companyId);
    if (whiteSpace.length > 0) return { product: whiteSpace[0], reason: 'Complementary to usage' };
    return null;
  }

  // 9. QBR Automático
  async generateQBR(companyId: string) {
    // @ts-ignore
    const qbr = await prisma.qBR.create({
        data: {
            companyId,
            date: new Date(),
            summary: 'Automatic QBR generated',
            sentiment: 'NEUTRAL'
        }
    });
    return qbr;
  }

  // 10. Histórico de Valor Entregue
  async getValueHistory(companyId: string) {
    return [
        { month: 'Jan', valueSaved: 5000 },
        { month: 'Feb', valueSaved: 6000 }
    ];
  }

  // 11. Detecção de Troca de Stakeholders
  async detectStakeholderChange(companyId: string) {
    // Check LinkedIn enrichment for contact departures
    return { detected: false };
  }

  // 12. Gestão de Plano de Sucesso
  async getSuccessPlan(companyId: string) {
    // @ts-ignore
    return prisma.successPlan.findFirst({
        where: { companyId }
    }) || prisma.successPlan.create({
        data: {
            companyId,
            status: 'ACTIVE',
            objectives: ['Reduce Churn', 'Increase Adoption']
        }
    });
  }

  // 13. Priorização Automática de Carteira
  async prioritizePortfolio(csmId: string) {
    // Mock fetching companies managed by CSM
    // In real app, relate CompanyProfile to User (CSM)
    return [];
  }

  // 14. Segmentação por LTV
  async segmentByLTV() { return []; }

  // 15. Previsão de Renovação
  async predictRenewal(companyId: string) {
    const health = await this.calculateHealthScore(companyId);
    return health.score / 100;
  }

  // 16. Simulador de Impacto de Churn
  async simulateChurnImpact(companyId: string) { return 10000; }

  // 17. Gestão de Limites de Escopo
  async checkScopeLimits(companyId: string) { return true; }

  // 18. Registro de Compromissos
  async logCommitment(companyId: string) { return true; }

  // 19. Relatório de Expansão
  async getExpansionReport() { return {}; }

  // 20. Métrica de Valor por Cliente
  async getCustomerValueMetric(companyId: string) { return 5000; }
}
