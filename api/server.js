import Groq from 'groq-sdk';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    console.log('SERVER RECEBEU:', { systemPromptPreview: systemPrompt?.slice(0, 80) });

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato inválido' });
    }

    // Usamos role:user para garantir que o modelo obedeça as instruções
    const fullMessages = systemPrompt
      ? [
          { role: 'user', content: `INSTRUÇÕES: ${systemPrompt}\n\nLembre-se: você é o personagem descrito acima. Responda como esse personagem.` },
          { role: 'assistant', content: 'Entendi! Vou seguir essas instruções e responder como o personagem.' },
          ...messages,
        ]
      : messages;

    const chatCompletion = await groq.chat.completions.create({
      messages: fullMessages,
      model: 'llama-3.3-70b-versatile',
    });

    const reply = chatCompletion.choices[0]?.message?.content || '';
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
