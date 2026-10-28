import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ShieldAlert, ArrowLeft, MessageCircle, ShieldCheck, Clock, KeyRound } from 'lucide-react';

interface LockedAccessScreenProps {
  area?: 'cliente' | 'vendedor';
}

export const LockedAccessScreen: React.FC<LockedAccessScreenProps> = ({ area = 'cliente' }) => {
  const { navigateTo } = useApp();

  const isClient = area === 'cliente';
  const portalName = isClient ? 'Portal do Cliente' : 'Portal do Vendedor';
  const roleDescription = isClient
    ? 'autoatendimento, telemetria solar e acompanhamento de faturas'
    : 'CRM de vendas, funil de propostas e gestão de comissões';

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-lg space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início do Site</span>
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-[11px] font-bold tracking-wide mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{portalName} • Acesso Bloqueado em Configuração</span>
          </div>

          <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white">
            {portalName} em Processo de Liberação
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Esta área exclusiva de {roleDescription} está temporariamente{' '}
            <strong>bloqueada para implementação do novo sistema de senhas individuais</strong>.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Como obter meu acesso?</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  As senhas individuais dos clientes serão distribuídas diretamente pelo nosso time após a conclusão desta etapa.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => navigateTo('home')}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Voltar para a Página Principal & Loja
            </button>

            <a
              href="https://wa.me/5511971238899?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20meu%20acesso%20ao%20portal%20Zion."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar Acesso via WhatsApp</span>
            </a>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sou Administrador: Acessar Painel Admin com Senha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
