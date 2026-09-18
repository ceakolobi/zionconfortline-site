import React from 'react';
import { SolarSection } from '../components/public/SolarSection';
import { SolarCalculator } from '../components/public/SolarCalculator';
import { ProjectsGallery } from '../components/public/ProjectsGallery';
import { ContactSection } from '../components/public/ContactSection';
import { FaqSection } from '../components/public/FaqSection';
import { Sun, ShieldCheck, Zap, Activity } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export const SolarLandingPage: React.FC = () => {
  const whatsappUrl = generateWhatsAppUrl({ type: 'solar_orcamento' });

  return (
    <div className="space-y-0">
      {/* Solar Hero Banner with Video Background */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/solar-poster.jpg"
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1] scale-105"
          >
            <source src="/videos/solar-bg.mp4" type="video/mp4" />
            <img
              src="/videos/solar-poster.jpg"
              alt="Instalação Solar"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sun className="w-4 h-4" />
            Engenharia Solar Fotovoltaica com Homologação Rápida
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Gere sua própria energia e economize até 95% na conta de luz
          </h1>
          <p className="text-slate-300 text-xs sm:text-base mt-4 leading-relaxed font-normal">
            Projetos residenciais, comerciais, industriais e usinas rurais com equipamentos Tier 1, inversores de alta eficiência e 25 anos de garantia.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#calculadora-section"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              Calcular Economia com Simulador
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              Falar com Engenheiro no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SolarSection />
      <SolarCalculator />
      <ProjectsGallery />
      <FaqSection />
      <ContactSection />
    </div>
  );
};
