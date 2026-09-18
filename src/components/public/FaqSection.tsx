import React, { useState } from 'react';
import { MOCK_FAQS } from '../../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappFaqUrl = generateWhatsAppUrl({ type: 'geral' });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Tire Suas Dúvidas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Respostas claras sobre nossos projetos de energia solar, produtos de conforto e atendimento.
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/60 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 bg-white dark:bg-slate-900 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mb-3">
            Ainda tem dúvidas sobre o seu telhado, projeto solar ou produtos?
          </p>
          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com um Consultor Técnico no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
