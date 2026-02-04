export interface ICNPJEnrichmentResult {
  cnpj: string;
  legalName: string;
  tradeName?: string;
  foundedDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phones: string[];
  emails: string[];
  cnae: {
    code: string;
    description: string;
  };
}

export interface IDataSourceValidation {
  sourceName: string;
  lastChecked: Date;
  isReliable: boolean;
  discrepanciesCount: number;
}

export interface IDataReliabilityScore {
  companyId: string;
  overallScore: number; // 0-100
  factors: {
    recency: number;
    completeness: number;
    consistency: number;
    sourceCredibility: number;
  };
}

export interface IInactiveCompanyDetection {
  cnpj: string;
  isInactive: boolean;
  reason?: string;
  evidence: string[]; // e.g., "Receita Federal status", "Domain expired"
}

export interface IICPProfile {
  id: string;
  version: number;
  criteria: {
    segments: string[];
    minRevenue: number;
    maxRevenue: number;
    employeeRange: string;
    technologies: string[];
  };
  createdAt: Date;
}

export interface ICompanySegmentCluster {
  segmentName: string;
  companiesCount: number;
  averageRevenue: number;
  growthRate: number;
}

export interface ICNAENormalization {
  originalCode: string;
  normalizedCode: string;
  description: string;
  sector: string;
}

export interface IGenericRoleDetection {
  roleTitle: string;
  isGeneric: boolean;
  suggestedSpecificRoles: string[];
}

export interface IContactUpdateResult {
  contactId: string;
  fieldUpdated: string;
  oldValue: string;
  newValue: string;
  source: string;
}

export interface ILGPDComplianceCheck {
  companyId: string;
  compliant: boolean;
  consentObtained: boolean;
  sensitiveDataDetected: boolean;
  auditTrailId: string;
}

export interface ISensitiveDataDetection {
  field: string;
  hasSensitiveData: boolean;
  dataType: 'CPF' | 'RELIGION' | 'POLITICAL' | 'HEALTH' | 'NONE';
}

export interface ISalesFeedbackLoop {
  leadId: string;
  salesRepId: string;
  qualityRating: 1 | 2 | 3 | 4 | 5;
  rejectionReason?: string;
  comments: string;
}

export interface IListQualityAnalysis {
  listId: string;
  totalRecords: number;
  validEmailsPercentage: number;
  validPhonesPercentage: number;
  enrichmentRate: number;
}

export interface IListConversionRanking {
  listId: string;
  listName: string;
  conversionRate: number;
  revenueGenerated: number;
}

export interface IIntelligenceHistory {
  companyId: string;
  events: {
    date: Date;
    type: string;
    description: string;
  }[];
}

export interface IDuplicityCheck {
  isDuplicate: boolean;
  originalRecordId?: string;
  similarityScore: number;
}

export interface ITurnoverMonitor {
  companyId: string;
  executiveName: string;
  role: string;
  hasLeft: boolean;
  detectedAt: Date;
}

export interface INicheSuggestion {
  nicheName: string;
  reasoning: string;
  potentialSize: number;
  matchScore: number; // 0-100 match to current ICP
}

export interface IDataDegradationAlert {
  companyId: string;
  field: string;
  degradationType: 'OUTDATED' | 'INVALID_FORMAT' | 'SOURCE_LOST';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface IIntelligenceImpactReport {
  period: string;
  leadsEnriched: number;
  dataCorrectionRate: number;
  estimatedTimeSaved: number; // in hours
}
