import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, ShieldCheck, Briefcase, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, navigateTo, loginAdmin, adminCredentials, showNotification } = useApp();
  const [emailInput, setEmailInput] = useState('admin@admin.com');
  const [passwordInput, setPasswordInput] = useState('admin@admin.com');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (emailInput.toLowerCase().includes('admin')) {
      const res = loginAdmin(emailInput, passwordInput);
      if (res.success) {
        setIsAuthModalOpen(false);
        navigateTo('admin');
      } else {
        setErrorMsg('E-mail ou senha de administrador incorretos.');
      }
    } else {
      // Client or seller area is locked
      setIsAuthModalOpen(false);
      navigateTo('cliente');
      showNotification('A área do cliente está bloqueada temporariamente aguardando liberação de senhas.', 'info');
    }
  };

  const selectQuickProfile = (role: 'admin' | 'seller' | 'client') => {
    setIsAuthModalOpen(false);
    if (role === 'admin') {
      navigateTo('admin');
    } else if (role === 'client') {
      navigateTo('cliente');
      showNotification('A área do cliente está bloqueada aguardando configuração de senhas.', 'info');
    } else {
      navigateTo('vendedor');
      showNotification('A área do vendedor está bloqueada aguardando configuração de senhas.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900">Acesso à Plataforma Zion</h3>
          <p className="text-xs text-slate-500 mt-1">
            Entre no Painel Administrativo ou consulte o status de acesso dos portais.
          </p>
        </div>

        {/* Quick Demo Access Buttons */}
        <div className="space-y-2.5 mb-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Portais do Sistema:
          </div>

          <button
            onClick={() => selectQuickProfile('admin')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-slate-800 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-rose-950 flex items-center gap-1.5">
                  <span>Painel Administrativo</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-200 text-rose-900 font-bold">
                    Com Senha
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Login: {adminCredentials.email}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => selectQuickProfile('client')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800 transition-all group cursor-pointer opacity-90"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-600 text-white flex items-center justify-center shadow-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Área do Cliente</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                    Bloqueado
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Senhas em processo de liberação técnica</div>
              </div>
            </div>
            <Lock className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
            <span className="bg-white px-2">Ou digite o e-mail cadastrado</span>
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleManualLogin} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">E-mail corporativo ou pessoal</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Senha de acesso</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors mt-2"
          >
            Entrar no Sistema
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] text-slate-400">
          Credenciais protegidas por RBAC (Controle de Acesso Baseado em Papéis).
        </p>
      </div>
    </div>
  );
};
