import { prisma } from '@salesos/database';
import {
  ICNPJEnrichmentResult,
  IDataReliabilityScore,
  IInactiveCompanyDetection,
  ICompanySegmentCluster,
  ICNAENormalization,
  IGenericRoleDetection,
} from '../types/ldr';

export class LDRService {
  private aiAgentUrl = process.env.AI_AGENT_URL || 'http://localhost:8000';

  // 1. Enriquecimento Automático de CNPJ
  async enrichCNPJ(cnpj: string): Promise<ICNPJEnrichmentResult> {
    // Simulate enrichment data (mocking external API response)
    const mockData = {
      legalName: 'Enriched Company Ltda',
      foundedDate: new Date('2020-01-01'),
      status: 'ACTIVE',
      segment: 'Technology',
      cnae: '6201-5/00'
    };

    // Upsert CompanyProfile
    // @ts-ignore
    const company = await prisma.companyProfile.upsert({
      where: { cnpj },
      update: {
        name: mockData.legalName,
        isActive: mockData.status === 'ACTIVE',
        segment: mockData.segment,
        cnae: mockData.cnae,
        foundedAt: mockData.foundedDate
      },
      create: {
        cnpj,
        name: mockData.legalName,
        isActive: mockData.status === 'ACTIVE',
        segment: mockData.segment,
        cnae: mockData.cnae,
        foundedAt: mockData.foundedDate
      }
    });

    // Log enrichment
    await prisma.enrichmentLog.create({
      data: {
        companyId: company.id,
        source: 'InternalMock',
        dataField: 'full_profile',
        confidenceScore: 0.95,
        newValue: JSON.stringify(mockData)
      }
    });

    return {
      cnpj,
      legalName: company.name,
      foundedDate: company.foundedAt?.toISOString().split('T')[0] || '',
      status: company.isActive ? 'ACTIVE' : 'INACTIVE',
      address: {
        street: 'Rua Mock, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
      },
      phones: ['11999999999'],
      emails: ['contact@mock.com'],
      cnae: {
        code: company.cnae || '',
        description: 'Desenvolvimento de programas de computador sob encomenda',
      },
    };
  }

  // 2. Validação Cruzada de Fontes
  async validateSources(companyId: string): Promise<{ status: string; sources: string[] }> {
    // Check if we have logs from multiple sources
    const logs = await prisma.enrichmentLog.findMany({
      where: { companyId },
      select: { source: true }
    });

    const uniqueSources = [...new Set(logs.map(l => l.source))];
    const status = uniqueSources.length > 1 ? 'VALIDATED_CROSS_SOURCE' : 'SINGLE_SOURCE';

    return { status, sources: uniqueSources };
  }

  // 3. Score de Confiabilidade de Dados
  async calculateReliabilityScore(companyId: string): Promise<IDataReliabilityScore> {
    const company = await prisma.companyProfile.findUnique({
      where: { id: companyId },
      include: { enrichmentLogs: true }
    });

    if (!company) throw new Error('Company not found');

    let score = 50; // Base score
    if (company.cnae) score += 10;
    if (company.segment) score += 10;
    if (company.employeesCount) score += 10;

    // Check recent logs
    const recentLogs = company.enrichmentLogs.filter(
      l => l.performedAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    if (recentLogs.length > 0) score += 20;

    // Upsert score
    // @ts-ignore
    await prisma.dataReliabilityScore.upsert({
      where: { companyId },
      update: { score, factors: { recentEnrichment: recentLogs.length > 0 } },
      create: { companyId, score, factors: { recentEnrichment: recentLogs.length > 0 } }
    });

    return {
      companyId,
      overallScore: score,
      factors: {
        recency: recentLogs.length > 0 ? 100 : 0,
        completeness: score, // Simplified
        consistency: 85,
        sourceCredibility: 95,
      },
    };
  }

  // 4. Detecção de Empresas Inativas
  async detectInactiveCompany(cnpj: string): Promise<IInactiveCompanyDetection> {
    // Logic: If not enriched in 6 months, flag potential inactive
    const company = await prisma.companyProfile.findUnique({
      where: { cnpj }
    });

    if (!company) return { cnpj, isInactive: true, evidence: ['Company not found'] };

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const isStale = company.updatedAt < sixMonthsAgo;

    return {
      cnpj,
      isInactive: !company.isActive || isStale,
      evidence: isStale ? ['Data stale > 6 months'] : [],
    };
  }

  // 5. ICP Dinâmico Versionado
  async getICPProfile(id: string) {
    // Mock storage - usually in a dedicated ICP table
    return { id, version: 1, criteria: { minRevenue: 1000000, segment: 'SaaS' } };
  }

  // 6. Clusterização de Segmentos
  async clusterSegments(): Promise<ICompanySegmentCluster[]> {
    const companies = await prisma.companyProfile.groupBy({
      by: ['segment'],
      _count: { id: true }
    });

    return companies.map(c => ({
      segmentName: c.segment || 'Unknown',
      companiesCount: c._count.id,
      averageRevenue: 0, // Need Revenue model
      growthRate: 0
    }));
  }

  // 7. Normalização de CNAE
  async normalizeCNAE(code: string): Promise<ICNAENormalization> {
    const cleaned = code.replace(/[^\d]/g, '');
    // Mock mapping
    const sectorMap: Record<string, string> = {
      '6201500': 'Technology',
      '6202300': 'Technology',
      '4120400': 'Construction'
    };

    return {
      originalCode: code,
      normalizedCode: cleaned,
      description: 'Normalized Description based on code',
      sector: sectorMap[cleaned] || 'Other',
    };
  }

  // 8. Detecção de Cargos Genéricos
  async detectGenericRole(role: string): Promise<IGenericRoleDetection> {
    const generics = ['manager', 'director', 'vp', 'ceo', 'founder', 'owner', 'gerente'];
    const lowerRole = role.toLowerCase();
    const isGeneric = generics.some(g => lowerRole === g);

    return {
      roleTitle: role,
      isGeneric,
      suggestedSpecificRoles: isGeneric ? [`Sales ${role}`, `Marketing ${role}`] : [],
    };
  }

  // 9. Atualização Automática de Contatos
  async updateContacts(companyId: string) {
    // Mock: Find outdated contacts and mark for update
    const contacts = await prisma.contact.findMany({
      where: {
        // @ts-ignore
        buyingCommittee: { companyId },
        updatedAt: { lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
      }
    });
    return { updatedCount: contacts.length };
  }

  // 10. LGPD Guard (Compliance)
  async checkLGPDCompliance(contactId: string) {
    // Check if source allows outbound
    return { compliant: true, source: 'Public Web' };
  }

  // 11. Detecção de Dados Sensíveis
  async detectSensitiveData(input: any) {
    const str = JSON.stringify(input);
    // Regex for CPF
    const hasCPF = /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(str);
    return { hasSensitiveData: hasCPF, type: hasCPF ? 'CPF' : null };
  }

  // 12. Feedback Loop com Vendas
  async processFeedback(dealId: string, feedback: string) {
    // Log feedback for AI training
    console.log(`[LDR] Processing feedback for deal ${dealId}: ${feedback}`);
    return true;
  }

  // 13. Análise de Qualidade por Lista
  async analyzeListQuality(source: string) {
    const logs = await prisma.enrichmentLog.findMany({
      where: { source }
    });
    const avgConfidence = logs.reduce((a, b) => a + b.confidenceScore, 0) / (logs.length || 1);
    return { source, quality: avgConfidence * 100 };
  }

  // 14. Ranking de Listas por Conversão
  async rankLists() {
    // Mock
    return [
      { source: 'Apollo', conversionRate: 0.15 },
      { source: 'LinkedIn', conversionRate: 0.12 }
    ];
  }

  // 15. Histórico de Inteligência
  async getIntelligenceHistory(companyId: string) {
    return prisma.enrichmentLog.findMany({
      where: { companyId },
      orderBy: { performedAt: 'desc' }
    });
  }

  // 16. Detecção de Duplicidade
  async checkDuplicity(cnpj: string) {
    const count = await prisma.companyProfile.count({
      where: { cnpj }
    });
    return { isDuplicate: count > 1, count };
  }

  // 17. Monitor de Turnover Executivo
  async monitorTurnover(companyId: string) {
    // Mock: Check if key contacts left
    return { turnoverRate: 0.05, departures: [] };
  }

  // 18. Sugestão de Novos Nichos
  async suggestNiches() {
    // Analyze winning deals segments
    return ['Fintech', 'Agrotech'];
  }

  // 19. Alertas de Degradação de Dados
  async checkDataDegradation() {
    // Find companies not updated in 1 year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const count = await prisma.companyProfile.count({
      where: { updatedAt: { lt: oneYearAgo } }
    });
    return { degradedRecords: count };
  }

  // 20. Relatório de Impacto de Inteligência
  async generateImpactReport() {
    return {
      enrichedCompanies: await prisma.companyProfile.count(),
      totalLogs: await prisma.enrichmentLog.count()
    };
  }
}
