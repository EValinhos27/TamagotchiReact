// =============================================================================
// userTamagotchiService.jsx — Operações CRUD para a tabela `user_tamagotchis`
// =============================================================================
// Esta tabela representa a coleção de Tamagotchis que cada usuário possui.
// É populada quando um usuário compra um Tamagotchi e pode ser exibida na
// tela de perfil como a "família" de criaturas do usuário.
//
// ESTRUTURA DA TABELA:
//   id          uuid (PK)
//   user_id     uuid (FK → profiles.id)
//   product_id  uuid (FK → products.id — deve ser do tipo 'tamagotchi')
//   nickname    text (apelido dado pelo usuário ao seu Tamagotchi)
//   created_at  timestamp
//
// COMO USAR:
//   import * as tamagotchiService from './userTamagotchiService';
//   const myPets = await tamagotchiService.getTamagotchisByUser('uuid-do-usuario');
// =============================================================================
 
import { supabase, handleResponse } from './api';
 
// =============================================================================
// getTamagotchisByUser — Lista todos os Tamagotchis de um usuário
// =============================================================================
// Retorna a coleção completa do usuário, incluindo os dados do produto base.
// Ideal para a tela de perfil.
//
// @param {string} userId — UUID do usuário
// @returns {Array} — Lista de Tamagotchis com dados do produto
// =============================================================================
export async function getTamagotchisByUser(userId) {
  const { data, error } = await supabase
    .from('user_tamagotchis')
    .select(`
      *,
      products (id, name, description, image_url, type)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: true }); // Exibe o primeiro adquirido primeiro
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getTamagotchiById — Busca um Tamagotchi específico pelo ID do registro
// =============================================================================
// Use para carregar detalhes de um Tamagotchi individual (página de detalhe).
//
// @param {string} tamagotchiId — UUID do registro em user_tamagotchis
// @returns {object|null} — Tamagotchi com dados do produto
// =============================================================================
export async function getTamagotchiById(tamagotchiId) {
  const { data, error } = await supabase
    .from('user_tamagotchis')
    .select(`
      *,
      products (id, name, description, image_url, type)
    `)
    .eq('id', tamagotchiId)
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// addTamagotchiToUser — Adiciona um Tamagotchi à coleção do usuário
// =============================================================================
// Chamado quando o usuário conclui a compra de um produto do tipo 'tamagotchi'.
// Pode ser chamado automaticamente pela lógica de pós-compra.
//
// VERIFICAÇÕES:
//   - `userId` e `productId` são obrigatórios
//   - O produto referenciado deve ser do tipo 'tamagotchi' (verificado via consulta)
//
// @param {string} userId    — UUID do usuário comprador
// @param {string} productId — UUID do produto (deve ser tipo 'tamagotchi')
// @param {string} nickname  — (opcional) Apelido que o usuário dará ao seu Tamagotchi
// @returns {object} — Registro criado
// =============================================================================
export async function addTamagotchiToUser(userId, productId, nickname = null) {
  // Validações obrigatórias
  if (!userId) throw new Error('"userId" é obrigatório para adicionar um Tamagotchi.');
  if (!productId) throw new Error('"productId" é obrigatório para adicionar um Tamagotchi.');
 
  // Verifica se o produto existe e é do tipo correto antes de inserir
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, type')
    .eq('id', productId)
    .single();
 
  if (productError || !product) {
    throw new Error(`Produto com id "${productId}" não encontrado.`);
  }
 
  // Garante que só Tamagotchis entrem nesta tabela, não acessórios
  if (product.type !== 'tamagotchi') {
    throw new Error(
      `O produto "${productId}" é do tipo "${product.type}". ` +
      'Apenas produtos do tipo "tamagotchi" podem ser adicionados à coleção.'
    );
  }
 
  const { data, error } = await supabase
    .from('user_tamagotchis')
    .insert([{ user_id: userId, product_id: productId, nickname }])
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// updateTamagotchiNickname — Atualiza o apelido de um Tamagotchi do usuário
// =============================================================================
// Permite que o usuário renomeie seu Tamagotchi depois de adquiri-lo.
//
// @param {string} tamagotchiId — UUID do registro em user_tamagotchis
// @param {string} newNickname  — Novo apelido (pode ser null para remover)
// @returns {object} — Registro atualizado
// =============================================================================
export async function updateTamagotchiNickname(tamagotchiId, newNickname) {
  const { data, error } = await supabase
    .from('user_tamagotchis')
    .update({ nickname: newNickname })
    .eq('id', tamagotchiId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// removeTamagotchiFromUser — Remove um Tamagotchi da coleção do usuário
// =============================================================================
// Use com cautela: esta ação é irreversível pelo usuário.
// Considere adicionar uma confirmação na UI antes de chamar esta função.
//
// @param {string} tamagotchiId — UUID do registro em user_tamagotchis
// @returns {object} — Registro removido
// =============================================================================
export async function removeTamagotchiFromUser(tamagotchiId) {
  const { data, error } = await supabase
    .from('user_tamagotchis')
    .delete()
    .eq('id', tamagotchiId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// countTamagotchisByUser — Conta quantos Tamagotchis um usuário possui
// =============================================================================
// Útil para exibir um contador rápido no perfil sem buscar todos os registros.
//
// @param {string} userId — UUID do usuário
// @returns {number} — Quantidade de Tamagotchis na coleção
// =============================================================================
export async function countTamagotchisByUser(userId) {
  const { count, error } = await supabase
    .from('user_tamagotchis')
    .select('*', { count: 'exact', head: true }) // `head: true` não retorna os dados, só o count
    .eq('user_id', userId);
 
  if (error) throw new Error(error.message);
 
  return count;
}