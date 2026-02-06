import { prisma } from '@salesos/database';
import { eventBus } from '@salesos/core';
import { IBuyingCommitteeMap, IEmailValidation, IMessageGeneration } from '../types/bdr';

export class BDRService {
  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    eventBus.subscribe('company.enriched', async (event) => {
      console.log('[BDR] Detected new enriched company:', event.payload.legalName);
      const company = await prisma.companyProfile.findUnique({
          where: { cnpj: event.payload.cnpj }
      });
      if (company) {
          await this.mapBuyingCommittee(company.id);
      }
    });
  }

  // 1. Mapeamento de Buying Committee
  async mapBuyingCommittee(companyId: string): Promise<IBuyingCommitteeMap> {
    // Check existing
    // @ts-ignore
    const committee = await prisma.buyingCommittee.findFirst({
        where: { companyId },
        include: { contacts: true }
    });

    if (committee) {
        return {
            companyId,
            contacts: committee.contacts.map((c: any) => ({
                name: c.name,
                role: c.role || 'Unknown',
                influenceLevel: (c.influenceLevel as 'HIGH' | 'MEDIUM' | 'LOW') || 'LOW'
            }))
        };
    }

    // Mock Discovery (simulate scraping)
    // @ts-ignore
    const newCommittee = await prisma.buyingCommittee.create({
        data: { companyId }
    });

    // Mock finding a CTO
    await prisma.contact.create({
        data: {
            buyingCommitteeId: newCommittee.id,
            name: 'Mock Detected CTO',
            role: 'CTO',
            influenceLevel: 'HIGH',
            isDecisionMaker: true
        }
    });

    return {
        companyId,
        contacts: [{ name: 'Mock Detected CTO', role: 'CTO', influenceLevel: 'HIGH' }]
    };
  }

  // 2. Organograma Visual da Conta
  async getOrgChart(companyId: string) {
    // @ts-ignore
    const committee = await prisma.buyingCommittee.findFirst({
      where: { companyId },
      include: { contacts: true }
    });

    if (!committee) return { nodes: [], edges: [] };

    const nodes = committee.contacts.map((c: any) => ({
      id: c.id,
      label: `${c.name} (${c.role})`,
      type: c.isDecisionMaker ? 'decision_maker' : 'influencer'
    }));

    // Mock edges (hierarchical)
    const edges = nodes.length > 1 ? [{ from: nodes[0].id, to: nodes[1].id }] : [];

    return { nodes, edges };
  }

  // 3. Deep Search de Contatos
  async deepSearch(name: string, company: string) {
    // Mock Deep Search
    return {
      emails: [`${name.split(' ')[0].toLowerCase()}@${company.toLowerCase().replace(' ', '')}.com`],
      phones: ['+5511999998888'],
      social: [`linkedin.com/in/${name.toLowerCase().replace(' ', '-')}`]
    };
  }

  // 4. Validação de E-mail Real-time
  async validateEmail(email: string): Promise<IEmailValidation> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidSyntax = emailRegex.test(email);

    // Simulate domain check
    const domain = email.split('@')[1];
    const isDisposable = domain === 'tempmail.com';

    const isValid = isValidSyntax && !isDisposable;

    return {
        email,
        isValid,
        score: isValid ? 0.95 : 0.1
    };
  }

  // 5. Descoberta de Celulares Diretos
  async findMobileNumbers(contactId: string) {
    const contact = await prisma.contact.findUnique({ where: { id: contactId } });
    // Mock enrichment
    if (contact && !contact.phone) {
        await prisma.contact.update({
            where: { id: contactId },
            data: { phone: '+5511988887777' }
        });
        return ['+5511988887777'];
    }
    return contact?.phone ? [contact.phone] : [];
  }

  // 6. Trigger Events de Mercado
  async getTriggerEvents(companyId: string) {
    // Return mock events, ideally stored in a 'MarketEvent' table
    return [
      { type: 'FUNDING', date: new Date(), description: 'Series B Raised' },
      { type: 'HIRING', date: new Date(), description: 'Hiring Head of Sales' }
    ];
  }

  // 7. Detecção de Timing de Compra
  async detectBuyingTiming(companyId: string) {
    const events = await this.getTriggerEvents(companyId);
    const score = events.length * 20; // Simple heuristic
    return { score: Math.min(score, 100), signal: events.length > 0 ? events[0].type : 'NONE' };
  }

  // 8. Scripts Outbound Contextuais
  async getScript(context: { companyId: string, contactRole: string }) {
    return `Hi, I noticed ${context.contactRole} challenges at your company...`;
  }

  // 9. Gerador de Mensagens Personalizadas
  async generateMessage(context: { contactId: string, intent: string }): Promise<IMessageGeneration> {
    const contact = await prisma.contact.findUnique({ where: { id: context.contactId } });
    return {
      subject: `Question for ${contact?.name}`,
      body: `Hi ${contact?.name}, saw your role in...`
    };
  }

  // 10. Battlecards Automáticos
  async getBattlecard(competitorName: string) {
    // Mock
    return {
      competitor: competitorName,
      weaknesses: ['Pricing', 'Legacy UI'],
      ourStrengths: ['AI-first', 'Unified Platform']
    };
  }

  // 11. Identificação de Stack Tecnológico
  async identifyTechStack(domain: string) {
    // Mock builtwith check
    return ['HubSpot', 'Salesforce', 'Next.js', 'AWS'];
  }

  // 12. Análise de Concorrentes Instalados
  async analyzeInstalledCompetitors(companyId: string) {
    // In real app, check 'Technographics' field on CompanyProfile
    return ['Salesforce', 'Pipedrive'];
  }

  // 13. Registro Histórico por Conta
  async getAccountHistory(companyId: string) {
    // Fetch interactions
    // @ts-ignore
    return prisma.deal.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 14. Score de Maturidade da Conta
  async scoreAccountMaturity(companyId: string) {
    const company = await prisma.companyProfile.findUnique({ where: { id: companyId } });
    if (!company) return 0;

    let score = 0;
    if (company.employeesCount && company.employeesCount > 100) score += 40;
    if (company.segment === 'Technology') score += 30;
    return score;
  }

  // 15. Planejador de Entrada (Account Plan)
  async generateAccountPlan(companyId: string) {
    const map = await this.mapBuyingCommittee(companyId);
    return {
      targetContacts: map.contacts.filter(c => c.influenceLevel === 'HIGH'),
      strategy: 'Top-Down'
    };
  }

  // 16. Sequência Outbound Inteligente
  async generateSequence(target: any) {
    // @ts-ignore
    const seq = await prisma.outboundSequence.create({
      data: {
        name: `Sequence for ${target.role}`,
        steps: [
          { day: 1, type: 'EMAIL', template: 'Intro' },
          { day: 3, type: 'LINKEDIN', template: 'Connect' }
        ],
        targetAudience: { role: target.role }
      }
    });
    return seq;
  }

  // 17. Priorização Automática de Contas
  async prioritizeAccounts(accountIds: string[]) {
    const scores = await Promise.all(accountIds.map(async id => {
      const score = await this.scoreAccountMaturity(id);
      return { id, score };
    }));
    return scores.sort((a, b) => b.score - a.score);
  }

  // 18. Detecção de Bloqueadores
  async detectBlockers(companyId: string) {
    // Find contacts with 'IT Security' or 'Legal' roles usually
    // @ts-ignore
    const committee = await prisma.buyingCommittee.findFirst({
        where: { companyId },
        include: { contacts: true }
    });
    // @ts-ignore
    return committee?.contacts.filter((c: any) => c.role?.includes('Security') || c.role?.includes('Legal')) || [];
  }

  // 19. Atribuição de Influência
  async assignInfluence(contactId: string) {
    const contact = await prisma.contact.findUnique({ where: { id: contactId } });
    if (contact?.role?.includes('VP') || contact?.role?.includes('Head')) return 'HIGH';
    return 'MEDIUM';
  }

  // 20. Relatório de Eficiência Outbound
  async getEfficiencyReport() {
    // Mock aggregate stats
    return {
      sequencesSent: 1500,
      openRate: 0.45,
      replyRate: 0.12,
      meetingsBooked: 25
    };
  }
}
