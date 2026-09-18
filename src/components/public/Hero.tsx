import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  ShieldCheck,
  Zap,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Award,
  BarChart3,
  CheckCircle2,
  Play,
  Pause,
  Video,
} from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const Hero: React.FC = () => {
  const { navigateTo } = useApp();
  const whatsappUrl = generateWhatsAppUrl({ type: 'geral' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy without user gesture
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="relative bg-slate-950 text-white pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden min-h-[660px] flex flex-col justify-between">
      {/* Background Solar Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/solar-poster.jpg"
          className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-[1.08] transition-opacity duration-1000"
        >
          <source src="/videos/solar-bg.mp4" type="video/mp4" />
          {/* Fallback image if video cannot be rendered */}
          <img
            src="/videos/solar-poster.jpg"
            alt="Plano de fundo Usina Solar Zion"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Sophisticated Multi-layer Cinematic Overlay for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_50%)]" />
      </div>

      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-amber-500/10 blur-3xl pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-lg shadow-black/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span>Zion Confort Line • Engenharia Solar & Conforto</span>
            </div>

            {/* Main Title */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-lg">
              Conforto, tecnologia, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                energia limpa
              </span>{' '}
              e soluções para o seu dia a dia.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-md">
              Da geração solar fotovoltaica com até <strong>95% de economia</strong> na sua conta aos
              mais sofisticados colchões magnéticos, eletrodomésticos inteligentes e sistemas de segurança eletrônica.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-btn-solutions"
                onClick={() => navigateTo('produtos')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <span>Conheça nossas soluções</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                id="hero-btn-specialist"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-white font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2.5 hover:border-slate-500 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Falar com um especialista</span>
              </a>

              <button
                id="hero-btn-calculator"
                onClick={() => navigateTo('calculadora')}
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-500/40 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Simular Economia Solar</span>
              </button>
            </div>

            {/* Key Trust Points */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white">Até 95%</div>
                <div className="text-[11px] text-slate-300 font-medium">Economia na conta de luz</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white">25 Anos</div>
                <div className="text-[11px] text-slate-300 font-medium">Garantia linear solar</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white">100% Homologado</div>
                <div className="text-[11px] text-slate-300 font-medium">Equipe técnica com CREA</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-slate-700/70 shadow-inner">
                  <img
                    src="/videos/solar-poster.jpg"
                    alt="Instalação de Energia Solar Zion Confort Line"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Instalações Residenciais & PJ
                    </span>
                  </div>
                </div>

                {/* Floating Metrics Badge in Card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-white">
                        Engenharia Fotovoltaica & Conforto
                      </h3>
                      <p className="text-xs text-slate-400">Atendimento rápido com consultores dedicados</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      ZCL
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
                      <div className="text-slate-400 text-[10px]">Retorno Médio (Payback)</div>
                      <div className="font-bold text-amber-400 text-sm mt-0.5">2.5 a 3.5 Anos</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
                      <div className="text-slate-400 text-[10px]">Telemetria em Tempo Real</div>
                      <div className="font-bold text-emerald-400 text-sm mt-0.5 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Portal do Cliente
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo('calculadora')}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Sun className="w-4 h-4" />
                      <span>Calcular Minha Economia Agora</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls Bar in Footer of Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between text-xs text-slate-400">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-[11px]">
          <Video className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300 font-medium">Equipe Técnica & Instalação em Campo</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <button
          id="hero-toggle-video"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white transition-all text-[11px]"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400" />
              <span>Pausar Vídeo</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Reproduzir Vídeo</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
