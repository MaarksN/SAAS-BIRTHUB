export interface VectorDocument {
  id: string;
  content: string;
  metadata?: Record<string, any>;
  embedding?: number[];
}

export interface VectorStore {
  addDocuments(documents: VectorDocument[]): Promise<void>;
  similaritySearch(query: string, k?: number): Promise<VectorDocument[]>;
}
