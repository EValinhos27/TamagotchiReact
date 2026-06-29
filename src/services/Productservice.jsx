// =============================================================================
// productService.jsx — Operações CRUD para a tabela `products`
// =============================================================================
// A tabela `products` armazena Tamagotchis e Acessórios disponíveis na loja.
//
// ESTRUTURA DA TABELA:
//   id          uuid (PK, gerado automaticamente)
//   name        text (obrigatório)
//   description text
//   price       numeric(10,2) (obrigatório)
//   image_url   text
//   type        text — APENAS 'tamagotchi' ou 'accessory' (restrição do banco)
//
// COMO USAR:
//   import * as productService from './productService';
//   const products = await productService.getAllProducts();
//   const tamagotchis = await productService.getProductsByType('tamagotchi');
// =============================================================================
 
import { supabase, handleResponse } from './api';
 
// Valores válidos para o campo `type` — espelha o CHECK do banco de dados
// Centralizado aqui para fácil manutenção: se o banco mudar, mude aqui também
const VALID_PRODUCT_TYPES = ['tamagotchi', 'accessory'];
 
// =============================================================================
// getAllProducts — Lista todos os produtos cadastrados
// =============================================================================
// Retorna todos os produtos ordenados pelo nome.
//
// @returns {Array} — Lista de produtos
// =============================================================================
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getProductById — Busca um produto pelo seu ID
// =============================================================================
// @param {string} productId — UUID do produto
// @returns {object|null} — Objeto do produto ou null se não encontrado
// =============================================================================
export async function getProductById(productId) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getProductsByType — Lista produtos filtrando por tipo
// =============================================================================
// Use para separar a exibição de Tamagotchis e Acessórios em abas distintas,
// por exemplo.
//
// VERIFICAÇÃO:
//   - O `type` informado deve ser 'tamagotchi' ou 'accessory'
//
// @param {string} type — 'tamagotchi' ou 'accessory'
// @returns {Array} — Lista de produtos do tipo informado
// =============================================================================
export async function getProductsByType(type) {
  validateProductType(type); // Lança erro se o tipo for inválido
 
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', type)
    .order('name', { ascending: true });
 
  return handleResponse(data, error);
}
 
// =============================================================================
// createProduct — Cria um novo produto no catálogo
// =============================================================================
// VERIFICAÇÕES:
//   - `name` é obrigatório
//   - `price` é obrigatório e deve ser um número positivo
//   - `type` deve ser 'tamagotchi' ou 'accessory'
//
// @param {object} productData — { name, description?, price, image_url?, type }
// @returns {object} — Produto criado
// =============================================================================
export async function createProduct({ name, description, price, image_url, type, color }) {
  // Validação de campos obrigatórios
  if (!name || name.trim() === '') {
    throw new Error('O campo "name" é obrigatório para criar um produto.');
  }
 
  if (price === undefined || price === null) {
    throw new Error('O campo "price" é obrigatório para criar um produto.');
  }
 
  if (isNaN(price) || Number(price) < 0) {
    throw new Error('O "price" deve ser um número positivo.');
  }
 
  // Valida o tipo do produto antes de enviar ao banco
  validateProductType(type);
 
  const { data, error } = await supabase
    .from('products')
    .insert([{ name: name.trim(), description, price: Number(price), image_url, type, color }])
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// updateProduct — Atualiza os dados de um produto existente
// =============================================================================
// Todos os campos são opcionais: informe apenas o que deseja alterar.
//
// VERIFICAÇÕES:
//   - Se `price` for informado, deve ser um número positivo
//   - Se `type` for informado, deve ser 'tamagotchi' ou 'accessory'
//
// @param {string} productId   — UUID do produto a atualizar
// @param {object} updatedData — Campos a atualizar (parcial)
// @returns {object} — Produto atualizado
// =============================================================================
export async function updateProduct(productId, updatedData) {
  // Valida price se estiver sendo atualizado
  if (updatedData.price !== undefined) {
    if (isNaN(updatedData.price) || Number(updatedData.price) < 0) {
      throw new Error('O "price" deve ser um número positivo.');
    }
    updatedData.price = Number(updatedData.price);
  }
 
  // Valida type se estiver sendo atualizado
  if (updatedData.type !== undefined) {
    validateProductType(updatedData.type);
  }
 
  const { data, error } = await supabase
    .from('products')
    .update(updatedData)
    .eq('id', productId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// deleteProduct — Remove um produto do catálogo
// =============================================================================
// ATENÇÃO: Produtos vinculados a order_items ou user_tamagotchis podem causar
// erro de integridade referencial. Verifique antes de deletar ou garanta que
// as constraints do banco estejam configuradas para lidar com isso.
//
// @param {string} productId — UUID do produto a deletar
// @returns {object} — Produto deletado
// =============================================================================
export async function deleteProduct(productId) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// validateProductType — Valida se o tipo de produto é permitido
// =============================================================================
// Função auxiliar interna: lança erro se o tipo não for válido.
// Isso evita enviar dados incorretos ao banco e dá uma mensagem clara ao dev.
//
// @param {string} type — Tipo a validar
// =============================================================================
function validateProductType(type) {
  if (!type || !VALID_PRODUCT_TYPES.includes(type)) {
    throw new Error(
      `Tipo de produto inválido: "${type}". ` +
      `Os valores aceitos são: ${VALID_PRODUCT_TYPES.join(', ')}.`
    );
  }
}