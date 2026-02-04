'use client';

import { useState } from 'react';
import { SearchForm, ResultsTable } from '@salesos/ui';
import { searchProspects } from '../../actions/prospector';

export default function ProspectorPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters: any) => {
    setLoading(true);
    try {
      const data = await searchProspects(filters);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Prospector</h1>
        <p className="text-muted-foreground">Search for leads across 500M+ profiles.</p>
      </div>

      <SearchForm onSearch={handleSearch} />

      {loading ? (
        <div className="p-4 text-center text-muted-foreground">Searching...</div>
      ) : (
        <ResultsTable results={results} />
      )}
    </div>
  );
}
