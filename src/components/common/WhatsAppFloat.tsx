import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = generateWhatsAppUrl({ type: 'geral' });

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group"
    >
      <div className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <span>Fale com a Zion no WhatsApp</span>
      </div>

      <a
        id="btn-whatsapp-floating"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp da Zion Confort Line"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </aside>
  );
};
