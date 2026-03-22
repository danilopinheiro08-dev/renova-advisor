import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        const systemPrompt = {
            role: "system",
            content: `Você é um assistente financeiro de elite para assessores da Renova/BTG Pactual.
O seu nome é "RenovaBot". 
REGRAS:
1. Responda APENAS perguntas sobre mercado financeiro, economia, taxas (CDI, IPCA, Selic), criptomoedas, ações e investimentos.
2. Seja direto, persuasivo e use dados quando disponíveis.
3. Se o usuário perguntar algo fora do escopo financeiro, recuse categoricamente: "Sou um especialista financeiro da Renova e só respondo sobre investimentos e economia."
Contexto de Mercado Atual (Tempo Real):
${JSON.stringify(context || {})}
`
        };

        const completion = await groq.chat.completions.create({
            messages: [systemPrompt, ...messages],
            // we can use a fast model
            model: "llama-3.1-8b-instant",
            temperature: 0.2,
            max_tokens: 1024,
        });

        return NextResponse.json({ result: completion.choices[0]?.message?.content || "" });
    } catch (error: any) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
