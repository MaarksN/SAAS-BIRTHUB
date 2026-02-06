"use client";
import React from "react";
import { Button, Input, Card, CardContent } from "@salesos/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center gap-8">

        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            SalesOS Ultimate
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A plataforma unificada de inteligência comercial.
            Do enriquecimento de leads (LDR) ao fechamento (AE) em um só lugar.
          </p>
        </div>

        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">Acesso à Plataforma</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">E-mail Corporativo</label>
                <Input
                  type="email"
                  placeholder="voce@empresa.com"
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Senha</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 mt-4">
                Entrar no Sistema
              </Button>
            </form>
            <div className="mt-6 text-center text-xs text-slate-500">
              Protegido por criptografia de ponta a ponta. SOC2 Compliant.
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
