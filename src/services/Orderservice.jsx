// =============================================================================
// orderService.jsx — Operações CRUD para as tabelas `orders` e `order_items`
// =============================================================================
// Gerencia os pedidos dos usuários e seus itens. Um pedido (order) pode conter
// múltiplos itens (order_items), cada um referenciando um produto e quantidade.
//
// ESTRUTURA DAS TABELAS:
//
//   orders:
//     id          uuid (PK)
//     user_id     uuid (FK → profiles.id)
//     total       numeric(10,2)
//     created_at  timestamp
//
//   order_items:
//     id                uuid (PK)
//     order_id          uuid (FK → orders.id)
//     product_id        uuid (FK → products.id)
//     quantity          integer (padrão: 1)
//     price_at_purchase numeric(10,2) — preço no momento da compra (não muda!)
//
// COMO USAR:
//   import * as orderService from './orderService';
//   const orders = await orderService.getOrdersByUser('uuid-do-usuario');
//   const newOrder = await orderService.createOrderWithItems('uuid', items, total);
// =============================================================================
 
import { supabase, handleResponse } from './api';
 
// =============================================================================
// getAllOrders — Lista todos os pedidos (uso administrativo)
// =============================================================================
// Retorna todos os pedidos com os dados do perfil do usuário embutidos.
// Use apenas em painéis administrativos — não exiba para usuários comuns.
//
// @returns {Array} — Lista de pedidos com dados do usuário
// =============================================================================
export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles (id, username, avatar_url)
    `)
    .order('created_at', { ascending: false }); // Mais recentes primeiro
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getOrdersByUser — Lista todos os pedidos de um usuário específico
// =============================================================================
// Ideal para a página "Meus Pedidos" do usuário logado.
//
// @param {string} userId — UUID do usuário
// @returns {Array} — Lista de pedidos do usuário, do mais recente ao mais antigo
// =============================================================================
export async function getOrdersByUser(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
 
  return handleResponse(data, error);
}
 
// =============================================================================
// getOrderById — Busca um pedido pelo ID com todos os seus itens
// =============================================================================
// Retorna o pedido e todos os seus itens, incluindo os dados de cada produto.
// Ideal para a página de detalhes de um pedido.
//
// @param {string} orderId — UUID do pedido
// @returns {object} — Pedido com array de itens e dados de produto
// =============================================================================
export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        quantity,
        price_at_purchase,
        products (id, name, image_url, type)
      )
    `)
    .eq('id', orderId)
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// createOrderWithItems — Cria um pedido completo com seus itens em uma operação
// =============================================================================
// Esta é a função principal para finalizar uma compra. Ela:
//   1. Cria o registro do pedido (orders)
//   2. Cria todos os itens vinculados (order_items)
//
// VERIFICAÇÕES:
//   - `userId` e `total` são obrigatórios
//   - `items` deve ser um array não-vazio
//   - Cada item deve ter product_id, quantity e price_at_purchase válidos
//
// @param {string} userId — UUID do usuário que está comprando
// @param {Array}  items  — Array de itens: [{ product_id, quantity, price_at_purchase }]
// @param {number} total  — Valor total do pedido
// @returns {object} — Pedido criado (sem os itens; busque com getOrderById se precisar)
// =============================================================================
export async function createOrderWithItems(userId, items, total) {
  // Validações básicas antes de qualquer operação no banco
  if (!userId) throw new Error('O campo "userId" é obrigatório para criar um pedido.');
  if (!total || isNaN(total) || Number(total) < 0) {
    throw new Error('O campo "total" deve ser um número positivo.');
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Um pedido deve conter ao menos um item.');
  }
 
  // Valida cada item do carrinho individualmente
  items.forEach((item, index) => {
    if (!item.product_id) {
      throw new Error(`Item ${index + 1}: "product_id" é obrigatório.`);
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error(`Item ${index + 1}: "quantity" deve ser maior que zero.`);
    }
    if (item.price_at_purchase === undefined || item.price_at_purchase < 0) {
      throw new Error(`Item ${index + 1}: "price_at_purchase" deve ser um valor válido.`);
    }
  });
 
  // PASSO 1: Cria o pedido principal
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total: Number(total) }])
    .select()
    .single();
 
  if (orderError) throw new Error(`Erro ao criar pedido: ${orderError.message}`);
 
  // PASSO 2: Prepara os itens com o ID do pedido recém-criado
  const orderItems = items.map((item) => ({
    order_id: newOrder.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: Number(item.price_at_purchase),
  }));
 
  // PASSO 3: Insere todos os itens de uma vez (mais eficiente que um por um)
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
 
  if (itemsError) {
    // Se falhar na inserção dos itens, o pedido ficaria "vazio" no banco.
    // Idealmente, use uma Supabase Function (RPC) para transações atômicas.
    throw new Error(`Erro ao criar itens do pedido: ${itemsError.message}`);
  }
 
  return newOrder;
}
 
// =============================================================================
// updateOrderTotal — Atualiza o total de um pedido existente
// =============================================================================
// Use com cuidado: normalmente o total não deve ser editado após criado.
// Útil para casos de ajuste administrativo.
//
// @param {string} orderId  — UUID do pedido
// @param {number} newTotal — Novo valor total
// @returns {object} — Pedido atualizado
// =============================================================================
export async function updateOrderTotal(orderId, newTotal) {
  if (isNaN(newTotal) || Number(newTotal) < 0) {
    throw new Error('O novo total deve ser um número positivo.');
  }
 
  const { data, error } = await supabase
    .from('orders')
    .update({ total: Number(newTotal) })
    .eq('id', orderId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// deleteOrder — Remove um pedido (e seus itens via cascade)
// =============================================================================
// Por causa do `on delete cascade` no banco, os order_items são deletados
// automaticamente quando o pedido pai é removido.
//
// @param {string} orderId — UUID do pedido a deletar
// @returns {object} — Pedido deletado
// =============================================================================
export async function deleteOrder(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// FUNÇÕES PARA ORDER_ITEMS — Manipulação individual de itens de um pedido
// =============================================================================
 
// =============================================================================
// getOrderItems — Lista todos os itens de um pedido específico
// =============================================================================
// @param {string} orderId — UUID do pedido
// @returns {Array} — Lista de itens com dados do produto
// =============================================================================
export async function getOrderItems(orderId) {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      products (id, name, image_url, type)
    `)
    .eq('order_id', orderId);
 
  return handleResponse(data, error);
}
 
// =============================================================================
// addOrderItem — Adiciona um item a um pedido existente
// =============================================================================
// Use para casos de edição de pedido antes de sua finalização.
//
// @param {object} item — { order_id, product_id, quantity, price_at_purchase }
// @returns {object} — Item criado
// =============================================================================
export async function addOrderItem({ order_id, product_id, quantity, price_at_purchase }) {
  if (!order_id || !product_id) {
    throw new Error('"order_id" e "product_id" são obrigatórios.');
  }
  if (!quantity || quantity < 1) {
    throw new Error('"quantity" deve ser maior que zero.');
  }
  if (price_at_purchase === undefined || price_at_purchase < 0) {
    throw new Error('"price_at_purchase" deve ser um valor válido.');
  }
 
  const { data, error } = await supabase
    .from('order_items')
    .insert([{ order_id, product_id, quantity, price_at_purchase: Number(price_at_purchase) }])
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// updateOrderItem — Atualiza a quantidade de um item no pedido
// =============================================================================
// @param {string} itemId      — UUID do item (order_items.id)
// @param {number} newQuantity — Nova quantidade
// @returns {object} — Item atualizado
// =============================================================================
export async function updateOrderItem(itemId, newQuantity) {
  if (!newQuantity || newQuantity < 1) {
    throw new Error('"quantity" deve ser maior que zero.');
  }
 
  const { data, error } = await supabase
    .from('order_items')
    .update({ quantity: newQuantity })
    .eq('id', itemId)
    .select()
    .single();
 
  return handleResponse(data, error);
}
 
// =============================================================================
// deleteOrderItem — Remove um item de um pedido
// =============================================================================
// @param {string} itemId — UUID do item a remover
// @returns {object} — Item removido
// =============================================================================
export async function deleteOrderItem(itemId) {
  const { data, error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', itemId)
    .select()
    .single();
 
  return handleResponse(data, error);
}