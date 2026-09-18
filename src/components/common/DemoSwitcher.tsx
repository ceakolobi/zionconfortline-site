import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Briefcase, Globe, ChevronUp, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const { currentUser, quickLoginAs, activeRoute, navigateTo, theme, toggleTheme } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const getRoleBadge = () => {
    if (!currentUser) {
      return {
        label: 'Visitante (Site Público)',
        color: 'bg-slate-700 text-slate-200 border-slate-600',
        icon: Globe,
      };
    }
    switch (currentUser.role) {
      case 'ADMIN':
        return {
          label: 'Admin Demo (Acesso Total)',
          color: 'bg-rose-900/80 text-rose-200 border-rose-700',
          icon: ShieldCheck,
        };
      case 'VENDEDOR':
        return {
          label: 'Vendedor Demo (CRM & Leads)',
          color: 'bg-amber-900/80 text-amber-200 border-amber-700',
          icon: Briefcase,
        };
      case 'CLIENTE':
        return {
          label: 'Cliente Demo (Telemetria & Pedidos)',
          color: 'bg-emerald-900/80 text-emerald-200 border-emerald-700',
          icon: UserCheck,
        };
      default:
        return {
          label: 'Convidado',
          color: 'bg-slate-800 text-slate-200 border-slate-700',
          icon: Globe,
        };
    }
  };

  const badge = getRoleBadge();
  const CurrentIcon = badge.icon;

  return (
    <div id="demo-environment-dock" className="fixed bottom-4 left-4 z-40 max-w-sm">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl rounded-2xl p-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <div className="text-xs">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ambiente Demo Zion
              </div>
              <div className="text-[11px] text-slate-400">Alternar Perfis do Sistema</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="demo-switcher-theme-toggle"
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition-colors"
              title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
              aria-label={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              id="btn-toggle-demo-switcher"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 transition-colors"
            >
              <CurrentIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium truncate max-w-[100px] sm:max-w-none">
                {currentUser?.role || 'PÚBLICO'}
              </span>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Selecione o perfil para testar:
            </div>

            <button
              id="switch-to-public"
              onClick={() => {
                quickLoginAs('guest');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                !currentUser
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <div className="text-left">
                  <div className="font-medium">Site Público & Loja</div>
                  <div className="text-[10px] text-slate-400">Visitante deslogado</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">Público</span>
            </button>

            <button
              id="switch-to-client"
              onClick={() => {
                quickLoginAs('client');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                currentUser?.role === 'CLIENTE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="font-medium">Portal do Cliente</div>
                  <div className="text-[10px] text-slate-400">cliente@demo.local (Telemetria Solar)</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                /cliente
              </span>
            </button>

            <button
              id="switch-to-seller"
              onClick={() => {
                quickLoginAs('seller');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                currentUser?.role === 'VENDEDOR'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="font-medium">Portal do Vendedor</div>
                  <div className="text-[10px] text-slate-400">vendedor@demo.local (CRM & Comissões)</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                /vendedor
              </span>
            </button>

            <button
              id="switch-to-admin"
              onClick={() => {
                quickLoginAs('admin');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                currentUser?.role === 'ADMIN'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <div className="text-left">
                  <div className="font-medium">Painel Administrativo</div>
                  <div className="text-[10px] text-slate-400">admin@demo.local (Controle Total)</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                /admin
              </span>
            </button>

            <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-800/80">
              Dados fictícios devidamente identificados como DEMO
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
