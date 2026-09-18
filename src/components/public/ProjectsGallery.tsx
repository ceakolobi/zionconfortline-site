import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Sun,
  Layers,
  Zap,
  DollarSign,
  Calendar,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { SolarProjectType } from '../../types';

export const ProjectsGallery: React.FC = () => {
  const { solarProjects } = useApp();
  const [selectedType, setSelectedType] = useState<string>('todos');

  const filteredProjects = selectedType === 'todos'
    ? solarProjects
    : solarProjects.filter((p) => p.type === selectedType);

  const filters: { id: string; label: string }[] = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'Residencial', label: 'Residenciais' },
    { id: 'Comercial', label: 'Comerciais' },
    { id: 'Industrial', label: 'Industriais' },
    { id: 'Rural', label: 'Rurais & Usinas' },
  ];

  return (
    <section id="projetos-section" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Casos de Sucesso Comprovados
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Projetos Realizados Zion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Confira instalações fotovoltaicas já homologadas e gerando economia real para residências, indústrias e fazendas.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedType(f.id)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedType === f.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={project.coverImage || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Type Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-slate-700">
                    {project.type}
                  </span>

                  {/* Status Badge */}
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-semibold border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {project.status}
                  </span>

                  {/* Title and Location overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.city} - {project.state}</span>
                      <span className="text-slate-300">• {project.clientName}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Metrics Bar */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Potência</span>
                      <strong className="font-display text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
                        {project.powerKwp} kWp
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Painéis</span>
                      <strong className="text-slate-900 dark:text-white font-display text-sm sm:text-base font-bold">
                        {project.panelsCount} un.
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Geração Média</span>
                      <strong className="text-slate-900 dark:text-white font-display text-sm sm:text-base font-bold">
                        {formatNumber(project.monthlyGenerationKwh)} kWh/m
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Economia/mês</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-display text-sm sm:text-base font-bold">
                        {formatCurrency(project.avgBillSaving)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Technical Equipment */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Módulos: <strong className="text-slate-700 dark:text-slate-300">{project.panelsModel}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Inversor: <strong className="text-slate-700 dark:text-slate-300">{project.inverterModel}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
