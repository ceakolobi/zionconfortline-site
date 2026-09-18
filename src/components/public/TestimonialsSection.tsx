import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Fernando Vasconcelos',
      role: 'Médico Cirurgião • Residência Alphaville',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      comment:
        'Instalei o sistema solar híbrido com bateria e agora não me preocupo mais com oscilações da rede. Minha conta de luz caiu de R$ 1.450 para a taxa mínima de R$ 78. A equipe da Zion cuidou de toda a burocracia com a concessionária.',
      rating: 5,
      type: 'Energia Solar Residencial',
    },
    {
      name: 'Juliana Castro',
      role: 'Proprietária Residencial • Valinhos SP',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      comment:
        'Adquiri o colchão magnético ortopédico com vibromassagem e meu sono mudou completamente. Minhas dores na lombar sumiram em menos de 3 semanas. Atendimento impecável do vendedor Rodrigo e entrega antes do prazo!',
      rating: 5,
      type: 'Conforto & Saúde',
    },
    {
      name: 'Marcelo Penteado',
      role: 'Diretor de Operações • Supermercados Bom Preço',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      comment:
        'A usina comercial de 125 kWp reduziu nossos custos operacionais de forma drástica. O acompanhamento em tempo real pelo Portal do Cliente e a rápida homologação mostram a seriedade técnica da engenharia Zion.',
      rating: 5,
      type: 'Energia Solar Comercial PJ',
    },
  ];

  return (
    <section id="depoimentos-section" className="py-24 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Quote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Depoimentos Reais de Clientes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Histórias reais de economia, bem-estar e parceria duradoura com a Zion Confort Line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 ml-1">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{t.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
