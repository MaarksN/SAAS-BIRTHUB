'use client';
import React from 'react';
import { Card } from './Card';
import { Check, CreditCard, Star } from 'lucide-react';

export const Billing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <p className="text-slate-400 text-sm mb-6">Para explorar a plataforma.</p>
            <div className="text-3xl font-black text-white mb-8">R$ 0<span className="text-sm font-normal text-slate-500">/mês</span></div>
            <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-300 text-sm"><Check className="w-4 h-4 text-green-500"/> 5 Pesquisas/dia</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><Check className="w-4 h-4 text-green-500"/> Acesso ao SDR Basic</li>
            </ul>
            <button className="w-full py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors">Plano Atual</button>
        </Card>

        <Card className="bg-gradient-to-b from-indigo-900/50 to-slate-900 border-indigo-500/50 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-xl">Popular</div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Pro <Star className="w-4 h-4 text-amber-400 fill-amber-400"/></h3>
            <p className="text-indigo-200 text-sm mb-6">Para vendedores sérios.</p>
            <div className="text-3xl font-black text-white mb-8">R$ 199<span className="text-sm font-normal text-slate-500">/mês</span></div>
            <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-white text-sm"><Check className="w-4 h-4 text-indigo-400"/> IA Ilimitada</li>
                <li className="flex items-center gap-2 text-white text-sm"><Check className="w-4 h-4 text-indigo-400"/> Todos os 40+ Módulos</li>
                <li className="flex items-center gap-2 text-white text-sm"><Check className="w-4 h-4 text-indigo-400"/> Integração CRM</li>
            </ul>
            <button className="w-full py-3 bg-indigo-600 rounded-xl text-white font-bold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Assinar Agora
            </button>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-slate-400 text-sm mb-6">Para times grandes.</p>
            <div className="text-3xl font-black text-white mb-8">Sob Consulta</div>
            <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-300 text-sm"><Check className="w-4 h-4 text-green-500"/> SSO / SAML</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><Check className="w-4 h-4 text-green-500"/> Gerente de Contas</li>
                <li className="flex items-center gap-2 text-slate-300 text-sm"><Check className="w-4 h-4 text-green-500"/> API Personalizada</li>
            </ul>
            <button className="w-full py-3 border border-slate-600 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors">Falar com Vendas</button>
        </Card>
    </div>
  );
};
