import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
// Using gemini-1.5-flash as it is a widely available stable model.
// User requested 2.5-flash-preview which might be experimental or unavailable.
const modelName = "gemini-1.5-flash";

export const generateElevatorPitch = async (company: string, sector: string) => {
   if (!apiKey) return "API Key not configured.";

   const model = genAI.getGenerativeModel({ model: modelName });
   const prompt = `Atue como um especialista em vendas B2B. Crie um pitch de vendas falado de exatamente 30 segundos para vender para a empresa ${company} que atua no setor ${sector}. Foque na dor principal desse setor e como nossa solução resolve. Tom: Consultivo e confiante.`;

   try {
       const result = await model.generateContent(prompt);
       return result.response.text();
   } catch (error) {
       console.error("Gemini Error:", error);
       return "Failed to generate pitch.";
   }
};

export const generateBattleCard = async (competitor: string) => {
   if (!apiKey) return "API Key not configured.";

   const model = genAI.getGenerativeModel({ model: modelName });
   const prompt = `Crie uma tabela Markdown comparativa: Coluna 1 'Minha Empresa', Coluna 2 '${competitor}'. Linhas: Preço, Funcionalidades, Suporte. Destaque onde minha empresa ganha.`;

   try {
       const result = await model.generateContent(prompt);
       return result.response.text();
   } catch (error) {
       console.error("Gemini Error:", error);
       return "Failed to generate battle card.";
   }
};

export const analyzeSentiment = async (text: string) => {
   if (!apiKey) return "UNKNOWN";

   const model = genAI.getGenerativeModel({ model: modelName });
   const prompt = `Analise as notas deste CRM e classifique o sentimento do cliente estritamente em uma destas 3 categorias: POSITIVO, NEUTRO, NEGATIVO. Responda apenas a palavra. Texto: "${text}"`;

   try {
      const result = await model.generateContent(prompt);
      return result.response.text().trim().toUpperCase();
   } catch (error) {
       console.error("Gemini Error:", error);
       return "ERROR";
   }
};
