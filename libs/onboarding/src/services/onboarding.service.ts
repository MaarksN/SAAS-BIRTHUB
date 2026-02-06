import { prisma } from '@salesos/database';

export class OnboardingService {
  // 1. Dossiê Real da Venda
  async getSalesDossier(dealId: string) {
    // @ts-ignore
    const deal = await prisma.deal.findUnique({
        where: { id: dealId },
        include: { quotes: true, meetings: true }
    });
    return {
        dealValue: deal?.value,
        promisedFeatures: deal?.quotes?.[0]?.content,
        keyMeetings: deal?.meetings?.length
    };
  }

  // 2. Checklist Inteligente por Cliente
  async generateChecklist(companyId: string) {
    const company = await prisma.companyProfile.findUnique({ where: { id: companyId } });
    const tasks = ['Kickoff', 'Account Setup'];
    if (company?.segment === 'Enterprise') tasks.push('SAML Config', 'Security Audit');
    if (company?.cnae?.startsWith('6201')) tasks.push('API Integration');
    return tasks;
  }

  // 3. Validação Automática de Pré-requisitos
  async validatePrerequisites(companyId: string) {
    // Mock check
    return { valid: true, pending: [] };
  }

  // 4. Detecção de Risco de Atraso
  async detectDelayRisk(projectId: string) {
    // @ts-ignore
    const project = await prisma.onboardingProject.findUnique({
        where: { id: projectId },
        include: { tasks: true }
    });

    if (!project) return { risk: 'UNKNOWN' };

    const overdue = project.tasks.filter((t: any) => t.dueDate && t.dueDate < new Date() && t.status !== 'DONE');
    if (overdue.length > 2) return { risk: 'HIGH', reason: `${overdue.length} overdue tasks` };
    return { risk: 'LOW' };
  }

  // 5. Gestão Automática de Tarefas
  async autoAssignTasks(projectId: string) {
    // @ts-ignore
    const project = await prisma.onboardingProject.findUnique({ where: { id: projectId } });
    if (!project) return false;

    const checklist = await this.generateChecklist(project.companyId);

    for (const title of checklist) {
        // @ts-ignore
        await prisma.implementationTask.create({
            data: {
                projectId,
                title,
                status: 'TODO',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 days
            }
        });
    }
    return true;
  }

  // 6. Integração Assistida
  async assistIntegration() {
    return {
        apiKey: 'sk_test_...',
        docsUrl: '/docs/api',
        status: 'Waiting for first event'
    };
  }

  // 7. Validação de Migração de Dados
  async validateMigration(projectId: string) {
    // Mock simulation
    return { totalRecords: 1000, errors: 5, successRate: 0.995 };
  }

  // 8. Playbooks Dinâmicos
  async getPlaybook(industry: string) {
    if (industry === 'Fintech') return { steps: ['Compliance Check', 'Data Encryption Setup'] };
    return { steps: ['Standard Setup'] };
  }

  // 9. Monitor de Time-to-Value
  async trackTTV(projectId: string) {
    // @ts-ignore
    const project = await prisma.onboardingProject.findUnique({ where: { id: projectId } });
    if (!project || !project.actualGoLive) return { status: 'Pending' };

    const ttv = (project.actualGoLive.getTime() - project.startDate.getTime()) / (1000 * 3600 * 24);
    return { days: Math.floor(ttv), benchmark: 30 };
  }

  // 10. Alerta de Overpromising
  async checkOverpromising(dealId: string) {
    // Compare quote items vs implemented tasks
    // @ts-ignore
    const deal = await prisma.deal.findUnique({
        where: { id: dealId },
        include: { quotes: true, company: { include: { onboardingProjects: { include: { tasks: true } } } } }
    });

    // Mock logic
    return { detected: false };
  }

  // 11. Histórico de Implantação
  async getHistory(companyId: string) {
    // @ts-ignore
    return prisma.onboardingProject.findMany({
        where: { companyId },
        include: { tasks: true }
    });
  }

  // 12. Registro de Decisões Técnicas
  async logDecision(projectId: string, decision: string) {
    // Could store in a dedicated table or JSON field
    console.log(`[Onboarding] Decision for project ${projectId}: ${decision}`);
    return true;
  }

  // 13. Comunicação Automática com CS
  async syncWithCS(projectId: string) {
    // Notify CS when project is completed
    const readiness = await this.checkReadiness(projectId);
    if (readiness === 1) {
        console.log(`[Onboarding] Project ${projectId} ready for CS Handover`);
    }
    return true;
  }

  // 14. Avaliação de Prontidão
  async checkReadiness(projectId: string) {
    // @ts-ignore
    const tasks = await prisma.implementationTask.findMany({
        where: { projectId }
    });

    if (tasks.length === 0) return 0;

    const completed = tasks.filter((t: any) => t.status === 'DONE').length;
    return completed / tasks.length;
  }

  // 15. Go-live Gatekeeper
  async canGoLive(projectId: string) {
    const readiness = await this.checkReadiness(projectId);
    const criticalTasksDone = true; // Mock check for "MUST HAVE" tags
    return readiness === 1 && criticalTasksDone;
  }

  // 16. Relatório de Ativação
  async generateActivationReport(projectId: string) {
    const ttv = await this.trackTTV(projectId);
    return { ttv, satisfaction: 5 };
  }

  // 17. Previsão de Churn Inicial
  async predictEarlyChurn(projectId: string) {
    const risk = await this.detectDelayRisk(projectId);
    return risk.risk === 'HIGH' ? 0.3 : 0.05;
  }

  // 18. Checklist de Transição
  async getTransitionChecklist() {
    return ['Introduce CSM', 'Handover Docs', 'Schedule QBR'];
  }

  // 19. Feedback Automático para Vendas
  async sendSalesFeedback() {
    // If implementation was hard due to missing expectations
    return { score: 9, comment: 'Good handover' };
  }

  // 20. Métrica de Qualidade de Onboarding
  async calculateQualityScore(projectId: string) {
    const readiness = await this.checkReadiness(projectId);
    const risk = await this.detectDelayRisk(projectId);

    let score = readiness * 100;
    if (risk.risk === 'HIGH') score -= 20;
    return Math.max(0, score);
  }
}
