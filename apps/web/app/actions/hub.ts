'use server';

import { PipelineService } from '@salesos/hub';

export async function getPipeline() {
  const service = new PipelineService();
  return service.getDeals();
}
