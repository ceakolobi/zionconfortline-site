import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Product,
  Category,
  SolarProject,
  Lead,
  Order,
  CartItem,
  Commission,
  SupportTicket,
  IntegrationConfig,
  WebhookLog,
  AuditLog,
  LeadStatus,
  OrderStatus,
  SolarTelemetryData,
  BrandSettings,
} from '../types';
import {
  DEMO_USERS,
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_SOLAR_PROJECTS,
  MOCK_LEADS,
  MOCK_ORDERS,
  MOCK_COMMISSIONS,
  MOCK_TICKETS,
  MOCK_INTEGRATIONS,
  MOCK_WEBHOOKS,
  MOCK_AUDIT_LOGS,
  MOCK_CLIENT_TELEMETRY,
  DEFAULT_BRAND_SETTINGS,
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  activeRoute: string;
  navigateTo: (route: string, options?: { category?: string; productId?: string }) => void;
  products: Product[];
  categories: Category[];
  solarProjects: SolarProject[];
  leads: Lead[];
  orders: Order[];
  commissions: Commission[];
  tickets: SupportTicket[];
  integrations: IntegrationConfig[];
  webhookLogs: WebhookLog[];
  auditLogs: AuditLog[];
  clientTelemetry: SolarTelemetryData;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  notification: { type: 'success' | 'info' | 'error'; message: string } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideNotification: () => void;
  quickLoginAs: (roleKey: 'admin' | 'seller' | 'client' | 'guest') => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'sellerId' | 'sellerName' | 'notes'>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  addLeadNote: (leadId: string, text: string) => void;
  createOrder: (orderData: {
    paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Boleto Bancário' | 'Faturamento PJ';
    shippingAddress: Order['shippingAddress'];
    customerInfo: { name: string; email: string; phone: string };
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  createTicket: (ticket: {
    subject: string;
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    firstMessage: string;
  }) => void;
  sendTicketReply: (ticketId: string, text: string, isStaff?: boolean) => void;
  testIntegration: (integrationId: string) => Promise<{ success: boolean; message: string }>;
  toggleIntegrationStatus: (integrationId: string) => void;
  saveProduct: (product: Partial<Product> & { name: string; price: number; category: string }) => void;
  addNewProduct: (product: Partial<Product> & { name: string; price: number; category: string }) => void;
  deleteProduct: (productId: string) => void;
  approveCommission: (commissionId: string) => void;
  brandSettings: BrandSettings;
  updateBrandSettings: (updater: Partial<BrandSettings> | ((prev: BrandSettings) => BrandSettings)) => void;
  resetBrandSettings: () => void;
  adminCredentials: { email: string; password: string };
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => { success: boolean; message?: string };
  updateAdminCredentials: (newEmail: string, newPassword: string) => { success: boolean; message?: string };
  resetAdminCredentials: () => void;
  logout: () => void;
}

const DEFAULT_ADMIN_CREDS = {
  email: 'admin@admin.com',
  password: 'admin@admin.com',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminCredentials, setAdminCredentials] = useState<{ email: string; password: string }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zion_admin_auth');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.email && parsed.password) {
            return { email: parsed.email, password: parsed.password };
          }
        } catch (e) {
          // ignore error
        }
      }
    }
    return DEFAULT_ADMIN_CREDS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zion_admin_logged_in') === 'true';
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('zion_admin_logged_in') === 'true';
      if (isLoggedIn) {
        let email = 'admin@admin.com';
        const savedAuth = localStorage.getItem('zion_admin_auth');
        if (savedAuth) {
          try {
            const parsed = JSON.parse(savedAuth);
            if (parsed.email) email = parsed.email;
          } catch (e) {}
        }
        return {
          id: 'usr_admin',
          name: 'Administrador Master',
          email,
          role: 'ADMIN',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        };
      }
    }
    return null;
  });
  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories] = useState<Category[]>(MOCK_CATEGORIES);
  const [solarProjects, setSolarProjects] = useState<SolarProject[]>(MOCK_SOLAR_PROJECTS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [commissions, setCommissions] = useState<Commission[]>(MOCK_COMMISSIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(MOCK_INTEGRATIONS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>(MOCK_WEBHOOKS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[5], quantity: 1 }, // default 1 sample item in cart
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientTelemetry] = useState<SolarTelemetryData>(MOCK_CLIENT_TELEMETRY);
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Theme state with localStorage persistence
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zion_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Brand Logo Settings with localStorage persistence
  const [brandSettings, setBrandSettingsState] = useState<BrandSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('zion_brand_settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_BRAND_SETTINGS,
            ...parsed,
            headerLogo: { ...DEFAULT_BRAND_SETTINGS.headerLogo, ...(parsed.headerLogo || {}) },
            footerLogo: { ...DEFAULT_BRAND_SETTINGS.footerLogo, ...(parsed.footerLogo || {}) },
          };
        }
      } catch (err) {
        console.error('Error loading brand settings from localStorage', err);
      }
    }
    return DEFAULT_BRAND_SETTINGS;
  });

  const updateBrandSettings = (updater: Partial<BrandSettings> | ((prev: BrandSettings) => BrandSettings)) => {
    setBrandSettingsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem('zion_brand_settings', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save brand settings to localStorage', e);
      }
      return next;
    });
  };

  const resetBrandSettings = () => {
    setBrandSettingsState(DEFAULT_BRAND_SETTINGS);
    try {
      localStorage.removeItem('zion_brand_settings');
    } catch (e) {
      console.error(e);
    }
  };

  // Sync theme to <html> element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('zion_theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      return next;
    });
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  // Auto clear notification after 4s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showNotification(`Status do pedido alterado para "${status}".`, 'info');
  };

  const addNewProduct = (productData: Partial<Product> & { name: string; price: number; category: string }) => {
    saveProduct(productData);
  };

  const navigateTo = (route: string, options?: { category?: string; productId?: string }) => {
    if (options?.category) {
      setSelectedCategoryFilter(options.category);
    }
    if (options?.productId) {
      const prod = products.find((p) => p.id === options.productId);
      if (prod) setSelectedProductDetail(prod);
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('zion_admin_logged_in');
    }
    setCurrentUser(null);
    setActiveRoute('home');
    showNotification('Sessão encerrada com sucesso.', 'info');
  };

  const loginAdmin = (inputEmail: string, inputPass: string) => {
    const normInputEmail = inputEmail.trim().toLowerCase();
    const normSavedEmail = adminCredentials.email.trim().toLowerCase();

    if (normInputEmail === normSavedEmail && inputPass === adminCredentials.password) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('zion_admin_logged_in', 'true');
      }
      const adminUser: User = {
        id: 'usr_admin',
        name: 'Administrador Master',
        email: adminCredentials.email,
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      };
      setCurrentUser(adminUser);
      showNotification('Acesso autorizado! Bem-vindo ao Painel Administrativo Zion.', 'success');
      setActiveRoute('admin');
      return { success: true };
    } else {
      showNotification('E-mail ou senha de administrador incorretos. Verifique suas credenciais.', 'error');
      return { success: false, message: 'E-mail ou senha incorretos.' };
    }
  };

  const updateAdminCredentials = (newEmail: string, newPassword: string) => {
    if (!newEmail || !newEmail.includes('@')) {
      showNotification('Informe um e-mail válido.', 'error');
      return { success: false, message: 'E-mail inválido.' };
    }
    if (!newPassword || newPassword.length < 4) {
      showNotification('A senha deve conter pelo menos 4 caracteres.', 'error');
      return { success: false, message: 'Senha muito curta (mínimo 4 caracteres).' };
    }

    const updated = {
      email: newEmail.trim(),
      password: newPassword,
      updatedAt: new Date().toISOString(),
    };

    setAdminCredentials({ email: updated.email, password: updated.password });
    if (typeof window !== 'undefined') {
      localStorage.setItem('zion_admin_auth', JSON.stringify(updated));
    }

    if (currentUser && currentUser.role === 'ADMIN') {
      setCurrentUser((prev) => (prev ? { ...prev, email: updated.email } : prev));
    }

    showNotification(`Credenciais atualizadas com sucesso! Novo login: ${updated.email}`, 'success');
    return { success: true };
  };

  const resetAdminCredentials = () => {
    setAdminCredentials(DEFAULT_ADMIN_CREDS);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zion_admin_auth', JSON.stringify(DEFAULT_ADMIN_CREDS));
    }
    if (currentUser && currentUser.role === 'ADMIN') {
      setCurrentUser((prev) => (prev ? { ...prev, email: DEFAULT_ADMIN_CREDS.email } : prev));
    }
    showNotification('Credenciais restauradas para o padrão: admin@admin.com / admin@admin.com', 'info');
  };

  const quickLoginAs = (roleKey: 'admin' | 'seller' | 'client' | 'guest') => {
    if (roleKey === 'guest') {
      logout();
      return;
    }
    if (roleKey === 'admin') {
      setActiveRoute('admin');
      if (!isAdminAuthenticated) {
        showNotification('Autenticação obrigatória: digite seu login e senha de administrador.', 'info');
      }
      return;
    }
    if (roleKey === 'client') {
      setActiveRoute('cliente');
      return;
    }
    if (roleKey === 'seller') {
      setActiveRoute('vendedor');
      return;
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const price = item.product.promoPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`"${product.name}" adicionado ao carrinho!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removido do carrinho.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'sellerId' | 'sellerName' | 'notes'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      sellerId: 'usr_seller',
      sellerName: 'Rodrigo Silveira',
      notes: [
        {
          date: new Date().toLocaleDateString('pt-BR'),
          author: 'Sistema Web',
          text: `Solicitação registrada via portal Zion (${leadData.interestType}).`,
        },
      ],
    };
    setLeads((prev) => [newLead, ...prev]);

    // Audit log
    const audit: AuditLog = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      user: currentUser ? currentUser.name : 'Visitante Site',
      role: currentUser ? currentUser.role : 'GUEST',
      action: 'LEAD_CRIADO',
      targetEntity: `Lead: ${leadData.name}`,
      details: `Novo lead cadastrado com interesse em ${leadData.interestType} (R$ ${leadData.estimatedValue.toLocaleString('pt-BR')}).`,
      ipAddress: '187.64.120.91',
    };
    setAuditLogs((prev) => [audit, ...prev]);

    showNotification('Solicitação recebida com sucesso! Um consultor entrará em contato.', 'success');
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, noteText?: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updatedNotes = [...lead.notes];
          if (noteText) {
            updatedNotes.push({
              date: new Date().toLocaleDateString('pt-BR'),
              author: currentUser?.name || 'Vendedor',
              text: noteText,
            });
          }
          return { ...lead, status, notes: updatedNotes };
        }
        return lead;
      })
    );
    showNotification(`Status do lead alterado para "${status}".`, 'info');
  };

  const addLeadNote = (leadId: string, text: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            notes: [
              ...lead.notes,
              {
                date: new Date().toLocaleDateString('pt-BR'),
                author: currentUser?.name || 'Vendedor',
                text,
              },
            ],
          };
        }
        return lead;
      })
    );
    showNotification('Nota interna adicionada ao histórico do lead.', 'success');
  };

  const createOrder = (orderData: {
    paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Boleto Bancário' | 'Faturamento PJ';
    shippingAddress: Order['shippingAddress'];
    customerInfo: { name: string; email: string; phone: string };
  }): Order => {
    const orderNumber = `ZCL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customerId: currentUser?.id || 'usr_guest',
      customerName: orderData.customerInfo.name,
      customerEmail: orderData.customerInfo.email,
      customerPhone: orderData.customerInfo.phone,
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.product.promoPrice || c.product.price,
        quantity: c.quantity,
        image: c.product.images[0] || '',
      })),
      totalAmount: cartTotal,
      discountAmount: 0,
      shippingAmount: 0,
      status: 'Pendente',
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      trackingCode: `BRZ-${Math.floor(1000000 + Math.random() * 9000000)}`,
      shippingAddress: orderData.shippingAddress,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Commission creation for seller
    const commAmount = Number((cartTotal * 0.05).toFixed(2));
    const newComm: Commission = {
      id: `com_${Date.now()}`,
      sellerId: 'usr_seller',
      sellerName: 'Rodrigo Silveira',
      orderOrProjectId: newOrder.id,
      refDescription: `Pedido ${orderNumber} (${newOrder.customerName})`,
      amount: commAmount,
      percentage: 5.0,
      status: 'Pendente',
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setCommissions((prev) => [newComm, ...prev]);

    // Webhook log simulation
    const webhook: WebhookLog = {
      id: `wh_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      origin: 'Gateway Zion (E-commerce)',
      event: 'ORDER_CREATED',
      payloadPreview: JSON.stringify({ orderId: newOrder.id, value: newOrder.totalAmount, method: newOrder.paymentMethod }),
      status: 'Sucesso',
      responseCode: 200,
      durationMs: 74,
    };
    setWebhookLogs((prev) => [webhook, ...prev]);

    showNotification(`Pedido ${orderNumber} gerado com sucesso!`, 'success');
    return newOrder;
  };

  const createTicket = (data: {
    subject: string;
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    firstMessage: string;
  }) => {
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: currentUser?.id || 'usr_client',
      customerName: currentUser?.name || 'Juliana Castro',
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'Aberto',
      createdAt: new Date().toLocaleString('pt-BR'),
      updatedAt: new Date().toLocaleString('pt-BR'),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: currentUser?.name || 'Cliente',
          text: data.firstMessage,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          isStaff: false,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    showNotification(`Chamado ${newTicket.ticketNumber} aberto com sucesso!`, 'success');
  };

  const sendTicketReply = (ticketId: string, text: string, isStaff = false) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            updatedAt: new Date().toLocaleString('pt-BR'),
            messages: [
              ...t.messages,
              {
                id: `msg_${Date.now()}`,
                sender: currentUser?.name || (isStaff ? 'Suporte Zion' : 'Cliente'),
                text,
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                isStaff,
              },
            ],
          };
        }
        return t;
      })
    );
  };

  const testIntegration = async (integrationId: string): Promise<{ success: boolean; message: string }> => {
    const target = integrations.find((i) => i.id === integrationId);
    if (!target) return { success: false, message: 'Integração não encontrada' };

    // Simulate real gateway check
    await new Promise((res) => setTimeout(res, 800));

    const updated = integrations.map((i) =>
      i.id === integrationId
        ? {
            ...i,
            lastSync: new Date().toLocaleString('pt-BR'),
            lastResponseCode: 200,
            status: 'Ativo' as const,
          }
        : i
    );
    setIntegrations(updated);

    const log: WebhookLog = {
      id: `wh_test_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      origin: target.name,
      event: 'HEALTH_CHECK_TEST',
      payloadPreview: `Endpoint: ${target.endpoint} | Status: 200 OK | Latency: 42ms`,
      status: 'Sucesso',
      responseCode: 200,
      durationMs: 42,
    };
    setWebhookLogs((prev) => [log, ...prev]);

    return {
      success: true,
      message: `Conexão bem sucedida com ${target.name}! HTTP 200 OK retornado.`,
    };
  };

  const toggleIntegrationStatus = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integrationId ? { ...i, status: i.status === 'Ativo' ? 'Inativo' : 'Ativo' } : i
      )
    );
    showNotification('Status da integração atualizado.', 'info');
  };

  const saveProduct = (productData: Partial<Product> & { name: string; price: number; category: string }) => {
    if (productData.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? ({ ...p, ...productData } as Product) : p))
      );
      showNotification(`Produto "${productData.name}" atualizado!`, 'success');
    } else {
      const newProd: Product = {
        id: `prod_${Date.now()}`,
        name: productData.name,
        slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: productData.category,
        categoryName: categories.find((c) => c.slug === productData.category)?.name || 'Geral',
        price: productData.price,
        promoPrice: productData.promoPrice,
        rating: 5.0,
        reviewsCount: 1,
        stock: productData.stock ?? 10,
        images: productData.images?.length ? productData.images : ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80'],
        description: productData.description || 'Produto de alta tecnologia Zion Confort Line.',
        features: productData.features || ['Alta eficiência', 'Garantia de fábrica'],
        specs: productData.specs || { Fabricante: 'Zion Confort Line' },
        brand: productData.brand || 'Zion',
        warranty: productData.warranty || '12 meses de garantia',
        sku: productData.sku || `ZCL-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      setProducts((prev) => [newProd, ...prev]);
      showNotification(`Novo produto "${newProd.name}" cadastrado no catálogo!`, 'success');
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showNotification('Produto removido do catálogo.', 'info');
  };

  const approveCommission = (commissionId: string) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === commissionId ? { ...c, status: 'Aprovada' } : c))
    );
    showNotification('Comissão aprovada pelo administrador com sucesso!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRoute,
        navigateTo,
        products,
        categories,
        solarProjects,
        leads,
        orders,
        commissions,
        tickets,
        integrations,
        webhookLogs,
        auditLogs,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedProductDetail,
        setSelectedProductDetail,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        setTheme,
        clientTelemetry,
        notification,
        showNotification,
        hideNotification,
        quickLoginAs,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addLead,
        updateLeadStatus,
        addLeadNote,
        createOrder,
        updateOrderStatus,
        createTicket,
        sendTicketReply,
        testIntegration,
        toggleIntegrationStatus,
        saveProduct,
        addNewProduct,
        deleteProduct,
        approveCommission,
        brandSettings,
        updateBrandSettings,
        resetBrandSettings,
        adminCredentials,
        isAdminAuthenticated,
        loginAdmin,
        updateAdminCredentials,
        resetAdminCredentials,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
