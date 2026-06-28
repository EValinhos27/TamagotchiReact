// =============================================================================
// profileService.jsx — Operações CRUD para a tabela `profiles`
// =============================================================================
// A tabela `profiles` está diretamente ligada ao sistema de autenticação do
// Supabase (auth.users). Cada usuário autenticado possui um perfil associado.
//
// ESTRUTURA DA TABELA:
//   id          uuid (FK → auth.users, PK)
//   username    text (único)
//   avatar_url  text
//
// COMO USAR:
//   import * as profileService from './profileService';
//   const profile = await profileService.getProfileById('uuid-do-usuario');
// =============================================================================
 
import { supabase, handleResponse } from './api';
 
// =============================================================================
// getProfileById — Busca um perfil pelo ID do usuário
// =============================================================================
// Útil para carregar os dados do usuário logado ou visualizar o perfil de outro.
//
// @param {string} userId — UUID do usuário (mesmo ID do auth.users)
// @returns {object|null} — Objeto do perfil ou null se não encontrado
// =============================================================================
export async function getProfileById(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single(); // Retorna um objeto único em vez de um array
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getProfileByUsername — Busca um perfil pelo nome de usuário
// =============================================================================
// Útil para páginas de perfil públicas acessadas via URL (ex: /perfil/nomeUsuario).
//
// @param {string} username — Nome de usuário único
// @returns {object|null} — Objeto do perfil ou null se não encontrado
// =============================================================================
export async function getProfileByUsername(username) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getAllProfiles — Lista todos os perfis cadastrados
// =============================================================================
// Use com cautela em produção: pode retornar muitos registros.
// Considere adicionar paginação para grandes volumes de dados.
//
// @returns {Array} — Lista de perfis
// =============================================================================
export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('username', { ascending: true }); // Ordena alfabeticamente por username
 
  return handleResponse(data, error);
}
 
// =============================================================================
// createProfile — Cria um novo perfil para um usuário autenticado
// =============================================================================
// Normalmente chamado logo após o registro do usuário via auth.signUp().
// O `id` deve ser o mesmo UUID gerado pelo auth.users do Supabase.
//
// VERIFICAÇÕES:
//   - `id` é obrigatório (deve existir em auth.users)
//   - `username` deve ser único (verificado antes do insert para mensagem clara)
//
// @param {object} profileData — { id, username, avatar_url }
// @returns {object} — Perfil criado
// =============================================================================
export async function createProfile({ id, username, avatar_url }) {
  // Valida campos obrigatórios antes de enviar ao banco
  if (!id) throw new Error('O campo "id" é obrigatório para criar um perfil.');
 
  // Verifica se o username já está em uso (evita erro genérico do banco)
  if (username) {
    const isUsernameTaken = await checkUsernameExists(username);
    if (isUsernameTaken) {
      throw new Error(`O username "${username}" já está em uso. Escolha outro.`);
    }
  }
 
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id, username, avatar_url }])
    .select() // Retorna o registro recém-criado
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// updateProfile — Atualiza os dados de um perfil existente
// =============================================================================
// Permite alterar username e/ou avatar_url de um usuário.
//
// VERIFICAÇÕES:
//   - Se o username for alterado, verifica se o novo já está em uso
//
// @param {string} userId       — UUID do usuário dono do perfil
// @param {object} updatedData  — Campos a atualizar: { username?, avatar_url? }
// @returns {object} — Perfil atualizado
// =============================================================================
export async function updateProfile(userId, updatedData) {
  // Se está tentando mudar o username, verifica disponibilidade
  if (updatedData.username) {
    const isUsernameTaken = await checkUsernameExists(updatedData.username, userId);
    if (isUsernameTaken) {
      throw new Error(
        `O username "${updatedData.username}" já está em uso. Escolha outro.`
      );
    }
  }
 
  const { data, error } = await supabase
    .from('profiles')
    .update(updatedData)
    .eq('id', userId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// deleteProfile — Remove um perfil do banco de dados
// =============================================================================
// ATENÇÃO: Por causa do `on delete cascade` no banco, deletar o registro em
// auth.users (via supabase.auth.admin.deleteUser) é o recomendado.
// Esta função deleta apenas o perfil na tabela `profiles`.
//
// @param {string} userId — UUID do usuário cujo perfil será deletado
// @returns {object} — Perfil deletado
// =============================================================================
export async function deleteProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// checkUsernameExists — Verifica se um username já está cadastrado
// =============================================================================
// Função auxiliar (não exportada diretamente) usada pelos métodos de create e update.
// Aceita um `excludeUserId` para ignorar o próprio usuário na verificação de update.
//
// @param {string} username      — Username a verificar
// @param {string} excludeUserId — (opcional) ID do usuário a ignorar na busca
// @returns {boolean} — true se o username já existe, false se está disponível
// =============================================================================
async function checkUsernameExists(username, excludeUserId = null) {
  let query = supabase
    .from('profiles')
    .select('id')
    .eq('username', username);
 
  // Se for um update, ignora o próprio usuário na verificação
  if (excludeUserId) {
    query = query.neq('id', excludeUserId);
  }
 
  const { data, error } = await query;
 
  if (error) throw new Error(error.message);
 
  // Retorna true se encontrou algum registro com esse username
  return data && data.length > 0;
}