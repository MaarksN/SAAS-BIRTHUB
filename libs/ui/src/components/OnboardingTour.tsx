'use client';
import React, { useState } from 'react';
import { Card } from './Card';
import { X, ArrowRight, Check } from 'lucide-react';

export const OnboardingTour: React.FC<{ active: boolean, onClose: () => void }> = ({ active, onClose }) => {
  const [step, setStep] = useState(0);

  if (!active) return null;

  const steps = [
    { title: "Bem-vindo ao SalesOS", desc: "Sua nova central de comando de vendas." },
    { title: "SDR Commander", desc: "Use o módulo SDR para prospecção e cold calls." },
    { title: "Market Intel", desc: "O módulo LDR traz dados ricos sobre empresas." },
    { title: "AI Assistant", desc: "Use o Cmd+K para acessar qualquer ferramenta." }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onClose();
  };

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-[400px] bg-slate-900 border-slate-700 p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-5 h-5"/></button>

        <div className="mb-8">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Passo {step + 1}/{steps.length}</span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-2">{currentStep?.title || 'Loading...'}</h3>
            <p className="text-slate-400">{currentStep?.desc || ''}</p>
        </div>

        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                {steps.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                ))}
            </div>
            <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
            >
                {step === steps.length - 1 ? 'Começar' : 'Próximo'} <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </Card>
    </div>
  );
};
