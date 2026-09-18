import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Home,
  Building,
  Factory,
  Tractor,
  Activity,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const SolarSection: React.FC = () => {
  const { navigateTo } = useApp();
  const whatsappBudgetUrl = generateWhatsAppUrl({ type: 'solar_orcamento' });

  const solarSolutions = [
    {
      title: 'Energia Solar Residencial',
      desc: 'Adequada para casas e sobrados. Reduza até 95% da conta de luz e valorize seu imóvel em até 10% no mercado imobiliário.',
      icon: Home,
      stat: 'Economia de até R$ 800+/mês',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Energia Solar Comercial',
      desc: 'Ideal para supermercados, padarias, clínicas, academias e escritórios com alto uso diurno de ar-condicionado e maquinário.',
      icon: Building,
      stat: 'Retorno em ~2.8 anos',
      img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Energia Solar Industrial',
      desc: 'Sistemas de alta tensão (Grupo A) com dimensionamento de demanda contratada e mitigação de encargos setoriais pesados.',
      icon: Factory,
      stat: 'Usinas de 100 kWp a 1 MWp+',
      img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Energia Solar Rural & Agronegócio',
      desc: 'Autonomia para pivôs de irrigação, granjas, resfriadores de leite e galpões rurais, imunes a oscilações da concessionária.',
      icon: Tractor,
      stat: 'Linhas Pronaf & FCO Solar',
      img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Monitoramento Inteligente & Telemetria',
      desc: 'Acompanhe a geração minuto a minuto no Portal do Cliente Zion, com alertas preventivos caso algum módulo sofra sombreamento.',
      icon: Activity,
      stat: 'App com IA em Tempo Real',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Manutenção & Engenharia de Homologação',
      desc: 'Equipe técnica própria com registro no CREA-SP. Lavagem técnica com água desmineralizada e termografia preventiva.',
      icon: Wrench,
      stat: 'Garantia total de aprovação',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="solar-section" className="py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Especialistas em Energia Solar Fotovoltaica
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Sua própria usina geradora de economia e sustentabilidade
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Soluções completas com os melhores fabricantes mundiais Tier 1, inversores inteligentes, projeto de engenharia com ART e homologação rápida em qualquer concessionária do Brasil.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigateTo('calculadora')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Simular na Calculadora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappBudgetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Solicitar Orçamento</span>
            </a>
          </div>
        </div>

        {/* Grid of 6 Solar Segments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solarSolutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-amber-400 dark:hover:border-amber-400/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold">
                      {item.stat}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs">
                  <a
                    href={whatsappBudgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Pedir proposta para este tipo</span>
                    <span>→</span>
                  </a>
                  <span className="text-[11px] text-slate-400 font-medium">CREA Ativo</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">25 Anos de Garantia</div>
              <div className="text-slate-500 dark:text-slate-400">Módulos solares Tier 1 com seguro</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Projeto Elétrico com ART</div>
              <div className="text-slate-500 dark:text-slate-400">Engenheiros registrados e habilitados</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Monitoramento em Tempo Real</div>
              <div className="text-slate-500 dark:text-slate-400">Acesso exclusivo ao Portal do Cliente</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Financiamento Facilitado</div>
              <div className="text-slate-500 dark:text-slate-400">Parcerias com BV, Santander e Sicredi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
