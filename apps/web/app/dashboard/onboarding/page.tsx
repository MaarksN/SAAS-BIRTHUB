'use client';

import React from 'react';
import { OnboardingTour, Billing } from '@salesos/ui';
import { Rocket } from 'lucide-react';

export default function OnboardingPage() {
  const [tourActive, setTourActive] = React.useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <OnboardingTour active={tourActive} onClose={() => setTourActive(false)} />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                <Rocket className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black mb-4">Bem-vindo ao Nível Pro</h1>
            <p className="text-xl text-slate-400">Escolha o plano ideal para escalar suas vendas com IA.</p>
        </div>

        <Billing />
      </div>
    </div>
  );
}
