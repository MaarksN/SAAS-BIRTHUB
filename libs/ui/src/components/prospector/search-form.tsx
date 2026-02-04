'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (filters: any) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ role: role ? [role] : undefined, industry: industry ? [industry] : undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end p-4 border rounded bg-card">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Role</label>
        <input
          className="border rounded px-3 py-2 text-sm bg-background"
          placeholder="e.g. CEO"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Industry</label>
        <input
          className="border rounded px-3 py-2 text-sm bg-background"
          placeholder="e.g. SaaS"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
