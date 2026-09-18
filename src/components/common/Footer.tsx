import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';
import { LgpdModal } from '../legal/LgpdModal';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'lgpd' | 'cookies' | null>(null);

  const whatsappUrl = generateWhatsAppUrl({ type: 'geral' });

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12">
      {/* Top Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-8 sm:p-12 overflow-hidden shadow-2xl text-slate-950 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Eficiência e Sustentabilidade
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mb-2">
              Pronto para transformar a energia e o conforto do seu lar ou empresa?
            </h3>
            <p className="text-slate-900 text-xs sm:text-sm font-medium">
              Fale agora com nosso time de especialistas e receba um estudo preliminar sem compromisso.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigateTo('calculadora')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Simular na Calculadora Solar</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
        {/* Col 1: About */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Sun className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-display font-extrabold text-xl text-white">
                ZION <span className="text-amber-400 font-light">CONFORT</span>
              </div>
              <div className="text-[10px] tracking-[0.25em] text-slate-400 font-semibold uppercase">
                Line Solutions
              </div>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            A <strong>Zion Confort Line</strong> une engenharia solar de alta performance, produtos de tecnologia,
            segurança eletrônica inteligente e soluções de conforto para o bem-estar e economia da sua família e da sua empresa.
          </p>

          <div className="pt-2 space-y-2 text-slate-300">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>(11) 97123-8899 (Atendimento Comercial e WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>contato@zionconfortline.com.br</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>São Paulo - SP • Atendimento em todo o território nacional</span>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase">Navegação</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">
                Início
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('sobre')} className="hover:text-amber-400 transition-colors">
                Sobre a Zion Confort Line
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('solar')} className="hover:text-amber-400 transition-colors">
                Energia Solar Fotovoltaica
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('produtos')} className="hover:text-amber-400 transition-colors">
                Produtos & Loja Virtual
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('servicos')} className="hover:text-amber-400 transition-colors">
                Serviços Especializados
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('projetos')} className="hover:text-amber-400 transition-colors">
                Projetos Executados
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('calculadora')} className="hover:text-amber-400 transition-colors">
                Calculadora Solar Online
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Categorias */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase">Categorias</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => navigateTo('produtos', { category: 'solar' })} className="hover:text-amber-400">
                Sistemas Fotovoltaicos
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('produtos', { category: 'conforto' })} className="hover:text-amber-400">
                Colchões Magnéticos & Conforto
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('produtos', { category: 'eletro' })} className="hover:text-amber-400">
                Eletrodomésticos Inverter
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('produtos', { category: 'seguranca' })} className="hover:text-amber-400">
                Segurança Eletrônica & CFTV
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('produtos', { category: 'eletronicos' })} className="hover:text-amber-400">
                Eletrônicos & Smart Home
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('servicos')} className="hover:text-amber-400">
                Homologação e Manutenção
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Portais & Acesso */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase">Portais Exclusivos</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => navigateTo('cliente')} className="hover:text-emerald-400 font-medium">
                Portal do Cliente (Telemetria)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('vendedor')} className="hover:text-amber-400 font-medium">
                Portal do Vendedor (CRM & Leads)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="hover:text-rose-400 font-medium">
                Painel Administrativo
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin', { category: 'integracoes' })} className="hover:text-sky-400">
                Central de APIs & Webhooks
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('blog')} className="hover:text-amber-400">
                Blog Informativo
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-amber-400">
                Perguntas Frequentes (FAQ)
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Legal Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} <strong>Zion Confort Line</strong> • Todos os direitos reservados.
          <span className="block sm:inline sm:ml-2 text-[11px] text-slate-600">
            Domínio Oficial: <a href="https://zionconfortline.com.br" className="text-amber-500 hover:underline">zionconfortline.com.br</a>
          </span>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <button onClick={() => setLegalModalType('privacy')} className="hover:text-white transition-colors">
            Política de Privacidade
          </button>
          <span>•</span>
          <button onClick={() => setLegalModalType('terms')} className="hover:text-white transition-colors">
            Termos de Uso
          </button>
          <span>•</span>
          <button onClick={() => setLegalModalType('lgpd')} className="hover:text-white transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>LGPD</span>
          </button>
          <span>•</span>
          <button onClick={() => setLegalModalType('cookies')} className="hover:text-white transition-colors">
            Cookies
          </button>
        </div>
      </div>

      <LgpdModal
        isOpen={!!legalModalType}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || 'privacy'}
      />
    </footer>
  );
};
