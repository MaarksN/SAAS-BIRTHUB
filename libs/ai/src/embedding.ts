export interface EmbeddingService {
  embedQuery(text: string): Promise<number[]>;
  embedDocuments(documents: string[]): Promise<number[][]>;
}
