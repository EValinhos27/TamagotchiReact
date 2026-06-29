// =============================================================================
// api.jsx — Configuração central do cliente Supabase
// =============================================================================
// Este arquivo é o ponto de entrada para toda comunicação com o banco de dados.
// Aqui criamos e exportamos o cliente Supabase, que é usado por todos os services.
//
// COMO USAR:
//   import { supabase } from './api';
//
// VARIÁVEIS DE AMBIENTE NECESSÁRIAS (arquivo .env na raiz do projeto):
//   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// =============================================================================
 
import { createClient } from '@supabase/supabase-js';
 
// Lê as variáveis de ambiente definidas no arquivo .env
// O prefixo VITE_ é obrigatório para que o Vite exponha as variáveis ao navegador
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
 
// Validação em tempo de desenvolvimento: garante que as variáveis foram configuradas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '[api.jsx] Variáveis de ambiente do Supabase não encontradas.\n' +
    'Crie um arquivo .env na raiz do projeto com:\n' +
    '  VITE_SUPABASE_URL=<sua_url>\n' +
    '  VITE_SUPABASE_ANON_KEY=<sua_chave_anonima>'
  );
}
 
// Cria e exporta o cliente Supabase — use este objeto em todos os services
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 
// =============================================================================
// handleResponse — Utilitário para padronizar respostas e erros do Supabase
// =============================================================================
// O Supabase retorna objetos no formato { data, error }.
// Esta função centraliza o tratamento: lança um erro se algo der errado,
// ou retorna os dados diretamente se tudo correu bem.
//
// EXEMPLO DE USO DENTRO DE UM SERVICE:
//   const { data, error } = await supabase.from('profiles').select('*');
//   return handleResponse(data, error);
// =============================================================================
export function handleResponse(data, error) {
  if (error) {
    // Evita crashar o app se o .single() não achar nada no banco
    if (error.code === 'PGRST116') { 
      return null; 
    }
    console.error('[Supabase Error]', error.message);
    throw new Error(error.message);
  }
  return data;
}