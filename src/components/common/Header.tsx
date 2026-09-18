import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  ShoppingCart,
  User as UserIcon,
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Briefcase,
  UserCheck,
  ChevronDown,
  Sparkles,
  Zap,
  Calculator,
  ShoppingBag,
  Layers,
  HelpCircle,
  Send,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

interface SubmenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  route?: string;
  highlight?: boolean;
  submenu?: SubmenuItem[];
}

export const Header: React.FC = () => {
  const {
    activeRoute,
    navigateTo,
    cartCount,
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen,
    quickLoginAs,
    theme,
    toggleTheme,
    setSelectedCategory,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const headerWhatsapp = generateWhatsAppUrl({ type: 'geral' });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navGroups: NavGroup[] = [
    {
      id: 'home',
      label: 'Início',
      route: 'home',
    },
    {
      id: 'sobre',
      label: 'Sobre',
      route: 'sobre',
    },
    {
      id: 'solar_group',
      label: 'Energia Solar',
      highlight: true,
      submenu: [
        {
          id: 'solar',
          label: 'Soluções & Usinas Solares',
          description: 'Sistemas on-grid, híbridos e usinas com até 95% de economia',
          icon: <Sun className="w-4 h-4 text-amber-500" />,
          badge: 'Economize 95%',
        },
        {
          id: 'calculadora',
          label: 'Calculadora Solar',
          description: 'Simulador instantâneo de payback, economia e potência ideal',
          icon: <Calculator className="w-4 h-4 text-amber-500" />,
          badge: 'Simulação Grátis',
        },
      ],
    },
    {
      id: 'loja_group',
      label: 'Loja',
      submenu: [
        {
          id: 'produtos',
          label: 'Catálogo Completo',
          description: 'Todos os produtos, kits fotovoltaicos e linha conforto',
          icon: <ShoppingBag className="w-4 h-4 text-amber-500" />,
        },
        {
          id: 'cat_solar',
          label: 'Kits & Inversores Fotovoltaicos',
          description: 'Módulos Tier 1, microinversores e baterias solares',
          icon: <Zap className="w-4 h-4 text-amber-500" />,
        },
        {
          id: 'cat_conforto',
          label: 'Colchões & Terapia Magnética',
          description: 'Linha biomecânica, magnetoterapia e infravermelho longo',
          icon: <Sparkles className="w-4 h-4 text-purple-400" />,
        },
        {
          id: 'cat_seguranca',
          label: 'Segurança & Câmeras 4K',
          description: 'Kits CFTV inteligentes com inteligência artificial e Wi-Fi',
          icon: <ShieldCheck className="w-4 h-4 text-sky-400" />,
        },
      ],
    },
    {
      id: 'servicos',
      label: 'Serviços',
      route: 'servicos',
    },
    {
      id: 'projetos',
      label: 'Projetos',
      route: 'projetos',
    },
    {
      id: 'blog',
      label: 'Blog',
      route: 'blog',
    },
    {
      id: 'contato_group',
      label: 'Contato',
      submenu: [
        {
          id: 'contato',
          label: 'Fale Conosco / Orçamento',
          description: 'Atendimento consultivo, cotações e suporte técnico',
          icon: <Send className="w-4 h-4 text-amber-500" />,
        },
        {
          id: 'faq',
          label: 'Perguntas Frequentes (FAQ)',
          description: 'Dúvidas sobre homologação, garantias e financiamento',
          icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
        },
      ],
    },
  ];

  const handleSubmenuClick = (subId: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);

    if (subId === 'cat_solar') {
      setSelectedCategory('solar');
      navigateTo('produtos');
    } else if (subId === 'cat_conforto') {
      setSelectedCategory('conforto');
      navigateTo('produtos');
    } else if (subId === 'cat_seguranca') {
      setSelectedCategory('seguranca');
      navigateTo('produtos');
    } else {
      navigateTo(subId);
    }
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.route && activeRoute === group.route) return true;
    if (group.submenu) {
      return group.submenu.some(
        (sub) =>
          activeRoute === sub.id ||
          (sub.id.startsWith('cat_') && activeRoute === 'produtos')
      );
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xs dark:shadow-lg transition-colors duration-200">
      {/* Top utility bar */}
      <div className="hidden lg:block bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 py-1.5 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Representante Autorizado & Soluções Integradas de Alta Eficiência</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Phone className="w-3 h-3 text-amber-500" />
              <span>(11) 97123-8899</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Mail className="w-3 h-3 text-amber-500" />
              <span>contato@zionconfortline.com.br</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  quickLoginAs('client');
                  navigateTo('cliente');
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Portal do Cliente</span>
              </button>
              <button
                onClick={() => {
                  quickLoginAs('seller');
                  navigateTo('vendedor');
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                <span>Portal do Vendedor</span>
              </button>
              <button
                onClick={() => {
                  quickLoginAs('admin');
                  navigateTo('admin');
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                <span>Painel Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand container */}
          <div
            id="brand-logo"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sun className="w-7 h-7 text-slate-950 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  ZION
                </span>
                <span className="font-display font-light text-xl sm:text-2xl tracking-wider text-amber-500 dark:text-amber-400">
                  CONFORT
                </span>
              </div>
              <div className="text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Line Solutions
              </div>
            </div>
          </div>

          {/* Desktop nav links with Dropdown Submenus */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium flex-nowrap"
          >
            {navGroups.map((group) => {
              const active = isGroupActive(group);
              const hasSubmenu = Boolean(group.submenu && group.submenu.length > 0);
              const isDropdownOpen = openDropdown === group.id;

              if (!hasSubmenu) {
                return (
                  <button
                    key={group.id}
                    id={`nav-${group.id}`}
                    onClick={() => {
                      setOpenDropdown(null);
                      if (group.route) navigateTo(group.route);
                    }}
                    className={`whitespace-nowrap px-3 py-2 rounded-xl transition-all text-xs xl:text-sm font-semibold inline-flex items-center ${
                      active
                        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-slate-800/80 font-bold shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="whitespace-nowrap">{group.label}</span>
                  </button>
                );
              }

              // Group with Submenu
              return (
                <div
                  key={group.id}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setOpenDropdown(group.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    id={`nav-${group.id}`}
                    onClick={() => {
                      setOpenDropdown(isDropdownOpen ? null : group.id);
                    }}
                    aria-expanded={isDropdownOpen}
                    className={`whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-xs xl:text-sm ${
                      active || isDropdownOpen
                        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-slate-800/80 font-bold shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 font-semibold'
                    } ${group.highlight ? 'text-amber-600 dark:text-amber-300' : ''}`}
                  >
                    <span className="whitespace-nowrap">{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 flex-shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                    {group.highlight && (
                      <span className="relative flex h-2 w-2 ml-0.5 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                    )}
                  </button>

                  {/* Dropdown Card */}
                  {isDropdownOpen && (
                    <div
                      className={`absolute left-0 mt-1 ${
                        group.id === 'loja_group' ? 'w-80' : 'w-72'
                      } bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl`}
                    >
                      <div className="space-y-1">
                        {group.submenu?.map((sub) => {
                          const isSubActive =
                            activeRoute === sub.id ||
                            (sub.id === 'produtos' && activeRoute === 'produtos');

                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubmenuClick(sub.id)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group/item ${
                                isSubActive
                                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover/item:bg-amber-500/10 group-hover/item:text-amber-500 transition-colors flex-shrink-0">
                                {sub.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold leading-tight whitespace-nowrap">
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-slate-950 shadow-xs whitespace-nowrap flex-shrink-0">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                {sub.description && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-normal leading-snug">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp CTA Button */}
            <a
              id="header-btn-whatsapp"
              href={headerWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/20 transition-all hover:shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              id="header-btn-cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingCart className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Light / Dark Mode Toggle Button */}
            <button
              id="header-btn-theme-toggle"
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
              aria-label={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 group-hover:-rotate-12 transition-transform duration-300" />
              )}
              <span className="sr-only">
                {theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
              </span>
            </button>

            {/* Profile Dropdown / Login */}
            <div className="relative">
              {currentUser ? (
                <button
                  id="header-btn-user"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-300 dark:border-slate-600"
                  />
                  <div className="hidden sm:block text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium tracking-wide">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </button>
              ) : (
                <button
                  id="header-btn-login"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Entrar</span>
                </button>
              )}

              {/* Dropdown Menu */}
              {profileDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <div className="font-semibold text-slate-900 dark:text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1 inline-block px-2 py-0.5 rounded bg-amber-400/10 text-amber-600 dark:text-amber-400 font-semibold text-[10px]">
                      Perfil: {currentUser.role}
                    </div>
                  </div>

                  {currentUser.role === 'CLIENTE' && (
                    <button
                      onClick={() => {
                        navigateTo('cliente');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-500" />
                      <span>Meu Portal do Cliente</span>
                    </button>
                  )}

                  {currentUser.role === 'VENDEDOR' && (
                    <button
                      onClick={() => {
                        navigateTo('vendedor');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4 text-amber-500" />
                      <span>Meu Portal do Vendedor</span>
                    </button>
                  )}

                  {currentUser.role === 'ADMIN' && (
                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-500" />
                      <span>Painel Administrativo</span>
                    </button>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      quickLoginAs('guest');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-500 flex items-center gap-2"
                  >
                    <span>Sair da conta</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle button */}
            <button
              id="header-btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700"
              aria-label="Alternar menu móvel"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 transition-colors max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => {
                quickLoginAs('client');
                navigateTo('cliente');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 font-medium"
            >
              <UserCheck className="w-4 h-4" />
              <span>Portal Cliente</span>
            </button>
            <button
              onClick={() => {
                quickLoginAs('seller');
                navigateTo('vendedor');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 flex items-center gap-2 font-medium"
            >
              <Briefcase className="w-4 h-4" />
              <span>Portal Vendedor</span>
            </button>
          </div>

          {/* Mobile Theme Toggle Button */}
          <div className="pb-2">
            <button
              id="mobile-btn-theme-toggle"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
                <span>Aparência da Tela</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-600 dark:text-amber-400 font-bold">
                {theme === 'dark' ? '☀️ Mudar p/ Claro' : '🌙 Mudar p/ Escuro'}
              </span>
            </button>
          </div>

          <div className="space-y-1">
            {navGroups.map((group) => {
              const active = isGroupActive(group);
              const hasSubmenu = Boolean(group.submenu && group.submenu.length > 0);
              const isExpanded = mobileExpandedGroup === group.id;

              if (!hasSubmenu) {
                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      if (group.route) navigateTo(group.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {group.label}
                  </button>
                );
              }

              return (
                <div key={group.id} className="rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
                  <button
                    onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {group.label}
                      {group.highlight && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                          95% OFF
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="bg-white dark:bg-slate-900 p-2 space-y-1">
                      {group.submenu?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubmenuClick(sub.id)}
                          className="w-full text-left p-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2.5 font-medium"
                        >
                          <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-amber-500">
                            {sub.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                              <span>{sub.label}</span>
                              {sub.badge && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1.5 py-0.2 rounded font-bold">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href={headerWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Atendimento via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

