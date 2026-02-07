export interface ReportDefinition {
  id: string;
  name: string;
  metrics: string[];
  dimensions: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>;
}

export class ReportingEngine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateReport(definition: ReportDefinition): Promise<any> {
    console.log(`Generating report: ${definition.name}`);
    return {
      columns: [...definition.dimensions, ...definition.metrics],
      data: []
    };
  }
}
