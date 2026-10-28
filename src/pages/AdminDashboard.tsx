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
  Palette,
  Image,
  Upload,
  Sliders,
  Sun,
  Moon,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Check,
  Trash2,
  ArrowUpRight,
  KeyRound,
  Lock,
  LogOut,
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
    brandSettings,
    updateBrandSettings,
    resetBrandSettings,
    theme,
    toggleTheme,
    navigateTo,
    adminCredentials,
    updateAdminCredentials,
    resetAdminCredentials,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'metricas' | 'pedidos' | 'produtos' | 'usuarios' | 'integracoes' | 'configuracoes'>('metricas');

  // Admin Credentials form state
  const [newAdminEmail, setNewAdminEmail] = useState(adminCredentials.email);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [credSuccessMsg, setCredSuccessMsg] = useState('');
  const [credErrorMsg, setCredErrorMsg] = useState('');

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredSuccessMsg('');
    setCredErrorMsg('');

    if (!newAdminEmail.trim() || !newAdminEmail.includes('@')) {
      setCredErrorMsg('Por favor, informe um e-mail válido.');
      return;
    }

    if (!newAdminPassword) {
      setCredErrorMsg('Por favor, digite a nova senha.');
      return;
    }

    if (newAdminPassword.length < 4) {
      setCredErrorMsg('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    if (newAdminPassword !== confirmAdminPassword) {
      setCredErrorMsg('A confirmação não coincide com a nova senha digitada.');
      return;
    }

    const res = updateAdminCredentials(newAdminEmail, newAdminPassword);
    if (res.success) {
      setCredSuccessMsg(`Credenciais salvas com sucesso! Seu novo login é: ${newAdminEmail.trim()}`);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    } else {
      setCredErrorMsg(res.message || 'Erro ao atualizar credenciais.');
    }
  };

  const handleResetToDefaultCreds = () => {
    resetAdminCredentials();
    setNewAdminEmail('admin@admin.com');
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setCredSuccessMsg('Credenciais restauradas para o padrão: admin@admin.com / admin@admin.com');
  };

  // Sample Demo Logos for instant 1-click testing
  const SAMPLE_COLORED_LOGO =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none"><rect width="52" height="52" rx="12" y="4" fill="%23f59e0b"/><path d="M26 14v24M14 26h24M18 18l16 16M34 18L18 34" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/><text x="68" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="22" fill="%230f172a">ZION</text><text x="135" y="32" font-family="system-ui,sans-serif" font-weight="300" font-size="22" fill="%23d97706">CONFORT</text><text x="70" y="46" font-family="system-ui,sans-serif" font-weight="700" font-size="9" fill="%2364748b" letter-spacing="3">SOLAR &amp; TECH</text></svg>';

  const SAMPLE_WHITE_LOGO =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none"><rect width="52" height="52" rx="12" y="4" fill="%23f59e0b"/><path d="M26 14v24M14 26h24M18 18l16 16M34 18L18 34" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/><text x="68" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="22" fill="%23ffffff">ZION</text><text x="135" y="32" font-family="system-ui,sans-serif" font-weight="300" font-size="22" fill="%23fbbf24">CONFORT</text><text x="70" y="46" font-family="system-ui,sans-serif" font-weight="700" font-size="9" fill="%2394a3b8" letter-spacing="3">SOLAR &amp; TECH</text></svg>';

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'header-colored' | 'header-white' | 'footer-colored' | 'footer-white'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification('A imagem deve ter no máximo 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      if (target === 'header-colored') {
        updateBrandSettings((prev) => ({
          ...prev,
          headerLogo: { ...prev.headerLogo, coloredUrl: dataUrl },
        }));
      } else if (target === 'header-white') {
        updateBrandSettings((prev) => ({
          ...prev,
          headerLogo: { ...prev.headerLogo, whiteUrl: dataUrl },
        }));
      } else if (target === 'footer-colored') {
        updateBrandSettings((prev) => ({
          ...prev,
          footerLogo: { ...prev.footerLogo, coloredUrl: dataUrl, useCustom: true },
        }));
      } else if (target === 'footer-white') {
        updateBrandSettings((prev) => ({
          ...prev,
          footerLogo: { ...prev.footerLogo, whiteUrl: dataUrl, useCustom: true },
        }));
      }
      showNotification('Logotipo carregado com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
  };

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
              Operador conectado: <strong>{currentUser?.name || 'Administrador Master'}</strong> ({currentUser?.email || adminCredentials.email}) • Nível: <strong>ADMIN</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('usuarios')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Acessar painel de alteração de login e senha"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Segurança & Senha</span>
            </button>
            <button
              onClick={() => testIntegration('int_1')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Sincronizar ERP</span>
            </button>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-800 flex items-center gap-1.5 transition-colors shadow-sm"
              title="Encerrar sessão de administrador"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sair</span>
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

          <button
            id="tab-brand-settings"
            onClick={() => setActiveTab('configuracoes')}
            className={`pb-3 px-4 transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'configuracoes'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Logotipos & Identidade</span>
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

        {/* Tab 4: Usuarios & RBAC + Credenciais de Administrador */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Super Admin Credentials Editor */}
            <div className="bg-slate-950 rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <span>Alteração de Login & Senha do Administrador</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-slate-950">
                        Acesso Ativo
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Altere o e-mail de login e a senha deste painel. Suas credenciais serão salvas e exigidas no próximo login.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetToDefaultCreds}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-amber-500/50 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
                  title="Restaurar credenciais padrão: admin@admin.com / admin@admin.com"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restaurar Padrão (admin@admin.com)</span>
                </button>
              </div>

              {/* Current Credential Status Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">E-mail de Login Atual:</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">
                    {adminCredentials.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Status da Senha:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Protegida & Persistida no Navegador
                  </span>
                </div>
              </div>

              {/* Feedback Notifications */}
              {credSuccessMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{credSuccessMsg}</span>
                </div>
              )}

              {credErrorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{credErrorMsg}</span>
                </div>
              )}

              {/* Change Credentials Form */}
              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">
                      Novo E-mail de Login
                    </label>
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      required
                      placeholder="admin@admin.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Este será o seu usuário para entrar no painel.
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-slate-300">Nova Senha</label>
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
                      >
                        {showAdminPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showAdminPassword ? 'Ocultar' : 'Exibir'}</span>
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showAdminPassword ? 'text' : 'password'}
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        required
                        placeholder="Mínimo 4 caracteres"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 outline-none transition-all font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Recomendamos combinar letras, números ou caracteres especiais.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type={showAdminPassword ? 'text' : 'password'}
                      value={confirmAdminPassword}
                      onChange={(e) => setConfirmAdminPassword(e.target.value)}
                      required
                      placeholder="Repita a nova senha"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 outline-none transition-all font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Digite exatamente a mesma senha para validação.
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400">
                    Ao salvar, as alterações passam a valer imediatamente para este navegador.
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-900/40 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Salvar Novas Credenciais de Acesso</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Status of Public and Locked Portals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span>Portal do Cliente</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    Bloqueado (Aguardando Senhas)
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  A área do cliente está bloqueada com tela de aviso seguro. Os clientes receberão suas senhas de acesso individuais após a fase de liberação técnica.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-500" />
                    <span>Painel Administrativo</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Ativo com Senha Exclusiva
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Protegido por login e senha. Login inicial <strong>admin@admin.com</strong> (alterável no formulário acima a qualquer momento).
                </p>
              </div>
            </div>

            {/* List of system roles */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6">
              <h3 className="font-display text-base font-bold text-white mb-2">
                Controle de Acesso Baseado em Papéis (RBAC)
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Permissões globais entre Administradores, Consultores Comerciais e Clientes da plataforma Zion.
              </p>

              <div className="space-y-3">
                {Object.values(DEMO_USERS).map((usr) => (
                  <div
                    key={usr.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{usr.name}</div>
                      <div className="text-slate-400">{usr.role === 'ADMIN' ? adminCredentials.email : usr.email}</div>
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
                        {usr.role === 'ADMIN' ? 'Ativo (Senha Exclusiva)' : 'Bloqueado (Em Configuração)'}
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

        {/* Tab 6: Gestão de Logotipos & Identidade Visual */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Banner / Actions */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  <Palette className="w-4 h-4" />
                  <span>Personalização & Branding White-Label</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-white">
                  Gestão de Logotipos (Cabeçalho & Rodapé)
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Defina as versões <strong>colorida</strong> (para fundos claros) e <strong>branca</strong> (para temas escuros/noturnos), regule a altura exata em pixels com o seletor de tamanho e visualize o resultado instantaneamente.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 shadow-sm transition-all"
                  title="Alternar tema de toda a aplicação para verificar o contraste dos logos"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Testar Tema Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-300" />
                      <span>Testar Tema Escuro</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetBrandSettings();
                    showNotification('Logotipos restaurados para o padrão original Zion Confort.', 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Restaurar Padrão</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showNotification('Configurações de logotipos salvas e aplicadas em todo o site!', 'success');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </div>

            {/* Main Content Grid: Settings on Left, Live Preview on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Section 1: Logotipo do Cabeçalho (Header) */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white">
                          Logotipo do Cabeçalho (Header)
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Exibido na barra de navegação superior fixa do portal
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                      Header
                    </span>
                  </div>

                  {/* 1.1 Logo Colorida (Padrão para Tema Claro) */}
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800/70">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span>Logo Colorida (Tema Claro / Fundo Branco)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, coloredUrl: SAMPLE_COLORED_LOGO },
                          }));
                          showNotification('Logo de exemplo colorida aplicada!', 'success');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Usar Exemplo Demo</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={brandSettings.headerLogo.coloredUrl}
                        onChange={(e) =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, coloredUrl: e.target.value },
                          }))
                        }
                        placeholder="Cole a URL da logo colorida (ou envie o arquivo ao lado)..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'header-colored')}
                        />
                      </label>
                      {brandSettings.headerLogo.coloredUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            updateBrandSettings((prev) => ({
                              ...prev,
                              headerLogo: { ...prev.headerLogo, coloredUrl: '' },
                            }))
                          }
                          className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                          title="Remover logo colorida"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Mini Preview Box */}
                    {brandSettings.headerLogo.coloredUrl && (
                      <div className="p-3 rounded-xl bg-white flex items-center justify-between border border-slate-200">
                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                          Prévia no Fundo Branco:
                        </span>
                        <img
                          src={brandSettings.headerLogo.coloredUrl}
                          alt="Prévia colorida"
                          style={{ height: `${Math.min(36, brandSettings.headerLogo.heightPx)}px` }}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* 1.2 Logo Branca / Clara (Para Tema Escuro) */}
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800/70">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400"></span>
                        <span>Logo Branca / Clara (Tema Escuro / Fundo Noturno)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, whiteUrl: SAMPLE_WHITE_LOGO },
                          }));
                          showNotification('Logo de exemplo branca aplicada!', 'success');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Usar Exemplo Demo</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={brandSettings.headerLogo.whiteUrl}
                        onChange={(e) =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, whiteUrl: e.target.value },
                          }))
                        }
                        placeholder="Cole a URL da logo branca (ou envie o arquivo ao lado)..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'header-white')}
                        />
                      </label>
                      {brandSettings.headerLogo.whiteUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            updateBrandSettings((prev) => ({
                              ...prev,
                              headerLogo: { ...prev.headerLogo, whiteUrl: '' },
                            }))
                          }
                          className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                          title="Remover logo branca"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Mini Preview Box */}
                    {brandSettings.headerLogo.whiteUrl && (
                      <div className="p-3 rounded-xl bg-slate-950 flex items-center justify-between border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Prévia no Fundo Escuro:
                        </span>
                        <img
                          src={brandSettings.headerLogo.whiteUrl}
                          alt="Prévia branca"
                          style={{ height: `${Math.min(36, brandSettings.headerLogo.heightPx)}px` }}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* 1.3 Modo de Exibição / Alternância de Cores */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">
                      Regra de Exibição de Cores do Header
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, variantMode: 'auto' },
                          }))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          brandSettings.headerLogo.variantMode === 'auto'
                            ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-xs mb-1">
                          <span>Automático</span>
                          {brandSettings.headerLogo.variantMode === 'auto' && (
                            <Check className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight">
                          Colorida no tema claro e branca no tema escuro.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, variantMode: 'colored' },
                          }))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          brandSettings.headerLogo.variantMode === 'colored'
                            ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-xs mb-1">
                          <span>Sempre Colorida</span>
                          {brandSettings.headerLogo.variantMode === 'colored' && (
                            <Check className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight">
                          Força a logo colorida em qualquer tema.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, variantMode: 'white' },
                          }))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          brandSettings.headerLogo.variantMode === 'white'
                            ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-xs mb-1">
                          <span>Sempre Branca</span>
                          {brandSettings.headerLogo.variantMode === 'white' && (
                            <Check className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight">
                          Força a logo branca/clara em qualquer tema.
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 1.4 Seletor de Tamanho / Altura do Header */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-amber-400" />
                        <span>Seletor de Tamanho (Altura da Logo do Header)</span>
                      </label>
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold font-mono shadow-xs">
                        {brandSettings.headerLogo.heightPx} px
                      </span>
                    </div>

                    {/* Range Slider */}
                    <input
                      type="range"
                      min="24"
                      max="72"
                      step="2"
                      value={brandSettings.headerLogo.heightPx}
                      onChange={(e) =>
                        updateBrandSettings((prev) => ({
                          ...prev,
                          headerLogo: { ...prev.headerLogo, heightPx: Number(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                    />

                    {/* Presets buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-400 font-medium">Tamanhos Rápidos:</span>
                      {[
                        { label: 'Pequeno (32px)', val: 32 },
                        { label: 'Médio (44px - Padrão)', val: 44 },
                        { label: 'Grande (54px)', val: 54 },
                        { label: 'Extra Grande (68px)', val: 68 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() =>
                            updateBrandSettings((prev) => ({
                              ...prev,
                              headerLogo: { ...prev.headerLogo, heightPx: preset.val },
                            }))
                          }
                          className={`px-3 py-1 rounded-xl transition-all ${
                            brandSettings.headerLogo.heightPx === preset.val
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1.5 Toggle Texto da Marca */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={brandSettings.headerLogo.showBrandText}
                        onChange={(e) =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            headerLogo: { ...prev.headerLogo, showBrandText: e.target.checked },
                          }))
                        }
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200">
                          Exibir nome da marca &quot;ZION CONFORT Line Solutions&quot; ao lado da imagem
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Desmarque caso o arquivo do seu logotipo já contenha o nome e tipografia embutidos na imagem.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 2: Logotipo do Rodapé (Footer) */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white">
                          Logotipo do Rodapé (Footer)
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Exibido na base inferior de todas as páginas do site
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                      Footer
                    </span>
                  </div>

                  {/* Sync with Header Toggle */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={!brandSettings.footerLogo.useCustom}
                        onChange={(e) =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            footerLogo: { ...prev.footerLogo, useCustom: !e.target.checked },
                          }))
                        }
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200">
                          Sincronizar automaticamente com o Cabeçalho (Recomendado)
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Usa as mesmas logos configuradas no cabeçalho (utilizando a versão branca/clara no fundo escuro do rodapé).
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* If custom footer logo is active */}
                  {brandSettings.footerLogo.useCustom && (
                    <div className="space-y-4 pt-2 animate-in fade-in duration-150">
                      {/* Footer Logo Colorida */}
                      <div className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800/70">
                        <label className="text-xs font-bold text-slate-200">
                          Logo Colorida do Rodapé (Opcional)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={brandSettings.footerLogo.coloredUrl}
                            onChange={(e) =>
                              updateBrandSettings((prev) => ({
                                ...prev,
                                footerLogo: { ...prev.footerLogo, coloredUrl: e.target.value },
                              }))
                            }
                            placeholder="URL da logo colorida do rodapé..."
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'footer-colored')}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Footer Logo Branca */}
                      <div className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800/70">
                        <label className="text-xs font-bold text-slate-200">
                          Logo Branca do Rodapé (Recomendado para fundo escuro)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={brandSettings.footerLogo.whiteUrl}
                            onChange={(e) =>
                              updateBrandSettings((prev) => ({
                                ...prev,
                                footerLogo: { ...prev.footerLogo, whiteUrl: e.target.value },
                              }))
                            }
                            placeholder="URL da logo branca do rodapé..."
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                          />
                          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'footer-white')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seletor de Tamanho do Rodapé */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-amber-400" />
                        <span>Seletor de Tamanho (Altura da Logo do Rodapé)</span>
                      </label>
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold font-mono shadow-xs">
                        {brandSettings.footerLogo.heightPx} px
                      </span>
                    </div>

                    <input
                      type="range"
                      min="20"
                      max="64"
                      step="2"
                      value={brandSettings.footerLogo.heightPx}
                      onChange={(e) =>
                        updateBrandSettings((prev) => ({
                          ...prev,
                          footerLogo: { ...prev.footerLogo, heightPx: Number(e.target.value) },
                        }))
                      }
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                    />

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-400 font-medium">Tamanhos Rápidos:</span>
                      {[
                        { label: 'Pequeno (28px)', val: 28 },
                        { label: 'Médio (40px - Padrão)', val: 40 },
                        { label: 'Grande (52px)', val: 52 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() =>
                            updateBrandSettings((prev) => ({
                              ...prev,
                              footerLogo: { ...prev.footerLogo, heightPx: preset.val },
                            }))
                          }
                          className={`px-3 py-1 rounded-xl transition-all ${
                            brandSettings.footerLogo.heightPx === preset.val
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Texto no Rodapé */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={brandSettings.footerLogo.showBrandText}
                        onChange={(e) =>
                          updateBrandSettings((prev) => ({
                            ...prev,
                            footerLogo: { ...prev.footerLogo, showBrandText: e.target.checked },
                          }))
                        }
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-200">
                          Exibir nome da marca &quot;ZION CONFORT Line Solutions&quot; no rodapé
                        </span>
                        <p className="text-[11px] text-slate-400">
                          Se desmarcado, exibe somente a logo isolada no rodapé.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Simulator / Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="sticky top-24 space-y-6">
                  {/* Card: Live Simulator */}
                  <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-400" />
                        <h3 className="font-display font-bold text-sm text-white">
                          Pré-visualização em Tempo Real
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Ao Vivo
                      </span>
                    </div>

                    {/* Preview 1: Header - Light Mode */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-amber-500" />
                          <span>Topo / Header (Tema Claro)</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {brandSettings.headerLogo.heightPx}px
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md">
                        <div className="flex items-center justify-between">
                          {/* Logo simulation */}
                          <div className="flex items-center gap-2.5">
                            {(() => {
                              const logo =
                                brandSettings.headerLogo.variantMode === 'white'
                                  ? brandSettings.headerLogo.whiteUrl || brandSettings.headerLogo.coloredUrl
                                  : brandSettings.headerLogo.coloredUrl || brandSettings.headerLogo.whiteUrl;

                              if (logo) {
                                return (
                                  <img
                                    src={logo}
                                    alt="Prévia Header Claro"
                                    style={{ height: `${brandSettings.headerLogo.heightPx}px` }}
                                    className="object-contain max-w-[140px]"
                                  />
                                );
                              }

                              return (
                                <div
                                  style={{
                                    width: `${brandSettings.headerLogo.heightPx}px`,
                                    height: `${brandSettings.headerLogo.heightPx}px`,
                                  }}
                                  className="rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm"
                                >
                                  <Sun
                                    style={{
                                      width: `${Math.max(14, Math.round(brandSettings.headerLogo.heightPx * 0.58))}px`,
                                      height: `${Math.max(14, Math.round(brandSettings.headerLogo.heightPx * 0.58))}px`,
                                    }}
                                    className="text-slate-950"
                                  />
                                </div>
                              );
                            })()}

                            {brandSettings.headerLogo.showBrandText && (
                              <div>
                                <div className="text-slate-900 font-extrabold text-xs tracking-tight">
                                  ZION <span className="text-amber-500 font-light">CONFORT</span>
                                </div>
                                <div className="text-[7px] tracking-[0.2em] text-slate-500 font-bold uppercase">
                                  Line Solutions
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Mock Nav links */}
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
                            <span className="text-amber-600 font-bold">Início</span>
                            <span>•</span>
                            <span>Energia</span>
                            <span>•</span>
                            <span>Loja</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview 2: Header - Dark Mode */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Moon className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Topo / Header (Tema Escuro)</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {brandSettings.headerLogo.heightPx}px
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                          {/* Logo simulation */}
                          <div className="flex items-center gap-2.5">
                            {(() => {
                              const logo =
                                brandSettings.headerLogo.variantMode === 'colored'
                                  ? brandSettings.headerLogo.coloredUrl || brandSettings.headerLogo.whiteUrl
                                  : brandSettings.headerLogo.whiteUrl || brandSettings.headerLogo.coloredUrl;

                              if (logo) {
                                return (
                                  <img
                                    src={logo}
                                    alt="Prévia Header Escuro"
                                    style={{ height: `${brandSettings.headerLogo.heightPx}px` }}
                                    className="object-contain max-w-[140px]"
                                  />
                                );
                              }

                              return (
                                <div
                                  style={{
                                    width: `${brandSettings.headerLogo.heightPx}px`,
                                    height: `${brandSettings.headerLogo.heightPx}px`,
                                  }}
                                  className="rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm"
                                >
                                  <Sun
                                    style={{
                                      width: `${Math.max(14, Math.round(brandSettings.headerLogo.heightPx * 0.58))}px`,
                                      height: `${Math.max(14, Math.round(brandSettings.headerLogo.heightPx * 0.58))}px`,
                                    }}
                                    className="text-slate-950"
                                  />
                                </div>
                              );
                            })()}

                            {brandSettings.headerLogo.showBrandText && (
                              <div>
                                <div className="text-white font-extrabold text-xs tracking-tight">
                                  ZION <span className="text-amber-400 font-light">CONFORT</span>
                                </div>
                                <div className="text-[7px] tracking-[0.2em] text-slate-400 font-bold uppercase">
                                  Line Solutions
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Mock Nav links */}
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                            <span className="text-amber-400 font-bold">Início</span>
                            <span>•</span>
                            <span>Energia</span>
                            <span>•</span>
                            <span>Loja</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview 3: Footer */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Base / Rodapé (Fundo Escuro)</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {brandSettings.footerLogo.heightPx}px
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {(() => {
                              const footerLogoUrl = brandSettings.footerLogo.useCustom
                                ? (brandSettings.footerLogo.whiteUrl || brandSettings.footerLogo.coloredUrl)
                                : (brandSettings.headerLogo.whiteUrl || brandSettings.headerLogo.coloredUrl);

                              if (footerLogoUrl) {
                                return (
                                  <img
                                    src={footerLogoUrl}
                                    alt="Prévia Rodapé"
                                    style={{ height: `${brandSettings.footerLogo.heightPx}px` }}
                                    className="object-contain max-w-[140px]"
                                  />
                                );
                              }

                              return (
                                <div
                                  style={{
                                    width: `${brandSettings.footerLogo.heightPx}px`,
                                    height: `${brandSettings.footerLogo.heightPx}px`,
                                  }}
                                  className="rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm"
                                >
                                  <Sun
                                    style={{
                                      width: `${Math.max(14, Math.round(brandSettings.footerLogo.heightPx * 0.58))}px`,
                                      height: `${Math.max(14, Math.round(brandSettings.footerLogo.heightPx * 0.58))}px`,
                                    }}
                                    className="text-slate-950"
                                  />
                                </div>
                              );
                            })()}

                            {brandSettings.footerLogo.showBrandText && (
                              <div>
                                <div className="text-white font-extrabold text-xs tracking-tight">
                                  ZION <span className="text-amber-400 font-light">CONFORT</span>
                                </div>
                                <div className="text-[7px] tracking-[0.2em] text-slate-400 font-bold uppercase">
                                  Line Solutions
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-[10px] text-slate-500 font-mono">
                            © 2026 Zion Confort Line
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botão para testar no site aberto */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigateTo('home')}
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold border border-slate-800 flex items-center justify-center gap-2 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Ver Logotipo Aplicado na Página Inicial</span>
                      </button>
                    </div>
                  </div>

                  {/* Informações e Boas Práticas */}
                  <div className="p-5 rounded-3xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-slate-200">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Recomendações de Arquivo & Formato:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-400">
                      <li>
                        <strong>Formatos recomendados:</strong> PNG com fundo transparente ou SVG vetorial.
                      </li>
                      <li>
                        <strong>Logo Branca:</strong> Crie uma versão monocromática branca (#FFFFFF) ou com tons de ouro claro para garantir nitidez nos fundos escuros do cabeçalho e do rodapé.
                      </li>
                      <li>
                        <strong>Persistência automática:</strong> Suas alterações ficam salvas no navegador e são sincronizadas em tempo real com todas as páginas.
                      </li>
                    </ul>
                  </div>
                </div>
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
