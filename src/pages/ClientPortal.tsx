import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Zap,
  TrendingUp,
  DollarSign,
  Leaf,
  FileText,
  Download,
  AlertCircle,
  HelpCircle,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const ClientPortal: React.FC = () => {
  const { currentUser, clientTelemetry, showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'geracao' | 'documentos' | 'suporte'>('geracao');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const clientDocuments = [
    { name: 'ART - Anotação de Responsabilidade Técnica (CREA-SP)', date: '15/05/2025', type: 'Engenharia Legal' },
    { name: 'Parecer de Acesso e Homologação Enel Distribuição', date: '22/05/2025', type: 'Concessionária' },
    { name: 'Certificado de Garantia de 25 Anos dos Painéis Solares', date: '28/05/2025', type: 'Fabricante' },
    { name: 'Diagrama Unifilar e Memorial Descritivo de Instalação', date: '10/05/2025', type: 'Projeto Executivo' },
  ];

  const handleSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) {
      showNotification('Preencha o assunto e a descrição do chamado.', 'error');
      return;
    }
    setTicketSent(true);
    showNotification('Chamado técnico aberto com sucesso! Protocolo #ZCL-' + Math.floor(Math.random() * 8999 + 1000), 'success');
  };

  const handleDownloadDoc = (docName: string) => {
    showNotification(`Iniciando download seguro: ${docName}`, 'info');
  };

  return (
    <div className="py-10 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Usina Solar Fotovoltaica Conectada e Operacional</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Portal do Cliente Zion • {currentUser?.name || 'Juliana Castro'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Unidade Consumidora: <strong>UC-38291048-SP</strong> • Concessionária: <strong>Enel Distribuição</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Inversor: <strong>Deye 10kW On-Grid</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold">
              Status: {clientTelemetry.inverterStatus}
            </span>
          </div>
        </div>

        {/* Portal Tabs */}
        <div className="flex items-center gap-3 my-8 border-b border-slate-800 pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('geracao')}
            className={`pb-2 px-3 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'geracao'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Telemetria & Geração Solar</span>
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`pb-2 px-3 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'documentos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documentos, ART & Faturas ({clientDocuments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('suporte')}
            className={`pb-2 px-3 transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'suporte'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Suporte Técnico & Manutenção</span>
          </button>
        </div>

        {/* Tab 1: Telemetria & Geração */}
        {activeTab === 'geracao' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Daily */}
              <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Produção Hoje</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {clientTelemetry.dailyGenerationKwh} <span className="text-sm font-normal text-slate-400">kWh</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>Pico de potência às 12:45</span>
                  </div>
                </div>
              </div>

              {/* Monthly */}
              <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Geração do Mês</span>
                  <Calendar className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {formatNumber(clientTelemetry.monthlyGenerationKwh)}{' '}
                    <span className="text-sm font-normal text-slate-400">kWh</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Meta mensal prevista: <strong>920 kWh</strong>
                  </div>
                </div>
              </div>

              {/* Total Savings */}
              <div className="bg-slate-950/80 p-5 rounded-3xl border border-amber-500/30 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-bold">
                  <span>Economia Acumulada</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-emerald-400">
                    {formatCurrency(clientTelemetry.estimatedSavingsMonthBrl * 12)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Valor poupado da concessionária
                  </div>
                </div>
              </div>

              {/* Eco Impact */}
              <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Impacto Ecológico</span>
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {clientTelemetry.treesPlantedEquivalent}{' '}
                    <span className="text-sm font-normal text-slate-400">árvores</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    -{clientTelemetry.co2AvoidedKg} kg de CO₂ emitidos
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Hourly / Monthly Bar Chart View */}
            <div className="bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    Histórico Mensal de Geração Solar (kWh)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Comparativo entre geração solar entregue e créditos acumulados com a rede pública.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
                    Geração Solar
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 font-semibold ml-3">
                    <span className="w-3 h-3 rounded-sm bg-slate-700 inline-block" />
                    Consumo Casa
                  </span>
                </div>
              </div>

              {/* Chart Bars */}
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-3 items-end h-56 pt-6 pb-2 border-b border-slate-800">
                {clientTelemetry.monthlyHistory.map((item, idx) => {
                  const maxVal = 1050;
                  const genHeight = Math.min(100, Math.round((item.generationKwh / maxVal) * 100));
                  const consHeight = Math.min(100, Math.round((item.consumptionKwh / maxVal) * 100));

                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* Geração Bar */}
                        <div
                          style={{ height: `${genHeight}%` }}
                          className="w-3 sm:w-4 bg-amber-500 rounded-t-md group-hover:bg-amber-400 transition-all relative"
                          title={`Geração: ${item.generationKwh} kWh`}
                        />
                        {/* Consumo Bar */}
                        <div
                          style={{ height: `${consHeight}%` }}
                          className="w-3 sm:w-4 bg-slate-700 rounded-t-md group-hover:bg-slate-600 transition-all relative"
                          title={`Consumo: ${item.consumptionKwh} kWh`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-2">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                <span>Total de créditos energéticos acumulados: <strong>1.420 kWh</strong></span>
                <span className="text-emerald-400 font-semibold">
                  Saldo positivo para compensar nos próximos 60 meses
                </span>
              </div>
            </div>

            {/* Technical Specs Details */}
            <div className="bg-slate-950/60 rounded-3xl p-6 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <div className="text-slate-400 uppercase font-bold text-[10px]">Data de Ativação</div>
                <div className="font-bold text-white text-sm mt-1">15/05/2025</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Homologado sem ressalvas</div>
              </div>
              <div>
                <div className="text-slate-400 uppercase font-bold text-[10px]">Próxima Manutenção Preventiva</div>
                <div className="font-bold text-amber-400 text-sm mt-1">
                  15/11/2026
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">Lavagem de módulos e reaperto</div>
              </div>
              <div>
                <div className="text-slate-400 uppercase font-bold text-[10px]">Garantia de Módulos Restante</div>
                <div className="font-bold text-white text-sm mt-1">24 anos e 4 meses</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Garantia linear Tier 1</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Documentos & Faturas */}
        {activeTab === 'documentos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-950/80 rounded-3xl border border-slate-800 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="font-display text-lg font-bold text-white">
                  Documentação Técnica, ART & Certificados
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Acesse ou baixe os documentos oficiais do seu projeto fotovoltaico e compras homologadas.
                </p>
              </div>

              <div className="space-y-3">
                {clientDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{doc.name}</div>
                        <div className="text-[11px] text-slate-500">
                          Data de Emissão: {doc.date} • Categoria: {doc.type}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc.name)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Baixar</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Suporte Técnico */}
        {activeTab === 'suporte' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-950/80 rounded-3xl border border-slate-800 p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Abrir Chamado Técnico ou Solicitar Manutenção
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Nossa engenharia atende chamados preventivos e corretivos com prazo de resposta de até 4 horas úteis.
              </p>

              {ticketSent ? (
                <div className="text-center py-8 bg-emerald-950/50 border border-emerald-800 rounded-2xl p-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Chamado Aberto com Sucesso!</h4>
                  <p className="text-xs text-emerald-200">
                    O time técnico da Zion Confort Line recebeu sua notificação. Você também receberá uma cópia no seu WhatsApp cadastrado.
                  </p>
                  <button
                    onClick={() => {
                      setTicketSent(false);
                      setTicketSubject('');
                      setTicketMsg('');
                    }}
                    className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-xl"
                  >
                    Abrir novo chamado
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupportTicket} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Motivo do Chamado</label>
                    <select
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="">Selecione o assunto...</option>
                      <option value="Lavagem e Manutenção Preventiva de Módulos">
                        Agendar Lavagem Técnica dos Painéis
                      </option>
                      <option value="Dúvidas sobre Fatura da Concessionária">
                        Dúvidas sobre Compensação na Conta da Enel/CPFL
                      </option>
                      <option value="Alerta de Comunicação Wi-Fi Inversor">
                        Inversor desconectado do Wi-Fi
                      </option>
                      <option value="Ampliação do Sistema Fotovoltaico">
                        Quero ampliar a quantidade de painéis
                      </option>
                      <option value="Outro">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Descrição Detalhada</label>
                    <textarea
                      rows={4}
                      value={ticketMsg}
                      onChange={(e) => setTicketMsg(e.target.value)}
                      required
                      placeholder="Descreva o que está ocorrendo ou a melhor data para visita..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Registrar Chamado na Engenharia
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
