import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Calculator,
  Zap,
  TrendingDown,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const SolarCalculator: React.FC = () => {
  const { addLead, showNotification } = useApp();

  // Inputs
  const [billValue, setBillValue] = useState<number>(650);
  const [propertyType, setPropertyType] = useState<'Residencial' | 'Comercial' | 'Industrial' | 'Rural'>('Residencial');
  const [stateCode, setStateCode] = useState<string>('SP');
  const [cityName, setCityName] = useState<string>('São Paulo');
  const [panelWattage, setPanelWattage] = useState<number>(550); // W
  const [systemType, setSystemType] = useState<'On-Grid' | 'Híbrido com Bateria' | 'Zero Grid'>('On-Grid');
  const [tariffKwh, setTariffKwh] = useState<number>(0.92); // R$/kWh

  // Lead Generation form state inside calculator
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [submittedLead, setSubmittedLead] = useState(false);

  // Regional solar irradiation factors (HSP - Horas de Sol Pleno média)
  const regionalIrradiation: Record<string, number> = {
    SP: 4.65,
    RJ: 4.8,
    MG: 5.1,
    ES: 4.9,
    PR: 4.4,
    SC: 4.2,
    RS: 4.3,
    GO: 5.3,
    MT: 5.2,
    MS: 5.1,
    BA: 5.5,
    PE: 5.6,
    CE: 5.7,
  };

  const hsp = regionalIrradiation[stateCode] || 4.7;

  // Calculation Engine (Extensible for future external API)
  const calculation = useMemo(() => {
    // Estimativa de consumo em kWh a partir da conta
    const monthlyConsumptionKwh = billValue / tariffKwh;
    // Potência requerida em kWp = Consumo Mensal / (30 dias * HSP * taxa de desempenho 0.78)
    const requiredKwp = Math.max(1.2, monthlyConsumptionKwh / (30 * hsp * 0.78));
    // Quantidade de painéis arredondada para cima
    const panelPowerKw = panelWattage / 1000;
    const estimatedPanelsCount = Math.max(2, Math.ceil(requiredKwp / panelPowerKw));
    const realKwp = Number((estimatedPanelsCount * panelPowerKw).toFixed(2));
    // Geração mensal estimada
    const monthlyGenerationKwh = Math.round(realKwp * 30 * hsp * 0.78);
    // Economia mensal em R$ (descontando custo de disponibilidade da concessionária ~50 kWh)
    const netSavedKwh = Math.max(0, monthlyGenerationKwh - 50);
    const monthlySavingsBrl = Math.round(netSavedKwh * tariffKwh);
    const yearlySavingsBrl = monthlySavingsBrl * 12;
    // Estimativa de investimento médio de mercado
    const costPerKwp = systemType === 'Híbrido com Bateria' ? 4800 : 3400;
    const estimatedInvestmentBrl = Math.round(realKwp * costPerKwp);
    // Payback estimado em anos
    const paybackYears = Number((estimatedInvestmentBrl / (yearlySavingsBrl || 1)).toFixed(1));
    // 25 anos de economia líquida estimada (descontando o investimento)
    const total25YearsSavings = yearlySavingsBrl * 25 - estimatedInvestmentBrl;

    return {
      monthlyConsumptionKwh: Math.round(monthlyConsumptionKwh),
      requiredKwp: realKwp,
      estimatedPanelsCount,
      monthlyGenerationKwh,
      monthlySavingsBrl,
      yearlySavingsBrl,
      estimatedInvestmentBrl,
      paybackYears,
      total25YearsSavings: Math.max(0, total25YearsSavings),
      areaRequiredM2: Math.round(estimatedPanelsCount * 2.6),
    };
  }, [billValue, tariffKwh, hsp, panelWattage, systemType]);

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      showNotification('Por favor, preencha nome e WhatsApp para contato.', 'error');
      return;
    }

    addLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail || 'contato@cliente.com',
      city: cityName,
      state: stateCode,
      interestType: 'Energia Solar',
      estimatedValue: calculation.estimatedInvestmentBrl,
      status: 'Novo',
    });

    setSubmittedLead(true);
  };

  const calculatorWhatsappUrl = generateWhatsAppUrl({
    type: 'calculadora',
    solarKwp: calculation.requiredKwp,
    billValue: billValue,
  });

  return (
    <section id="calculadora-section" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-amber-400" />
            Simulador de Engenharia Solar Zion
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Calcule sua economia de energia solar em segundos
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Descubra a quantidade de painéis, a potência ideal em kWp e quanto dinheiro você deixará de pagar para a concessionária todo mês.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  Parâmetros da Sua Instalação
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Valores editáveis</span>
              </div>

              {/* Slider: Valor Médio da Conta */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300">
                    Valor médio da sua conta de energia:
                  </label>
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-amber-400">
                    {formatCurrency(billValue)}
                    <span className="text-xs font-normal text-slate-400">/mês</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="200"
                  max="15000"
                  step="50"
                  value={billValue}
                  onChange={(e) => setBillValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                  <span>R$ 200/mês</span>
                  <span>R$ 5.000</span>
                  <span>R$ 10.000</span>
                  <span>R$ 15.000+/mês</span>
                </div>
              </div>

              {/* Grid of secondary inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Tipo de Imóvel */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Tipo de Imóvel</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Residencial">Residencial (Casa / Sobrado)</option>
                    <option value="Comercial">Comercial (Comércio / Consultório)</option>
                    <option value="Industrial">Industrial (Fábrica / Galpão)</option>
                    <option value="Rural">Rural (Sítio / Fazenda)</option>
                  </select>
                </div>

                {/* Estado / UF */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Estado (Irradiação Solar)</label>
                  <select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="SP">São Paulo (SP)</option>
                    <option value="RJ">Rio de Janeiro (RJ)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="ES">Espírito Santo (ES)</option>
                    <option value="PR">Paraná (PR)</option>
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="RS">Rio Grande do Sul (RS)</option>
                    <option value="GO">Goiás (GO)</option>
                    <option value="MT">Mato Grosso (MT)</option>
                    <option value="MS">Mato Grosso do Sul (MS)</option>
                    <option value="BA">Bahia (BA)</option>
                    <option value="PE">Pernambuco (PE)</option>
                    <option value="CE">Ceará (CE)</option>
                  </select>
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Cidade</label>
                  <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="Ex: Campinas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Tipo de Sistema */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Tecnologia do Sistema</label>
                  <select
                    value={systemType}
                    onChange={(e) => setSystemType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="On-Grid">On-Grid Tradicional (Conectado à rede)</option>
                    <option value="Híbrido com Bateria">Híbrido Inteligente (com Bateria Backup)</option>
                    <option value="Zero Grid">Zero Grid (Sem injeção na rede)</option>
                  </select>
                </div>
              </div>

              {/* Estimative disclaimer note */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Nota Técnica:</strong> Os valores calculados são estimativas fundamentadas nas médias do atlas solar brasileiro e na tarifa de R$ {tariffKwh.toFixed(2)}/kWh. A proposta executiva final dependerá de vistoria técnica e inclinação do telhado.
                </span>
              </div>
            </div>

            {/* Right Output Dashboard (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-amber-500/20 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Resultado da Simulação
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Retorno Garantido
                  </span>
                </div>

                {/* Big Highlights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Economia Estimada</div>
                    <div className="font-display text-lg sm:text-xl font-extrabold text-emerald-400 mt-1">
                      {formatCurrency(calculation.monthlySavingsBrl)}
                      <span className="text-xs font-normal text-slate-400">/mês</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {formatCurrency(calculation.yearlySavingsBrl)}/ano
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Payback Estimado</div>
                    <div className="font-display text-lg sm:text-xl font-extrabold text-amber-400 mt-1">
                      {calculation.paybackYears} Anos
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">+20 anos de lucro puro</div>
                  </div>
                </div>

                {/* Technical Dimensioning Grid */}
                <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Potência Estimada:</span>
                    <strong className="text-white">{calculation.requiredKwp} kWp</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantidade de Painéis (550W):</span>
                    <strong className="text-amber-400">~{calculation.estimatedPanelsCount} módulos</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Geração Média Mensal:</span>
                    <strong className="text-white">{formatNumber(calculation.monthlyGenerationKwh)} kWh/mês</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Área de Telhado Necessária:</span>
                    <strong className="text-white">~{calculation.areaRequiredM2} m²</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Investimento Médio do Kit:</span>
                    <strong className="text-slate-200">{formatCurrency(calculation.estimatedInvestmentBrl)}</strong>
                  </div>
                </div>
              </div>

              {/* Lead Capture or WhatsApp CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                {submittedLead ? (
                  <div className="bg-emerald-950/50 border border-emerald-800 rounded-xl p-4 text-center text-xs text-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <strong className="block text-white font-bold text-sm">Proposta Solicitada!</strong>
                    <span>Um engenheiro especialista da Zion entrará em contato com a documentação do seu projeto.</span>
                  </div>
                ) : (
                  <form onSubmit={handleRequestQuote} className="space-y-3">
                    <div className="text-xs font-bold text-slate-300">
                      Receber proposta técnica gratuita com visita:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Seu Nome"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="WhatsApp com DDD"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Solicitar Estudo de Engenharia</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <div className="mt-3 text-center">
                  <a
                    href={calculatorWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Prefere atendimento imediato? Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
