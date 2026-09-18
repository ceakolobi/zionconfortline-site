import React from 'react';
import { MOCK_SERVICES } from '../../data/mockData';
import {
  FileCheck,
  Sparkles,
  ShieldCheck,
  LineChart,
  Clock,
  ArrowRight,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const ServicesSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    FileCheck,
    Sparkles,
    ShieldCheck,
    LineChart,
  };

  return (
    <section id="servicos-section" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Engenharia & Soluções Técnicas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Serviços Especializados Zion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Equipe qualificada com responsabilidade técnica registrada no CREA para garantir segurança, conformidade e máximo rendimento.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Wrench;
            const whatsappServiceUrl = generateWhatsAppUrl({
              type: 'servico',
              serviceName: service.name,
            });

            return (
              <div
                key={service.id}
                className="bg-slate-50 dark:bg-slate-950/70 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Tipo de Cobrança
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold">
                        {service.billingType}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature check list */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Prazo: <strong>{service.leadTime}</strong></span>
                  </div>

                  <a
                    href={whatsappServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Contratar ou Agendar</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
