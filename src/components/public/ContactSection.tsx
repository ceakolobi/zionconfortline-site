import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const { addLead, showNotification } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('SP');
  const [interestType, setInterestType] = useState<'Energia Solar' | 'Produtos' | 'Serviços' | 'Segurança' | 'Conforto'>('Energia Solar');
  const [estimatedBudget, setEstimatedBudget] = useState('15000');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showNotification('Preencha seu nome e telefone para contato.', 'error');
      return;
    }

    addLead({
      name,
      email: email || 'contato@cliente.com',
      phone,
      city: city || 'São Paulo',
      state: stateCode,
      interestType,
      estimatedValue: Number(estimatedBudget) || 10000,
      status: 'Novo',
    });

    setSent(true);
    showNotification('Mensagem enviada! Um consultor comercial entrará em contato.', 'success');
  };

  const directWhatsapp = generateWhatsAppUrl({ type: 'geral' });

  return (
    <section id="contato-section" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Fale Conosco
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Estamos prontos para atender você
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Solicite uma proposta personalizada, agende uma visita técnica ou tire dúvidas sobre nossas soluções de energia e conforto.
              </p>
            </div>

            {/* Direct Contacts List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Telefone Comercial</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">(11) 97123-8899</p>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Atendimento de Segunda a Sexta das 8h às 18h</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">WhatsApp Oficial</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">(11) 97123-8899</p>
                  <a
                    href={directWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Iniciar conversa imediata →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">E-mail Corporativo</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">contato@zionconfortline.com.br</p>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Retorno em até 24 horas úteis</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Atendimento Presencial & Obras</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">São Paulo - SP • Atendimento em todo o território nacional</p>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Domínio oficial: zionconfortline.com.br</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-slate-950/70 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xs">
              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Mensagem Enviada!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Obrigado pelo contato! Seus dados foram encaminhados com sucesso para nossa equipe técnica e comercial. Em breve entraremos em contato.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Solicitar Orçamento ou Contato
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4 text-xs">
                    Preencha os campos abaixo para receber um contato personalizado do nosso consultor.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Roberto Silva"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">WhatsApp / Telefone *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">E-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Área de Interesse</label>
                      <select
                        value={interestType}
                        onChange={(e) => setInterestType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="Energia Solar">Energia Solar Fotovoltaica</option>
                        <option value="Conforto">Colchões & Conforto Terapêutico</option>
                        <option value="Segurança">Segurança Eletrônica & Câmeras</option>
                        <option value="Produtos">Produtos & Eletrodomésticos</option>
                        <option value="Serviços">Engenharia & Homologação</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Cidade</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: Campinas"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Estado</label>
                      <select
                        value={stateCode}
                        onChange={(e) => setStateCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="SP">São Paulo (SP)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PR">Paraná (PR)</option>
                        <option value="Outro">Outro Estado</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Mensagem ou Detalhes da Instalação (opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Conte um pouco sobre sua conta de luz, endereço ou tipo de produto que procura..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Enviar Solicitação de Orçamento</span>
                  </button>

                  <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                    Seus dados estão protegidos de acordo com a LGPD e serão utilizados unicamente para elaboração da sua proposta.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
