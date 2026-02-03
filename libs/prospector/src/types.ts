export interface SearchFilters {
  role?: string[];
  industry?: string[];
  location?: string[];
  companySize?: string[];
  keywords?: string[];
}

export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  linkedinUrl?: string;
  email?: string;
}
