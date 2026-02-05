import { ILeadScore, IObjectionResponse } from "../types/sdr";

export class SDRService {

  // --- EXISTING METHODS ---
  async scoreLead(leadId: string, data?: any): Promise<ILeadScore> {
    const signals = data || { websiteVisits: 5, emailOpens: 2, pricingPageViews: 1, role: "Decision Maker" };
    let score = 0;
    if (signals.role === "Decision Maker") score += 30;
    if (signals.pricingPageViews > 0) score += 25;
    score += (signals.websiteVisits * 2);
    score += (signals.emailOpens * 5);
    return { leadId, score: Math.min(score, 100), factors: { behavioral: score * 0.6, demographic: score * 0.4 } };
  }

  async handleObjection(text: string): Promise<IObjectionResponse> {
    const objectionsMap: Record<string, string> = {
      "caro": "Entendo a preocupação com o orçamento. Clientes como [X] viram ROI de 300%. O custo da inação é maior.",
      "tempo": "Implementação em 48h sem TI. Podemos começar pequeno?",
      "concorrente": "Eles são generalistas. Nós somos especialistas no seu nicho com [Feature X]."
    };
    let response = "Poderia detalhar?";
    const lower = text.toLowerCase();
    if (lower.includes("preço") || lower.includes("caro")) response = objectionsMap["caro"];
    else if (lower.includes("tempo")) response = objectionsMap["tempo"];

    return { objection: text, response };
  }

  // --- ARSENAL EXPANSION (TOOLS 1-20) ---

  // 1. Cold Call Script
  async generateColdCallScript(persona: string, valueProp: string): Promise<string> {
    return `**Cold Call Script para ${persona}:**\n\n"Olá [Nome], aqui é [Seu Nome] da SalesOS. Sei que não estava esperando, mas vi que você lidera [Área] e queria validar uma hipótese sobre [Problema].\n\nNós ajudamos empresas como a sua a ${valueProp}. Isso faz sentido para o seu momento atual ou estou totalmente fora?"`;
  }

  // 2. Email Roast
  async roastEmail(emailContent: string): Promise<string> {
    return `**Email Roast (Crítica Ácida):**\n\n1. **Assunto:** Genérico. Tente algo como "Ideia para [Empresa]"\n2. **Tamanho:** Muito longo. Corte 50%.\n3. **Eu-centrismo:** Você falou "nós" 5 vezes. Fale "você".\n\n**Nota:** 4/10. Refaça focando na dor do cliente.`;
  }

  // 3. LinkedIn Icebreaker
  async generateIcebreaker(profileBio: string): Promise<string> {
    return `**Opção 1:** "Vi seu post sobre [Tópico da Bio]. Concordo totalmente com a parte X..."\n**Opção 2:** "Parabéns pelos [Anos] na [Empresa]. Impressionante a trajetória..."`;
  }

  // 4-6. Objection Killers (Specific)
  async killObjectionPrice(): Promise<string> { return "Se o preço fosse zero, a solução resolveria seu problema? Se sim, o problema é ROI, não custo. Vamos calcular o retorno?"; }
  async killObjectionCompetitor(competitor: string): Promise<string> { return `O ${competitor} é ótimo para [Caso A]. Nós fomos desenhados especificamente para [Caso B - Sua Força]. É isso que você busca?`; }
  async killObjectionTime(): Promise<string> { return "Entendo. A maioria dos meus melhores clientes também estava sem tempo. Justamente por isso implementaram nossa automação. Quer ver como economizar 10h/semana?"; }

  // 7. Follow-up Builder
  async generateFollowUp(context: string): Promise<string> { return `Olá [Nome], pensando na nossa conversa sobre ${context}, vi este artigo e lembrei de você. Abs.`; }

  // 8. Break-up Email
  async generateBreakUp(): Promise<string> { return "Olá [Nome], não quero ser o chato da caixa de entrada. Vou assumir que [Projeto] não é prioridade agora. Vou encerrar meu contato por aqui. Se algo mudar, estou à disposição."; }

  // 9. Gatekeeper Bypass
  async bypassGatekeeper(role: string): Promise<string> { return `Olá, sou [Nome]. Poderia me ajudar? Estou tentando enviar um material técnico para o Diretor sobre [Tópico], mas não queria incomodar no email errado. Qual a melhor forma?`; }

  // 10. Value Proposition Canvas
  async createValueProp(product: string, pain: string): Promise<string> { return `**Produto:** ${product}\n**Dor:** ${pain}\n**Alivio:** Reduz o estresse manual.\n**Ganho:** Aumenta receita em 20%.\n**Pitch:** "Para gestores que sofrem com ${pain}, o ${product} é a solução que elimina o trabalho manual."`; }

  // 11. Pain Magnifier
  async magnifyPain(pain: string): Promise<string> { return `**Dor:** ${pain}\n**Nível 1 (Financeiro):** Perda de R$ X/mês.\n**Nível 2 (Estratégico):** Perda de market share.\n**Nível 3 (Pessoal):** Estresse da equipe e risco de burnout.`; }

  // 12. ROI Calculator
  async calculateROI(cost: number, gain: number): Promise<string> { const roi = ((gain - cost) / cost) * 100; return `Investimento: R$${cost}\nRetorno: R$${gain}\n**ROI:** ${roi.toFixed(0)}%\nPayback em X meses.`; }

  // 13. Competitor Battlecard
  async battlecard(competitor: string): Promise<string> { return `**Contra ${competitor}:**\n1. Eles são lentos na implementação.\n2. Suporte deles é via ticket (nós somos Slack).\n3. Preço deles escala mal.`; }

  // 14. SPIN Questions
  async generateSPIN(product: string): Promise<string> { return `**S:** Como vocês fazem X hoje?\n**P:** Quanto tempo perdem com isso?\n**I:** Se isso falhar, qual o impacto no cliente final?\n**N:** Se vocês pudessem automatizar isso, o que fariam com o tempo livre?`; }

  // 15. MEDDIC Checklist
  async checkMEDDIC(): Promise<string> { return `**M**etrics: Tem ROI?\n**E**conomic Buyer: Falamos com quem paga?\n**D**ecision Criteria: O que avaliam?\n**D**ecision Process: Como compram?\n**I**dentify Pain: A dor é latente?\n**C**hampion: Quem nos defende lá dentro?`; }

  // 16. BANT Qualifier
  async checkBANT(): Promise<string> { return `**B**udget: Tem verba?\n**A**uthority: Quem decide?\n**N**eed: Precisa mesmo?\n**T**iming: É para agora?`; }

  // 17. Referral Request
  async requestReferral(): Promise<string> { return "Fico feliz que gostou do resultado! Conhece mais alguém no seu setor que sofre com o mesmo problema?"; }

  // 18. Case Study Storyteller
  async tellStory(client: string, result: string): Promise<string> { return `A ${client} estava travada. Eles tentaram X e Y. Quando implementaram nossa solução, em 30 dias o resultado foi ${result}. Hoje eles são referência.`; }

  // 19. WhatsApp Audio Script
  async whatsappAudio(lead: string): Promise<string> { return `(Tom casual) "Fala ${lead}, tudo bom? Tentei te ligar agora. Vi uma coisa no seu site que me chamou atenção sobre [Tópico]. Me avisa quando puder falar, é rápido."`; }

  // 20. Voice Note Summary
  async summarizeVoice(text: string): Promise<string> { return `**Resumo da Call:**\n- Cliente interessado.\n- Dor principal: Preço.\n- Próximo passo: Enviar proposta até sexta.`; }
}
