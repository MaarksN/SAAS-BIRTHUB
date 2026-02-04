'use server';

import { PipelineService } from '@salesos/hub';
import { SearchService } from '@salesos/prospector';

export async function getDashboardStats() {
  const pipelineService = new PipelineService();
  const searchService = new SearchService();

  // In a real app, these would be aggregated queries
  const deals = await pipelineService.getDeals();
  const prospects = await searchService.search({});

  const totalRevenue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const activeDeals = deals.length;
  const totalProspects = prospects.length + 1230; // Adding dummy base for "historical" data

  return {
    totalRevenue,
    activeDeals,
    totalProspects,
  };
}
