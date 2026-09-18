import React from 'react';
import {
  Users,
  Award,
  Headphones,
  ShieldCheck,
  Cpu,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: 'Atendimento Especializado',
      desc: 'Consultores técnicos dedicados para entender sua real necessidade e propor o dimensionamento ideal sem desperdício.',
      icon: Users,
    },
    {
      title: 'Produtos Selecionados',
      desc: 'Trabalhamos exclusivamente com fabricantes Tier 1 globais, componentes testados em laboratório e garantia comprovada.',
      icon: Award,
    },
    {
      title: 'Suporte Contínuo & Pós-Venda',
      desc: 'Acompanhamento preventivo da sua usina solar e canais ágeis via Portal do Cliente e WhatsApp oficial.',
      icon: Headphones,
    },
    {
      title: 'Segurança & Engenharia com ART',
      desc: 'Projetos elétricos com Anotação de Responsabilidade Técnica emitida junto ao CREA, atendendo a todas as normas ABNT.',
      icon: ShieldCheck,
    },
    {
      title: 'Tecnologia de Ponta',
      desc: 'Inversores com telemetria Wi-Fi em nuvem, câmeras com inteligência artificial e colchões com magnetoterapia avançada.',
      icon: Cpu,
    },
    {
      title: 'Soluções Personalizadas',
      desc: 'Do projeto solar sob medida à automação corporativa, criamos pacotes integrados que maximizam seu retorno.',
      icon: Sliders,
    },
  ];

  return (
    <section id="beneficios-section" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Por que escolher a Zion
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Excelência, Confiabilidade & Inovação
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Nossos pilares corporativos para entregar máxima rentabilidade e qualidade de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-xs hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
