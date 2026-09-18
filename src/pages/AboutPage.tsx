import React from 'react';
import { ShieldCheck, Sun, Target, Eye, Award, CheckCircle2, Users } from 'lucide-react';
import { BenefitsSection } from '../components/public/BenefitsSection';
import { ContactSection } from '../components/public/ContactSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 block">
            Institucional Zion Confort Line
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Engenharia de precisão, conforto e energia sustentável
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base mt-4 leading-relaxed">
            Nascemos para conectar pessoas e empresas ao melhor da tecnologia em geração solar fotovoltaica, bem-estar ortopédico magnético e segurança eletrônica inteligente.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Nossa Missão</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Proporcionar independência energética e qualidade de vida por meio de soluções tecnológicas de alta performance, entregando economia financeira e bem-estar contínuo.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Nossa Visão</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Ser a principal referência multissetorial em soluções integradas para o lar e empresas em todo o território nacional, reconhecida pela excelência em engenharia e satisfação do cliente.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Nossos Valores</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Ética inegociável, conformidade com normas técnicas e regulatórias (CREA, Aneel, ABNT), responsabilidade socioambiental e atendimento focado nas reais necessidades do usuário.
            </p>
          </div>
        </div>
      </div>

      <BenefitsSection />
      <ContactSection />
    </div>
  );
};
