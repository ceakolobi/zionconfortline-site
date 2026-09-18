import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  FileText,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Copy,
  Check,
  Lock,
  Truck,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { cart, cartTotal, createOrder, navigateTo, currentUser, showNotification } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão de Crédito' | 'Boleto Bancário' | 'Faturamento PJ'>('PIX');
  const [copiedPix, setCopiedPix] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Juliana Castro',
    email: currentUser?.email || 'cliente@demo.local',
    phone: currentUser?.phone || '(11) 99887-1122',
    cpfCnpj: '342.890.118-20',
    street: 'Av. das Palmeiras',
    number: '450',
    complement: 'Apto 12',
    neighborhood: 'Jardim Primavera',
    city: 'Valinhos',
    state: 'SP',
    zipCode: '13270-000',
    installments: '1',
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'JULIANA CASTRO',
    cardExpiry: '12/28',
    cardCvv: '•••',
  });

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Não há itens no checkout</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Adicione produtos ao seu carrinho para finalizar o pedido.</p>
          <button
            onClick={() => navigateTo('produtos')}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors"
          >
            Ir para a Loja
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const order = createOrder({
      paymentMethod,
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.street,
        number: formData.number,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
    });

    setCompletedOrder(order);
  };

  const pixKey = '00020126580014br.gov.bcb.pix01363428901182052040000530398654051540.005802BR5920ZION CONFORT LINE6009SAO PAULO62070503***6304E2A1';

  const copyPixPayload = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    showNotification('Código PIX Copia-e-Cola copiado para a área de transferência!', 'success');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
            Pedido Confirmado com Sucesso!
          </div>

          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Obrigado, {completedOrder.customerName.split(' ')[0]}!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
            Código do Pedido: <strong className="text-slate-800 dark:text-slate-200">{completedOrder.orderNumber}</strong> • Código de Rastreio:{' '}
            <strong className="text-amber-600 dark:text-amber-400">{completedOrder.trackingCode}</strong>
          </p>

          {completedOrder.paymentMethod === 'PIX' && (
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Pagamento PIX Instantâneo
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(completedOrder.totalAmount)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-800 dark:text-slate-200" />
                </div>
                <div className="flex-1 text-xs space-y-2">
                  <p className="text-slate-600 dark:text-slate-300">
                    Abra o app do seu banco, escolha <strong>Pagar via PIX</strong> e aponte a câmera para o QR Code, ou utilize a chave abaixo:
                  </p>
                  <button
                    onClick={copyPixPayload}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? 'Chave Copiada!' : 'Copiar Chave PIX'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-300 mb-6 text-left space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-500" />
              Endereço de Envio:
            </div>
            <p>
              {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.number} -{' '}
              {completedOrder.shippingAddress.neighborhood}, {completedOrder.shippingAddress.city}/
              {completedOrder.shippingAddress.state} (CEP: {completedOrder.shippingAddress.zipCode})
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-[11px]">
              Enviamos uma confirmação detalhada para {completedOrder.customerEmail}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-view-client-portal"
              onClick={() => navigateTo('cliente')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold shadow-md transition-colors"
            >
              Acompanhar no Portal do Cliente
            </button>
            <button
              onClick={() => navigateTo('produtos')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('produtos')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o catálogo</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full font-medium border border-emerald-200 dark:border-emerald-800">
          <Lock className="w-3 h-3" />
          <span>Ambiente Seguro 256-bit SSL</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Information & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Personal Details */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs">
                1
              </span>
              Identificação do Comprador
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Nome Completo / Razão Social</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">E-mail para confirmação</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">CPF ou CNPJ</label>
                <input
                  type="text"
                  name="cpfCnpj"
                  required
                  value={formData.cpfCnpj}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs">
                2
              </span>
              Endereço de Entrega & Instalação
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">CEP</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Rua / Logradouro</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Número</label>
                <input
                  type="text"
                  name="number"
                  required
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  required
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Cidade / UF</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={`${formData.city} - ${formData.state}`}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs">
                3
              </span>
              Forma de Pagamento
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { id: 'PIX', label: 'PIX (5% OFF)', icon: QrCode, desc: 'Aprovação Imediata' },
                { id: 'Cartão de Crédito', label: 'Cartão de Crédito', icon: CreditCard, desc: 'Até 12x s/ juros' },
                { id: 'Boleto Bancário', label: 'Boleto', icon: FileText, desc: 'À vista' },
                { id: 'Faturamento PJ', label: 'Faturado PJ', icon: Building2, desc: 'Sob análise' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-300 ring-2 ring-amber-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`} />
                    <div>
                      <div className="text-xs">{m.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Payment Details Container */}
            {paymentMethod === 'PIX' && (
              <div className="bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 text-xs text-emerald-900 dark:text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Desconto especial de 5% aplicado no PIX!
                </div>
                <p>
                  Ao finalizar a compra, você receberá a chave e o QR Code dinâmico com confirmação automática pelo nosso gateway.
                </p>
              </div>
            )}

            {paymentMethod === 'Cartão de Crédito' && (
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Os dados do cartão são tokenizados e processados diretamente pelo gateway PCI-DSS.
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Validade</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Boleto Bancário' && (
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-700 dark:text-slate-300">
                O boleto bancário será gerado com vencimento em até 3 dias úteis. Compensação em 24h a 48h.
              </div>
            )}

            {paymentMethod === 'Faturamento PJ' && (
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-700 dark:text-slate-300">
                Disponível para empresas com CNPJ ativo mediante envio de documentação e análise de crédito comercial Zion.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md sticky top-28 space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Resumo do Pedido ({cart.length} {cart.length === 1 ? 'item' : 'itens'})
            </h3>

            {/* Item list */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
              {cart.map(({ product, quantity }) => {
                const price = product.promoPrice || product.price;
                return (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=100&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{product.name}</div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {quantity}x {formatCurrency(price)}
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">{formatCurrency(price * quantity)}</div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete Especial:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Grátis</span>
              </div>
              {paymentMethod === 'PIX' && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Desconto PIX (5%):</span>
                  <span>- {formatCurrency(cartTotal * 0.05)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total a Pagar:</span>
                <span className="text-amber-600 dark:text-amber-400">
                  {formatCurrency(paymentMethod === 'PIX' ? cartTotal * 0.95 : cartTotal)}
                </span>
              </div>
            </div>

            <button
              id="btn-confirm-order"
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar & Gerar Pedido</span>
            </button>

            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 text-center space-y-1">
              <p>Ao confirmar, você concorda com nossos Termos de Compra e Política de Privacidade.</p>
              <p className="text-slate-400 dark:text-slate-500">Garantia integral Zion Confort Line com nota fiscal eletrônica.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
