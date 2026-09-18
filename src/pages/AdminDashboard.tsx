import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Package,
  ShoppingCart,
  Users,
  Webhook,
  Settings,
  TrendingUp,
  DollarSign,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ExternalLink,
  Code,
  Activity,
  Zap,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { DEMO_USERS } from '../data/mockData';
import { Order, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    products,
    leads,
    webhookLogs,
    auditLogs,
    updateOrderStatus,
    addNewProduct,
    testIntegration,
    showNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'metricas' | 'pedidos' | 'produtos' | 'usuarios' | 'integracoes' | 'configuracoes'>('metricas');

  // Product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState<'solar' | 'conforto' | 'eletro' | 'seguranca' | 'eletronicos'>('solar');
  const [prodPrice, setProdPrice] = useState('4500');
  const [prodStock, setProdStock] = useState('10');
  const [prodDesc, setProdDesc] = useState('');

  // General Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelado')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalLeadsCount = leads.length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodSku) {
      showNotification('Nome e SKU são obrigatórios.', 'error');
      return;
    }

    const catMap = {
      solar: 'Energia Solar',
      conforto: 'Conforto & Colchões',
      eletro: 'Eletrodomésticos',
      seguranca: 'Segurança Eletrônica',
      eletronicos: 'Eletrônicos & Automação',
    };

    addNewProduct({
      sku: prodSku,
      name: prodName,
      category: prodCategory,
      categoryName: catMap[prodCategory],
      price: Number(prodPrice) || 1000,
      stock: Number(prodStock) || 5,
      description: prodDesc || 'Produto de alta tecnologia com garantia oficial Zion.',
      features: ['Garantia oficial de fábrica', 'Pronta entrega', 'Assistência técnica'],
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80'],
      rating: 5.0,
      reviewsCount: 1,
    });

    setIsProductModalOpen(false);
    setProdName('');
    setProdSku('');
  };

  return (
    <div className="py-10 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Painel de Controle Central (Super Admin & Engenharia)</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Administração Geral Zion Confort Line
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Operador conectado: <strong>{currentUser?.name || 'Administrador'}</strong> ({currentUser?.email || 'admin@demo.local'}) • Nível: <strong>ADMIN</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => testIntegration('int_1')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Sincronizar ERP</span>
            </button>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 my-8 overflow-x-auto pb-2 scrollbar-none text-xs font-bold border-b border-slate-800">
          <button
            onClick={() => setActiveTab('metricas')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'metricas'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Métricas Gerais</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'pedidos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Gestão de Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('produtos')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'produtos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestão de Catálogo & Estoque ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('usuarios')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'usuarios'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Usuários & RBAC</span>
          </button>

          <button
            onClick={() => setActiveTab('integracoes')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'integracoes'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Webhook className="w-4 h-4" />
            <span>Central de APIs & Webhooks</span>
          </button>
        </div>

        {/* Tab 1: Metricas */}
        {activeTab === 'metricas' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="text-xs text-slate-400 flex items-center justify-between mb-2">
                  <span>Faturamento em Vendas</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-emerald-400">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">E-commerce + Contratos Solares</div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="text-xs text-slate-400 flex items-center justify-between mb-2">
                  <span>Volume de Pedidos</span>
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Ticket médio: {formatCurrency(totalRevenue / (totalOrdersCount || 1))}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="text-xs text-slate-400 flex items-center justify-between mb-2">
                  <span>Leads no Funil CRM</span>
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {totalLeadsCount}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Taxa de conversão: ~28%</div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="text-xs text-slate-400 flex items-center justify-between mb-2">
                  <span>Status dos Serviços de Nuvem</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-emerald-400 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    100% Online
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Inversores, Gateway & Webhooks</div>
                </div>
              </div>
            </div>

            {/* Audit Log Overview */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <h3 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Registro de Auditoria do Sistema (Audit Log)
              </h3>
              <div className="space-y-2 text-xs">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono text-[11px]">{log.timestamp}</span>
                      <strong className="text-amber-400">{log.action}</strong>
                      <span className="text-slate-300">• {log.details}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {log.user}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6">
              <h3 className="font-display text-base font-bold text-white mb-4">
                Todos os Pedidos Realizados
              </h3>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">Pedido #{order.id}</strong>
                        <span className="text-slate-400">• {order.createdAt}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-slate-300">
                        Cliente: <strong>{order.customerName}</strong> ({order.customerEmail} • {order.customerPhone})
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Itens: {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end">
                      <div className="text-right">
                        <div className="font-bold text-emerald-400 text-sm">{formatCurrency(order.totalAmount)}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{order.paymentMethod}</div>
                      </div>

                      {/* Status select */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Em Preparação">Em Preparação</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Produtos */}
        {activeTab === 'produtos' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-bold text-white">
                  Catálogo de Produtos & Estoque Central
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Produto</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Produto</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-mono text-amber-400">{p.sku}</td>
                        <td className="p-3 font-bold text-white">{p.name}</td>
                        <td className="p-3 text-slate-400">{p.categoryName}</td>
                        <td className="p-3 font-semibold text-emerald-400">{formatCurrency(p.price)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            p.stock > 5 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                          }`}>
                            {p.stock} un.
                          </span>
                        </td>
                        <td className="p-3 text-right text-emerald-400 font-bold">Ativo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Usuarios & RBAC */}
        {activeTab === 'usuarios' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6">
              <h3 className="font-display text-base font-bold text-white mb-2">
                Controle de Acesso Baseado em Papéis (RBAC)
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Gerencie permissões entre Administradores, Consultores Comerciais e Clientes com telemetria ativa.
              </p>

              <div className="space-y-3">
                {Object.values(DEMO_USERS).map((usr) => (
                  <div
                    key={usr.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{usr.name}</div>
                      <div className="text-slate-400">{usr.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        usr.role === 'ADMIN'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : usr.role === 'VENDEDOR'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        Papel: {usr.role}
                      </span>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ativo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Central de APIs & Webhooks */}
        {activeTab === 'integracoes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 text-amber-400" />
                    Central de Integrações, APIs & Webhooks
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Disparo de eventos em tempo real para ERPs, Gateways de pagamento e inversores solares.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => testIntegration('int_3')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
                  >
                    Simular Telemetria
                  </button>
                  <button
                    onClick={() => testIntegration('int_2')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Testar Disparo de Pedido
                  </button>
                </div>
              </div>

              {/* Webhook Log List */}
              <div className="space-y-3">
                {webhookLogs.map((wh) => (
                  <div
                    key={wh.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[10px]">
                          POST
                        </span>
                        <span className="text-white font-semibold">{wh.origin}</span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">
                          HTTP {wh.responseCode}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Evento: <strong>{wh.event}</strong> • Timestamp: {wh.timestamp}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 max-w-md truncate">
                      Payload: {wh.payloadPreview}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal: New Product */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setIsProductModalOpen(false)}
            />
            <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-150 text-white">
              <h3 className="font-display font-bold text-lg text-white mb-1">
                Adicionar Novo Produto ao Catálogo
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Cadastre o equipamento com SKU, especificações e valor unitário.
              </p>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="Ex: Painel Solar 600W Bifacial Canadian"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Código SKU *</label>
                    <input
                      type="text"
                      required
                      value={prodSku}
                      onChange={(e) => setProdSku(e.target.value)}
                      placeholder="ZCL-SOL-600W"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Categoria</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="solar">Energia Solar</option>
                      <option value="conforto">Conforto & Colchões</option>
                      <option value="eletro">Eletrodomésticos</option>
                      <option value="seguranca">Segurança Eletrônica</option>
                      <option value="eletronicos">Eletrônicos & Automação</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Preço Unitário (R$)</label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Estoque Inicial</label>
                    <input
                      type="number"
                      required
                      value={prodStock}
                      onChange={(e) => setProdStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Descrição Comercial</label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Destaques do produto, potência, eficiência e garantia..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                  >
                    Salvar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
