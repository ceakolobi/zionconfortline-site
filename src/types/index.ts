export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'GERENTE' | 'VENDEDOR' | 'CLIENTE' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  company?: string;
  permissions?: string[];
}

export type CategorySlug = 'solar' | 'conforto' | 'eletro' | 'seguranca' | 'eletronicos' | 'servicos';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug | string;
  iconName: string;
  description: string;
  badge?: string;
  productsCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug | string;
  categoryName: string;
  subcategory?: string;
  price: number;
  promoPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  brand: string;
  warranty: string;
  sku: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceEstimate?: number;
  billingType: 'Fixo' | 'Sob Consulta' | 'Mensal' | 'Por Projeto';
  description: string;
  leadTime: string;
  iconName: string;
  features: string[];
  tags: string[];
}

export type SolarProjectType = 'Residencial' | 'Comercial' | 'Industrial' | 'Rural' | 'Usina Solar';
export type SolarProjectStatus = 'Lead' | 'Orçamento' | 'Projeto' | 'Aprovado' | 'Em instalação' | 'Instalado' | 'Homologação' | 'Ativo' | 'Manutenção' | 'Finalizado';

export interface SolarProject {
  id: string;
  title: string;
  type: SolarProjectType;
  clientName: string;
  city: string;
  state: string;
  powerKwp: number;
  panelsCount: number;
  panelsModel: string;
  inverterModel: string;
  monthlyGenerationKwh: number;
  avgBillSaving: number;
  status: SolarProjectStatus;
  installDate: string;
  warrantyYears: number;
  coverImage: string;
  description: string;
}

export interface SolarTelemetryData {
  currentPowerKw: number;
  dailyGenerationKwh: number;
  monthlyGenerationKwh: number;
  yearlyGenerationKwh: number;
  totalGenerationKwh: number;
  estimatedSavingsMonthBrl: number;
  co2AvoidedKg: number;
  treesPlantedEquivalent: number;
  inverterStatus: 'Operação Normal' | 'Atenção' | 'Manutenção' | 'Offline';
  efficiencyPercent: number;
  hourlyCurve: { hour: string; generationKw: number; consumptionKw: number }[];
  monthlyHistory: { month: string; generationKwh: number; consumptionKwh: number; savingsBrl: number }[];
}

export type LeadStatus = 'Novo' | 'Contato realizado' | 'Em negociação' | 'Orçamento enviado' | 'Aguardando cliente' | 'Venda realizada' | 'Perdido';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  interestType: 'Energia Solar' | 'Produtos' | 'Serviços' | 'Segurança' | 'Conforto';
  estimatedValue: number;
  status: LeadStatus;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  notes: { date: string; author: string; text: string }[];
  nextFollowUpDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pendente' | 'Processando' | 'Faturado' | 'Enviado' | 'Entregue' | 'Cancelado';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  status: OrderStatus;
  paymentMethod: 'PIX' | 'Cartão de Crédito' | 'Boleto Bancário' | 'Faturamento PJ';
  createdAt: string;
  trackingCode?: string;
  shippingAddress: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Commission {
  id: string;
  sellerId: string;
  sellerName: string;
  orderOrProjectId: string;
  refDescription: string;
  amount: number;
  percentage: number;
  status: 'Pendente' | 'Aprovada' | 'Paga';
  date: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  category: 'Energia Solar' | 'E-commerce' | 'Garantia' | 'Financeiro' | 'Instalação' | 'Outro';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  status: 'Aberto' | 'Em atendimento' | 'Aguardando cliente' | 'Resolvido' | 'Encerrado';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isStaff: boolean;
  }[];
}

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'REST API' | 'Webhook' | 'OAuth' | 'API Key' | 'Bearer Token';
  baseUrl: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT';
  headers: string;
  authType: 'Bearer' | 'API Key' | 'Basic' | 'Nenhum';
  tokenOrKeyMasked: string;
  timeoutMs: number;
  environment: 'Produção' | 'Homologação' | 'Sandbox';
  status: 'Ativo' | 'Inativo' | 'Erro';
  lastSync: string;
  lastResponseCode: number;
  notes: string;
}

export interface WebhookLog {
  id: string;
  timestamp: string;
  origin: string;
  event: string;
  payloadPreview: string;
  status: 'Sucesso' | 'Falha' | 'Recebido';
  responseCode: number;
  durationMs: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  targetEntity: string;
  details: string;
  ipAddress: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: string;
  tags: string[];
}
