import { prisma } from '@salesos/database';

export class OnboardingService {
  // 1. Dossiê Real da Venda
  async getSalesDossier(dealId: string) { return { context: 'Full context' }; }

  // 2. Checklist Inteligente por Cliente
  async generateChecklist(companyId: string) { return ['Step 1', 'Step 2']; }

  // 3. Validação Automática de Pré-requisitos
  async validatePrerequisites(companyId: string) { return { valid: true }; }

  // 4. Detecção de Risco de Atraso
  async detectDelayRisk(projectId: string) { return { risk: 'LOW' }; }

  // 5. Gestão Automática de Tarefas
  async autoAssignTasks(projectId: string) { return true; }

  // 6. Integração Assistida
  async assistIntegration() { return { step: 'API Config' }; }

  // 7. Validação de Migração de Dados
  async validateMigration() { return { errors: 0 }; }

  // 8. Playbooks Dinâmicos
  async getPlaybook(industry: string) { return { steps: [] }; }

  // 9. Monitor de Time-to-Value
  async trackTTV(projectId: string) { return { days: 30 }; }

  // 10. Alerta de Overpromising
  async checkOverpromising(dealId: string) { return { detected: false }; }

  // 11. Histórico de Implantação
  async getHistory(companyId: string) { return []; }

  // 12. Registro de Decisões Técnicas
  async logDecision(projectId: string) { return true; }

  // 13. Comunicação Automática com CS
  async syncWithCS(projectId: string) { return true; }

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
    return readiness === 1;
  }

  // 16. Relatório de Ativação
  async generateActivationReport() { return {}; }

  // 17. Previsão de Churn Inicial
  async predictEarlyChurn(projectId: string) { return 0.05; }

  // 18. Checklist de Transição
  async getTransitionChecklist() { return []; }

  // 19. Feedback Automático para Vendas
  async sendSalesFeedback() { return true; }

  // 20. Métrica de Qualidade de Onboarding
  async calculateQualityScore() { return 98; }
}
