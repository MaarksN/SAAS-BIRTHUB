'use client';

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI alternativa
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Aqui você enviaria o erro para o Sentry/LogRocket
    console.error("Erro capturado pelo Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
         <div className="p-6 bg-red-50 text-red-800 rounded border border-red-200">
            <h3 className="font-bold">Ops! Algo deu errado neste componente.</h3>
            <button onClick={() => this.setState({ hasError: false })} className="mt-2 text-sm underline">
               Tentar novamente
            </button>
         </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
