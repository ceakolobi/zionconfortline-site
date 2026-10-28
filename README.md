# ☀️ Zion Confort Line - Plataforma Integrada de Soluções Solares, E-Commerce & Gestão

> **Plataforma corporativa multissetorial** combinando engenharia em energia solar fotovoltaica, e-commerce com checkout dinâmico, simulador/calculadora solar, portal do cliente com telemetria, CRM comercial para vendedores/representantes e painel administrativo completo.

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Principais Funcionalidades](#-principais-funcionalidades)
  - [1. Portal Público & Landing Pages](#1-portal-público--landing-pages)
  - [2. Calculadora & Simulador Solar](#2-calculadora--simulador-solar)
  - [3. Loja Virtual & Checkout](#3-loja-virtual--checkout)
  - [4. Portal do Cliente (Telemetria Solar)](#4-portal-do-cliente-telemetria-solar)
  - [5. Portal do Vendedor (CRM & Comissões)](#5-portal-do-vendedor-crm--comissões)
  - [6. Painel Administrativo (Admin)](#6-painel-administrativo-admin)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar Localmente](#-como-executar-localmente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Perfis de Acesso (Demo & Testes)](#-perfis-de-acesso-demo--testes)
- [Integrações e Segurança](#-integrações-e-segurança)
- [Licença e Créditos](#-licença-e-créditos)

---

## 🌟 Sobre o Projeto

A **Zion Confort Line** é uma solução completa desenvolvida para integrar o ecossistema de sustentabilidade, eficiência energética e conforto:
- **Energia Solar Fotovoltaica**: Simulação de economia de até 95%, dimensionamento de usinas on-grid e off-grid, e acompanhamento de geração.
- **Loja Multissetorial**: Venda de kits solares, colchões terapêuticos e magnéticos, segurança eletrônica/CFTV 4K e automação residencial.
- **Gestão Operacional**: Portais com controle de acesso baseado em papéis (RBAC) para clientes finais, consultores/vendedores e administradores.

---

## 🚀 Principais Funcionalidades

### 1. Portal Público & Landing Pages
- **Hero Interativo**: Banner de alto impacto com vídeo de fundo em alta definição, controles de play/pause e botões de chamada rápida para ação (CTA).
- **Menu com Submenus Hierárquicos**: Navegação organizada por categorias (*Início, Sobre, Energia Solar, Loja, Serviços, Projetos, Blog, Contato*).
- **Galeria de Projetos Realizados**: Filtros por segmento (Residencial, Comercial, Rural, Industrial) com métricas de potência instalada e economia anual gerada.
- **Seção de Serviços**: Apresentação de homologação junto às concessionárias, engenharia elétrica, manutenção preventiva e monitoramento contínuo.
- **Blog & Notícias do Setor**: Artigos sobre regulação da ANEEL, tecnologias de painéis solares e dicas de sustentabilidade.
- **Suporte a Modo Claro e Modo Escuro (Dark Mode)**: Alternância suave com preservação de contraste e legibilidade.

### 2. Calculadora & Simulador Solar
- **Cálculo em Tempo Real**: O visitante informa o valor mensal da sua conta de energia (R$) ou o consumo em kWh.
- **Estimativas Instantâneas**:
  - Economia mensal e anual estimada (até 95%).
  - Potência ideal do sistema (kWp) e área de telhado necessária (m²).
  - Quantidade estimada de módulos fotovoltaicos.
  - Tempo estimado de retorno do investimento (*Payback*).
  - Redução na emissão de CO₂ e árvores salvas equivalentes.
- **Geração de Proposta Direta para o WhatsApp**: Transfere todos os parâmetros do cálculo automaticamente para o consultor comercial da Zion.

### 3. Loja Virtual & Checkout
- **Catálogo com Filtros Avançados**: Busca em tempo real, ordenação por preço e filtragem por categorias (*Kits Solares, Conforto Magnético, Eletrodomésticos Inverter, Segurança Eletrônica, Smart Home*).
- **Detalhes Ricos do Produto**: Galeria com fallbacks automáticos, especificações técnicas, garantias, cálculo de frete simulado e parcelamento em até 12x.
- **Carrinho Drawer Lateral**: Ajuste dinâmico de quantidades, cálculo de subtotal, frete e cupons de desconto.
- **Modal de Checkout Completo**:
  - Dados do comprador e endereço de entrega.
  - Métodos de pagamento: **PIX com QR Code dinâmico**, **Cartão de Crédito** (com parcelamento) e **Boleto Bancário**.
  - Simulação de pedido confirmado com código de rastreio e envio de comprovante via WhatsApp.

### 4. Portal do Cliente (Área Restrita / Em Configuração)
- **Status Atual**: Bloqueado com tela de proteção informativa.
- **Acesso com Senha**: Em fase final de homologação técnica. Os clientes e parceiros receberão senhas individuais de acesso para acompanhar telemetria solar, faturas e garantias.
- **Canais de Atendimento**: Botão direto para suporte e esclarecimento de dúvidas via WhatsApp.

### 5. Portal do Vendedor (Área Restrita / Em Configuração)
- **Status Atual**: Bloqueado temporariamente para implantação de credenciais de acesso corporativo.

### 6. Painel Administrativo (Autenticação & Controle Total)
- **Autenticação Obrigatória**:
  - **Login Padrão**: `admin@admin.com`
  - **Senha Padrão**: `admin@admin.com`
  - Tela de autenticação exclusiva (`AdminLoginGate`) com preenchimento rápido demonstrativo e validação em tempo real.
- **Alteração Dinâmica de Credenciais**:
  - O administrador autenticado pode alterar tanto o **e-mail de login** quanto a **senha** diretamente na aba **Usuários & RBAC / Segurança & Senha**.
  - Persistência das novas credenciais via `localStorage` (`zion_admin_auth`).
  - Botão de restauração das credenciais padrão caso necessário (`admin@admin.com`).
  - Botão de encerramento seguro de sessão (*Logout*).
- **Métricas Gerais**: Faturamento acumulado, ticket médio, número de propostas ativas e estoque.
- **Gerenciamento de Produtos (CRUD)**: Criação, edição, exclusão e controle de estoque de produtos e kits solares.
- **Gestão de Pedidos**: Alteração de status (*Pendente, Pago, Em Transporte, Entregue*).
- **Gestão de Logotipos & Identidade Visual (White-Label)**:
  - Personalização de logotipos para Cabeçalho (*Header*) e Rodapé (*Footer*).
  - Suporte a versão **Colorida** (para temas claros) e versão **Branca/Clara** (para temas escuros/noturnos).
  - Upload direto de arquivos locais (conversão automática em Base64 Data URL) ou inserção de URLs externas.
  - Seletor de tamanho com controle deslizante de altura em pixels (de 24px a 72px) e atalhos rápidos (*Pequeno, Médio, Grande, Extra Grande*).
  - Regras inteligentes de contraste: alternância automática com base no tema ativo, ou forçar exibição permanente.
  - Simulador interativo em tempo real para pré-visualização instantânea no tema claro, escuro e rodapé antes de salvar.
  - Persistência das preferências via `localStorage`.
- **Configurações Globais**: Atualização de dados de contato, telefones de WhatsApp e banners.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend & UI**:
  - [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/) (Build tool ultrarrápido)
  - [Tailwind CSS v4](https://tailwindcss.com/) (Design responsivo e Dark/Light mode)
  - [Lucide React](https://lucide.dev/) (Biblioteca de ícones modernos)
  - [Motion](https://motion.dev/) (Animações fluidas)
- **Arquitetura & Estado**:
  - React Context API com tipagem estrita para rotas, carrinho, autenticação e preferências.
- **Mídia & Ativos**:
  - Vídeo de fundo com poster de carregamento rápido e fallbacks de imagem resilientes para prevenção de erros 404.

---

## 📂 Estrutura do Projeto

```text
zion-confort-line/
├── public/
│   ├── favicon.ico
│   └── videos/
│       ├── solar-bg.mp4          # Vídeo do Hero Banner
│       └── solar-poster.jpg       # Imagem de pré-carregamento do vídeo
├── src/
│   ├── components/
│   │   ├── common/                # Cabeçalho, Rodapé, Modais de Autenticação/Checkout/Carrinho
│   │   │   ├── AuthModal.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CheckoutModal.tsx
│   │   │   ├── DemoSwitcher.tsx   # Alternador de perfis rápidos (Visitante, Cliente, Vendedor, Admin)
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx         # Menu com submenus e alternador de tema
│   │   │   ├── ProductDetailModal.tsx
│   │   │   └── WhatsAppFloat.tsx
│   │   ├── legal/                 # Modais de Termos de Uso, Privacidade e LGPD
│   │   │   └── LgpdModal.tsx
│   │   └── public/                # Seções públicas da Home e Institucional
│   │       ├── BlogSection.tsx
│   │       ├── CategoriesSection.tsx
│   │       ├── Hero.tsx
│   │       ├── ProductsShowcase.tsx
│   │       ├── ProjectsGallery.tsx
│   │       └── SolarSection.tsx
│   ├── context/
│   │   └── AppContext.tsx         # Gerenciamento de estado global (Rotas, Carrinho, Auth, Notificações)
│   ├── data/
│   │   └── mockData.ts            # Base de dados inicial de produtos, projetos, blog e depoimentos
│   ├── pages/
│   │   ├── AboutPage.tsx          # Página "Sobre Nós"
│   │   ├── AdminDashboard.tsx     # Painel Administrativo
│   │   ├── CatalogPage.tsx        # Loja e Catálogo
│   │   ├── ClientPortal.tsx       # Portal do Cliente (Telemetria)
│   │   ├── HomePage.tsx           # Página Principal
│   │   ├── SellerDashboard.tsx    # Portal do Vendedor (CRM)
│   │   ├── SolarLandingPage.tsx   # Landing page dedicada à Energia Solar
│   │   └── StaticViews.tsx        # Serviços, Projetos, Calculadora, Blog, FAQ, Contato
│   ├── types/
│   │   └── index.ts               # Definições de tipos TypeScript
│   ├── utils/
│   │   ├── formatters.ts          # Formatadores de moeda (BRL), kWh, datas e porcentagens
│   │   └── whatsapp.ts            # Gerador de links parametrizados para atendimento WhatsApp
│   ├── App.tsx                    # Roteador central e layout
│   ├── index.css                  # Estilos globais e Tailwind
│   └── main.tsx                   # Ponto de entrada React
├── metadata.json                  # Metadados da aplicação
├── package.json                   # Dependências e scripts
├── tsconfig.json                  # Configurações do compilador TypeScript
└── vite.config.ts                 # Configuração do Vite
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/zion-confort-line.git
   cd zion-confort-line
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra `http://localhost:3000` (ou a porta indicada no terminal).

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `npm run build`: Compila e otimiza a aplicação para produção na pasta `dist/`.
- `npm run preview`: Executa localmente o build de produção para testes.
- `npm run lint`: Executa a verificação de tipos com o compilador TypeScript (`tsc --noEmit`).
- `npm run clean`: Limpa os diretórios de build anteriores.

---

## 👤 Perfis de Acesso (Demo & Testes)

A aplicação conta com um alternador de perfis no canto superior/inferior para demonstrar os diferentes níveis de acesso sem necessidade de cadastro prévio:

| Perfil | Acesso Permitido | Principais Recursos |
| :--- | :--- | :--- |
| **Visitante** | Área Pública | Navegação, simulador solar, e-commerce, carrinho e checkout. |
| **Cliente** | Portal do Cliente | Gráficos de telemetria solar, faturas, garantias e chamados. |
| **Vendedor** | Portal do Vendedor | CRM de leads, funil de propostas, metas e cálculo de comissões. |
| **Administrador** | Painel Admin | Gestão completa de produtos, pedidos, métricas e configurações. |

---

## 🔒 Integrações e Segurança

- **WhatsApp API Direct**: Envio de orçamentos e pedidos com mensagens contextualizadas.
- **LGPD & Privacidade**: Modal de consentimento de cookies e políticas de privacidade em conformidade com a legislação brasileira.
- **Resiliência de Mídia**: Tratamento inteligente para vídeos em navegadores móveis (`playsInline`, `muted`, `autoPlay`) e fallbacks de imagem automáticos.

---

## 📄 Licença e Créditos

Desenvolvido para **Zion Confort Line Solutions**.  
Todos os direitos reservados © 2026.
