'use client';

import React, { useState } from 'react';
import {
  KanbanBoardSimple,
  AvatarHash,
  Skeleton,
  TagInput,
  toast,
  Button,
  Card,
  useLocalStorage
} from '@salesos/ui';
import { parseLeadsFromCSV, LeadCSV } from '../../lib/csv-import';
import { validateCNPJ, fetchCEP } from '../../lib/brasil-api';
import { getWhatsAppLink } from '../../lib/whatsapp';
import { generateProposal } from '../../lib/pdf-generator';
import { triggerConfetti } from '../../lib/confetti';

export default function PlaygroundPage() {
  const [leads, setLeads] = useLocalStorage<LeadCSV[]>('playground_leads', [
    { id: '1', companyName: 'Acme Corp', sector: 'Tech', location: 'SP', score: 80, status: 'new', createdAt: '', tags: ['vip'] },
    { id: '2', companyName: 'Globex', sector: 'Finance', location: 'RJ', score: 60, status: 'negotiation', createdAt: '', tags: [] },
  ]);

  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const newLeads = await parseLeadsFromCSV(file);
        setLeads([...leads, ...newLeads]);
        toast.success(`${newLeads.length} leads imported!`);
      } catch (err) {
        toast.error('Failed to import CSV');
      }
    }
  };

  const handleValidateCNPJ = async () => {
    try {
      const res = await validateCNPJ(cnpj);
      toast.success(`CNPJ Valid: ${res.data.razao_social}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleFetchCEP = async () => {
      try {
          const data = await fetchCEP(cep);
          toast.success(`CEP: ${data.street}, ${data.city}`);
      } catch (err: any) {
          toast.error(err.message);
      }
  };

  const handleWon = (lead: LeadCSV) => {
      triggerConfetti();
      toast.success(`Won deal with ${lead.companyName}!`);
  };

  const renderCard = (lead: LeadCSV) => (
    <Card className="p-4 shadow-sm bg-white dark:bg-slate-900 border space-y-2">
      <div className="flex items-center gap-2">
        <AvatarHash name={lead.companyName} />
        <div>
          <h4 className="font-bold">{lead.companyName}</h4>
          <p className="text-xs text-slate-500">{lead.location}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {lead.tags?.map(tag => <span key={tag} className="text-xs bg-gray-100 px-1 rounded">#{tag}</span>)}
      </div>
      <div className="flex gap-2 mt-2">
         <a href={getWhatsAppLink('11999999999', `Ola ${lead.companyName}`)} target="_blank" className="text-xs bg-green-500 text-white px-2 py-1 rounded">WhatsApp</a>
         <button onClick={() => generateProposal(lead)} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">PDF</button>
         <button onClick={() => handleWon(lead)} className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Win</button>
      </div>
    </Card>
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Frontend Chassis & Engine Playground</h1>

      <section className="space-y-4 border p-4 rounded">
        <h2 className="font-bold">1. CSV Import</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </section>

      <section className="space-y-4 border p-4 rounded">
        <h2 className="font-bold">2. Brasil API</h2>
        <div className="flex gap-2">
          <input value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="CNPJ" className="border p-1" />
          <Button onClick={handleValidateCNPJ}>Validate CNPJ</Button>
        </div>
        <div className="flex gap-2">
            <input value={cep} onChange={e => setCep(e.target.value)} placeholder="CEP" className="border p-1" />
            <Button onClick={handleFetchCEP}>Fetch CEP</Button>
        </div>
      </section>

      <section className="space-y-4 border p-4 rounded">
        <h2 className="font-bold">3. Kanban Board (with Skeleton if empty)</h2>
        {leads.length === 0 ? (
           <div className="flex gap-4">
             <Skeleton className="h-64 w-64" />
             <Skeleton className="h-64 w-64" />
           </div>
        ) : (
          <KanbanBoardSimple
            items={leads}
            getStatus={l => l.status}
            renderCard={renderCard}
            columns={['new', 'negotiation', 'won']}
          />
        )}
      </section>

      <section className="space-y-4 border p-4 rounded">
          <h2 className="font-bold">4. Tag Input</h2>
          <TagInput tags={['demo']} onChange={(tags) => toast.success(`Tags: ${tags.join(', ')}`)} />
      </section>
    </div>
  );
}
