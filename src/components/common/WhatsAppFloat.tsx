import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  SunMedium,
  Wind,
  ShoppingBag,
  Wrench,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  ChevronRight,
  PhoneCall,
  Clock,
} from 'lucide-react';
import {
  generateWhatsAppUrl,
  ZION_WHATSAPP_DISPLAY,
  ZION_WHATSAPP_NUMBER,
} from '../../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [customText, setCustomText] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show a friendly greeting teaser after 3 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      const teaserDismissed = sessionStorage.getItem('zion_wa_teaser_dismissed');
      if (!teaserDismissed && !hasInteracted) {
        setShowTeaser(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when popover opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    sessionStorage.setItem('zion_wa_teaser_dismissed', 'true');
  };

  const handleToggleOpen = () => {
    setHasInteracted(true);
    setShowTeaser(false);
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (type: 'solar_orcamento' | 'servico' | 'produto' | 'suporte' | 'geral') => {
    let url = '';
    if (type === 'solar_orcamento') {
      url = generateWhatsAppUrl({ type: 'solar_orcamento' });
    } else if (type === 'servico') {
      url = generateWhatsAppUrl({ type: 'servico', serviceName: 'Climatização e Ar-Condicionado' });
    } else if (type === 'produto') {
      url = generateWhatsAppUrl({ type: 'produto', productName: 'Produtos e Equipamentos Zion' });
    } else if (type === 'suporte') {
      url = generateWhatsAppUrl({ type: 'suporte' });
    } else {
      url = generateWhatsAppUrl({ type: 'geral' });
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = customText.trim() || 'Olá! Gostaria de falar com o atendimento da Zion Confort Line.';
    const url = generateWhatsAppUrl({ customMessage: textToSend });
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomText('');
    setIsOpen(false);
  };

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
      ref={popoverRef}
    >
      {/* Interactive Chat Window Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Janela de atendimento WhatsApp"
          className="mb-4 w-[360px] sm:w-[390px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl border border-emerald-500/20 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 transition-all origin-bottom-right"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-4.5 sm:p-5">
            {/* Ambient pattern glow */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 shadow-inner">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  {/* Live pulsing online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-emerald-800"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base leading-tight tracking-tight">Zion Confort Line</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-300 fill-emerald-400/20" />
                  </div>
                  <p className="text-xs text-emerald-100/90 font-medium flex items-center gap-1 mt-0.5">
                    <span>Atendimento Oficial</span>
                    <span>•</span>
                    <span className="text-emerald-200">Online agora</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar janela"
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Number Bar */}
            <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
              <span className="flex items-center gap-1.5 font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                WhatsApp: <strong className="text-white font-bold">{ZION_WHATSAPP_DISPLAY}</strong>
              </span>
              <span className="flex items-center gap-1 text-emerald-200/90 bg-emerald-900/40 px-2 py-0.5 rounded-full text-[10px]">
                <Clock className="w-3 h-3" />
                Resposta rápida
              </span>
            </div>
          </div>

          {/* Chat Preview Body */}
          <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 max-h-[360px] overflow-y-auto space-y-3.5">
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                Hoje • Atendimento em tempo real
              </span>
            </div>

            {/* Welcome message bubble */}
            <div className="flex items-start gap-2.5">
              <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <p className="font-medium text-slate-900 dark:text-white mb-1">
                  Olá! Seja muito bem-vindo(a) à <strong>Zion Confort Line</strong>! ☀️❄️
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-xs">
                  Somos especialistas em <strong>Energia Solar Fotovoltaica</strong> e <strong>Climatização</strong>.
                  Selecione um dos assuntos abaixo para falar direto com nosso time no WhatsApp:
                </p>
                <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-slate-400">
                  <span>Agora</span>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Quick Interactive Choices */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleOptionClick('solar_orcamento')}
                className="w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/50 text-left transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                    <SunMedium className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-amber-950 dark:text-amber-100">
                      Orçamento de Energia Solar
                    </span>
                    <span className="block text-[11px] text-amber-800/80 dark:text-amber-300/80">
                      Economize até 95% na conta de luz
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleOptionClick('servico')}
                className="w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/30 dark:hover:bg-sky-900/40 border border-sky-200 dark:border-sky-800/50 text-left transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-sky-950 dark:text-sky-100">
                      Climatização & Ar-Condicionado
                    </span>
                    <span className="block text-[11px] text-sky-800/80 dark:text-sky-300/80">
                      Vendas, instalação e projetos VRF
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleOptionClick('produto')}
                className="w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50 text-left transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-emerald-950 dark:text-emerald-100">
                      Dúvidas sobre Produtos da Loja
                    </span>
                    <span className="block text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                      Preços, estoque e pronta entrega
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleOptionClick('suporte')}
                className="w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                      Suporte Técnico & Manutenção
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      Assistência técnica especializada
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Interactive Custom Message Form */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 sm:p-3.5 bg-slate-100/90 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700/80 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Digite sua dúvida ou mensagem..."
              className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem no WhatsApp"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Link Footer */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-200/60 dark:border-slate-800/60">
            <a
              href={`https://wa.me/${ZION_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp Direto ({ZION_WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Teaser Bubble (shows on initial visit or hover) */}
      {!isOpen && showTeaser && (
        <div
          role="region"
          aria-label="Aviso de atendimento WhatsApp"
          className="mb-3 max-w-[270px] sm:max-w-[310px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-3.5 rounded-2xl rounded-br-sm shadow-xl border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300 relative cursor-pointer group"
          onClick={handleToggleOpen}
        >
          <button
            type="button"
            onClick={handleDismissTeaser}
            aria-label="Dispensar aviso"
            className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-2.5 pr-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Precisa de ajuda agora?
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                Fale com nossos especialistas em Solar & Climatização no WhatsApp!
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1.5 group-hover:underline">
                Iniciar conversa <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Hover Tooltip (when teaser is closed) */}
      {!isOpen && !showTeaser && (
        <div className="hidden lg:flex items-center mb-2 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-800 text-white text-xs font-medium shadow-lg border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          <span>WhatsApp Oficial: {ZION_WHATSAPP_DISPLAY}</span>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <button
          id="btn-whatsapp-floating"
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar atendimento WhatsApp' : 'Abrir atendimento WhatsApp da Zion Confort Line'}
          className={`relative flex items-center justify-center w-15 h-15 rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 shadow-2xl ${
            isOpen
              ? 'bg-slate-800 dark:bg-slate-700 rotate-90 scale-95 shadow-slate-900/30'
              : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:to-green-400 shadow-emerald-500/40 hover:scale-110 active:scale-95'
          }`}
          style={{ width: '3.75rem', height: '3.75rem' }}
        >
          {/* Subtle breathing ripple when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25 pointer-events-none"></span>
              <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-sm pointer-events-none"></span>
            </>
          )}

          {isOpen ? (
            <X className="w-7 h-7 text-white transition-transform duration-200" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-white filter drop-shadow transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}

          {/* Live Online Badge dot */}
          {!isOpen && (
            <span
              className="absolute -top-1 -right-1 flex h-4 w-4"
              title="Equipe Zion Online"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white dark:border-slate-900 shadow-sm"></span>
            </span>
          )}

          {/* Notification Ping Badge */}
          {!isOpen && !showTeaser && (
            <span className="absolute -top-1 -left-1 flex items-center justify-center w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
              1
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
