'use server';

import { SearchService } from '@salesos/prospector';

export async function searchProspects(filters: any) {
  const service = new SearchService();
  return service.search(filters);
}
