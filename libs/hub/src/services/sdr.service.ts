import { ILeadScore, IObjectionResponse } from "../types/sdr";

export class SDRService {
  /**
   * Algoritmo de Lead Scoring Comportamental
   * Baseado em BANT (Budget, Authority, Need, Timing) implícito
   */
  async scoreLead(leadId: string, data?: any): Promise<ILeadScore> {
    // Dados padrão caso não sejam fornecidos
    const signals = data || {
      websiteVisits: 5,
      emailOpens: 2,
      pricingPageViews: 1,
      role: "Decision Maker"
    };

    let score = 0;

    // Lógica de Pontuação
    if (signals.role === "Decision Maker") score += 30;
    if (signals.pricingPageViews > 0) score += 25;
    score += (signals.websiteVisits * 2); // 2 pontos por visita
    score += (signals.emailOpens * 5);    // 5 pontos por abertura

    // Normalização (Max 100)
    score = Math.min(score, 100);

    return {
      leadId,
      score,
      factors: {
        behavioral: score * 0.6,
        demographic: score * 0.4
      }
    };
  }

  /**
   * Copiloto de Objeções com Contexto Dinâmico
   */
  async handleObjection(text: string): Promise<IObjectionResponse> {
    const objectionsMap: Record<string, string> = {
      "caro": "Entendo a preocupação com o orçamento. No entanto, clientes como [Empresa X] viram ROI de 300% em 3 meses. O custo de não resolver o problema hoje é maior que o investimento.",
      "tempo": "Muitos gestores sentem o mesmo. Nossa implementação leva apenas 48h e não exige recursos de TI. Podemos começar pequeno?",
      "concorrente": "Eles são uma ótima ferramenta genérica. Nós somos especialistas no seu nicho, o que garante funcionalidades que eles não possuem, como [Feature X]."
    };

    // Detecção simples de palavras-chave (seria substituída por LLM real)
    let response = "Poderia me dar mais detalhes sobre essa preocupação?";

    const lowerText = text.toLowerCase();
    if (lowerText.includes("preço") || lowerText.includes("custo") || lowerText.includes("caro")) {
      response = objectionsMap["caro"] || response;
    } else if (lowerText.includes("tempo") || lowerText.includes("agora não")) {
      response = objectionsMap["tempo"] || response;
    }

    return {
      objection: text,
      response
    };
  }

  async getCadence(leadId: string) {
    return {
      id: "cadence-tech-ceo",
      name: "Sequência CEO Tech (Alta Conversão)",
      steps: [
        { day: 1, type: "LINKEDIN_CONNECT", script: "Vi seu post sobre..." },
        { day: 1, type: "EMAIL", subject: "Eficiência em vendas" },
        { day: 3, type: "CALL", script: "Script de abertura suave..." },
        { day: 5, type: "EMAIL_BUMP", subject: "Re: Eficiência" }
      ]
    };
  }
}
