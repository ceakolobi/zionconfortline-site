import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Bed,
  Refrigerator,
  ShieldCheck,
  Cpu,
  Wrench,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { navigateTo } = useApp();

  const categoryCards = [
    {
      id: 'solar',
      name: 'Energia Solar',
      desc: 'Kits fotovoltaicos completos, inversores inteligentes, painéis e baterias.',
      icon: Sun,
      color: 'from-amber-500 to-amber-600',
      badge: 'Economia de 95%',
      targetRoute: 'solar',
      img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'conforto',
      name: 'Conforto & Colchões',
      desc: 'Colchões magnéticos, ortopédicos, vibromassagem e poltronas ergonômicas.',
      icon: Bed,
      color: 'from-sky-500 to-sky-600',
      badge: 'Linha Saúde',
      targetRoute: 'produtos',
      categoryFilter: 'conforto',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'eletro',
      name: 'Eletrodomésticos',
      desc: 'Ar-condicionado Inverter, cooktops e refrigeração de alta eficiência.',
      icon: Refrigerator,
      color: 'from-indigo-500 to-indigo-600',
      badge: 'Selo Procel A',
      targetRoute: 'produtos',
      categoryFilter: 'eletro',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'seguranca',
      name: 'Segurança Eletrônica',
      desc: 'Câmeras 4K com inteligência artificial, alarmes e fechaduras biométricas.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-emerald-600',
      badge: 'Proteção 24/7',
      targetRoute: 'produtos',
      categoryFilter: 'seguranca',
      img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'eletronicos',
      name: 'Eletrônicos & Automação',
      desc: 'Dispositivos inteligentes, centrais smart home e iluminação conectada.',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      badge: 'Smart Living',
      targetRoute: 'produtos',
      categoryFilter: 'eletronicos',
      img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'servicos',
      name: 'Serviços Especializados',
      desc: 'Projetos de engenharia, homologação com concessionária e manutenção.',
      icon: Wrench,
      color: 'from-rose-500 to-rose-600',
      badge: 'Engenharia CREA',
      targetRoute: 'servicos',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="categorias-section" className="py-20 bg-slate-100 dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Ecossistema Completo
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Categorias de Soluções Zion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Estrutura dinâmica pensada para atender todas as necessidades da sua residência, comércio ou indústria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() =>
                  navigateTo(card.targetRoute, card.categoryFilter ? { category: card.categoryFilter } : undefined)
                }
                className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-400/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Image backdrop preview */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[11px] font-bold">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {card.name}
                      </h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  <span>Acessar área completa</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
