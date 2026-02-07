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
  useLocalStorage,
  BulkActionsToolbar,
  ThemeColorPicker
} from '@salesos/ui';
import { leadSchema } from '../../lib/schemas';
import { createLogEntry } from '../../lib/audit';
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

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [logs, setLogs] = useLocalStorage<string[]>('playground_logs', []);
  const [form, setForm] = useState({ companyName: '', email: '', score: 50 });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const newLeads = await parseLeadsFromCSV(file);
        setLeads([...leads, ...newLeads]);

        const log = createLogEntry(`Imported ${newLeads.length} leads from CSV`);
        setLogs([log, ...logs]);

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
      const log = createLogEntry(`Deal won: ${lead.companyName}`);
      setLogs([log, ...logs]);
  };

  const toggleSelection = (id: string) => {
     const newSet = new Set(selectedIds);
     if (newSet.has(id)) newSet.delete(id);
     else newSet.add(id);
     setSelectedIds(newSet);
  };

  const deleteSelected = () => {
     if (!confirm(`Tem certeza que deseja apagar ${selectedIds.size} itens?`)) return;
     setLeads(leads.filter(l => !selectedIds.has(l.id)));

     const log = createLogEntry(`Deleted ${selectedIds.size} leads`);
     setLogs([log, ...logs]);

     setSelectedIds(new Set());
     toast.success("Itens removidos.");
  };

  const handleAddLead = () => {
    try {
        const valid = leadSchema.parse({ ...form, score: Number(form.score), website: '' });
        const newLead: LeadCSV = {
            id: crypto.randomUUID(),
            companyName: valid.companyName,
            sector: 'General',
            location: 'Unknown',
            score: valid.score,
            status: 'new',
            createdAt: new Date().toISOString(),
            tags: []
        };
        setLeads([...leads, newLead]);
        toast.success("Lead added!");
        setForm({ companyName: '', email: '', score: 50 });
    } catch (err: any) {
        if (err.errors) {
            toast.error(err.errors[0].message);
        } else {
            toast.error("Validation failed");
        }
    }
  };

  const renderCard = (lead: LeadCSV) => (
    <Card className={`p-4 shadow-sm bg-white dark:bg-slate-900 border space-y-2 relative ${selectedIds.has(lead.id) ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}>
      <div className="absolute top-2 right-2">
         <input type="checkbox" checked={selectedIds.has(lead.id)} onChange={() => toggleSelection(lead.id)} />
      </div>
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
    <div className="p-8 space-y-8 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Frontend Chassis & Engine Playground</h1>
        <div className="flex items-center gap-2">
            <span className="text-sm">Theme Color:</span>
            <ThemeColorPicker />
        </div>
      </div>

      <section className="space-y-4 border p-4 rounded bg-white/5">
        <h2 className="font-bold">Zod Validation & Create Lead</h2>
        <div className="flex gap-2">
            <input className="border p-2 rounded" placeholder="Company Name" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Score (0-100)" type="number" value={form.score} onChange={e => setForm({...form, score: Number(e.target.value)})} />
            <Button onClick={handleAddLead}>Add Lead</Button>
        </div>
      </section>

      <section className="space-y-4 border p-4 rounded bg-white/5">
        <h2 className="font-bold">Kanban Board (Select items to see Bulk Actions)</h2>
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

      <section className="space-y-4 border p-4 rounded bg-white/5">
         <h2 className="font-bold">Audit Logs (History)</h2>
         <ul className="text-sm text-slate-600 font-mono max-h-40 overflow-auto bg-slate-50 p-2 rounded">
             {logs.map((l, i) => <li key={i}>{l}</li>)}
             {logs.length === 0 && <li>No logs yet.</li>}
         </ul>
      </section>

      <BulkActionsToolbar
        selectedCount={selectedIds.size}
        onDelete={deleteSelected}
        onCancel={() => setSelectedIds(new Set())}
      />
    </div>
  );
}
