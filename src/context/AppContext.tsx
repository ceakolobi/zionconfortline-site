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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.client);
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

  const quickLoginAs = (roleKey: 'admin' | 'seller' | 'client' | 'guest') => {
    if (roleKey === 'guest') {
      setCurrentUser(null);
      showNotification('Você agora está navegando como Visitante Público.', 'info');
      setActiveRoute('home');
      return;
    }
    const user = DEMO_USERS[roleKey];
    if (user) {
      setCurrentUser(user);
      showNotification(`Sessão iniciada como: ${user.name} (${user.role})`, 'success');
      if (roleKey === 'admin') setActiveRoute('admin');
      else if (roleKey === 'seller') setActiveRoute('vendedor');
      else if (roleKey === 'client') setActiveRoute('cliente');
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
