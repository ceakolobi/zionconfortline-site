import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export const AdminLoginGate: React.FC = () => {
  const { loginAdmin, navigateTo, brandSettings, theme } = useApp();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin@admin.com');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password);
      if (!result.success) {
        setErrorMsg(result.message || 'Credenciais de administrador incorretas.');
      }
      setIsLoading(false);
    }, 300);
  };

  const fillDefaultCredentials = () => {
    setEmail('admin@admin.com');
    setPassword('admin@admin.com');
    setErrorMsg('');
  };

  const headerLogoUrl =
    theme === 'dark'
      ? brandSettings.headerLogo.whiteUrl || brandSettings.headerLogo.coloredUrl
      : brandSettings.headerLogo.coloredUrl || brandSettings.headerLogo.whiteUrl;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início do Site</span>
        </button>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo / Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 mb-4 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>

            {headerLogoUrl && (
              <div className="flex justify-center mb-3">
                <img
                  src={headerLogoUrl}
                  alt="Zion Confort Line"
                  style={{ height: '36px' }}
                  className="object-contain"
                />
              </div>
            )}

            <h2 className="font-display text-2xl font-black tracking-tight text-white">
              Painel Administrativo
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Acesso restrito à gestão de catálogo, pedidos, branding e configurações.
            </p>
          </div>

          {/* Informational Callout: Default Credentials */}
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex flex-col gap-2">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Credenciais Padrão:</span>
              </span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-[11px] underline hover:text-amber-100 transition-colors"
              >
                Preencher
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2 rounded-xl font-mono border border-amber-500/20">
              <div>
                <span className="text-slate-400">Login: </span>
                <strong className="text-amber-300">admin@admin.com</strong>
              </div>
              <div>
                <span className="text-slate-400">Senha: </span>
                <strong className="text-amber-300">admin@admin.com</strong>
              </div>
            </div>
            <p className="text-[10px] text-amber-300/70">
              * Você poderá alterar tanto o login quanto a senha assim que estiver dentro do painel.
            </p>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                E-mail de Login
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@admin.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-900/40 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acessar Painel Administrativo</span>
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sessão protegida por criptografia e persistência segura</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
