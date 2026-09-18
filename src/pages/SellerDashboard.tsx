import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Plus,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Briefcase,
  FileSpreadsheet,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { Lead, LeadStatus } from '../types';

export const SellerDashboard: React.FC = () => {
  const { leads, addLead, updateLeadStatus, currentUser, showNotification } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('todos');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New Lead Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCity, setNewCity] = useState('São Paulo');
  const [newState, setNewState] = useState('SP');
  const [newInterest, setNewInterest] = useState<'Energia Solar' | 'Produtos' | 'Serviços' | 'Segurança' | 'Conforto'>('Energia Solar');
  const [newValue, setNewValue] = useState('22000');

  const statusList: LeadStatus[] = [
    'Novo',
    'Contato realizado',
    'Em negociação',
    'Orçamento enviado',
    'Aguardando cliente',
    'Venda realizada',
    'Perdido',
  ];

  // Metrics
  const totalLeadsCount = leads.length;
  const closedLeads = leads.filter((l) => l.status === 'Venda realizada');
  const totalRevenue = closedLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
  const totalCommission = totalRevenue * 0.05; // 5% de comissão padrão do vendedor

  const filteredLeads = leads.filter((lead) => {
    if (selectedStatusFilter !== 'todos' && lead.status !== selectedStatusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.interestType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) {
      showNotification('Nome e telefone são obrigatórios.', 'error');
      return;
    }

    addLead({
      name: newName,
      phone: newPhone,
      email: newEmail || 'cliente@contato.com',
      city: newCity,
      state: newState,
      interestType: newInterest,
      estimatedValue: Number(newValue) || 15000,
      status: 'Novo',
    });

    setIsAddLeadModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  return (
    <div className="py-10 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-bold mb-1">
              <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Plataforma Comercial & CRM Zion Confort Line</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Painel do Vendedor • {currentUser?.name || 'Rodrigo Silveira'}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Gerencie seus leads, agende reuniões e envie propostas comerciais diretamente no WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Lead</span>
            </button>
          </div>
        </div>

        {/* Commercial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Total de Oportunidades</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                {totalLeadsCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">leads ativos</span>
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
                {leads.filter((l) => l.status === 'Novo' || l.status === 'Contato realizado').length} requerem contato hoje
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Propostas em Negociação</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                {leads.filter((l) => l.status === 'Orçamento enviado' || l.status === 'Em negociação').length}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pipeline de alta probabilidade</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Vendas Fechadas</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {closedLeads.length} contratos assinados
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-amber-300 dark:border-amber-600/40 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 font-bold mb-2">
              <span>Sua Comissão Estimada (5%)</span>
              <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold text-amber-700 dark:text-amber-400">
                {formatCurrency(totalCommission)}
              </div>
              <div className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1 font-medium">
                Próximo fechamento: 30 de Setembro
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, cidade ou telefone..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
            <button
              onClick={() => setSelectedStatusFilter('todos')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap ${
                selectedStatusFilter === 'todos'
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Todos ({leads.length})
            </button>
            {statusList.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap ${
                  selectedStatusFilter === st
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {st} ({leads.filter((l) => l.status === st).length})
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table / Cards */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const whatsappLeadUrl = `https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
              `Olá ${lead.name}! Aqui é o ${currentUser?.name || 'Consultor'} da Zion Confort Line. Estou entrando em contato referente ao seu interesse em ${lead.interestType}. Podemos conversar sobre a sua proposta?`
            )}`;

            const statusColors: Record<LeadStatus, string> = {
              'Novo': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
              'Contato realizado': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
              'Orçamento enviado': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
              'Em negociação': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
              'Aguardando cliente': 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
              'Venda realizada': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
              'Perdido': 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
            };

            return (
              <div
                key={lead.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-amber-300 dark:hover:border-amber-500/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">{lead.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                      {lead.interestType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {lead.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {lead.city} - {lead.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {lead.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Valor Estimado</span>
                    <strong className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(lead.estimatedValue)}
                    </strong>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                    className="text-xs px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-700 dark:text-slate-200 focus:outline-none"
                  >
                    {statusList.map((st) => (
                      <option key={st} value={st}>
                        Mudar para: {st}
                      </option>
                    ))}
                  </select>

                  {/* Contact WhatsApp Button */}
                  <a
                    href={whatsappLeadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: New Lead */}
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              onClick={() => setIsAddLeadModalOpen(false)}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-150">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">
                Cadastrar Nova Oportunidade
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Preencha os dados do cliente para iniciar o acompanhamento no pipeline de vendas.
              </p>

              <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nome do Cliente *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: Carlos Drummond"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Telefone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="(11) 98888-7777"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                    <input
                      type="text"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Interesse</label>
                    <select
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Energia Solar">Energia Solar</option>
                      <option value="Conforto">Conforto & Colchões</option>
                      <option value="Segurança">Segurança Eletrônica</option>
                      <option value="Produtos">Produtos & Eletros</option>
                      <option value="Serviços">Serviços Técnicos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Valor Estimado (R$)</label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                  >
                    Salvar Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
