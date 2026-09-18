import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    navigateTo,
  } = useApp();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-lg">Meu Carrinho</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-semibold">
              {cartCount} {cartCount === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-amber-50/70 dark:bg-amber-950/40 border-b border-amber-100 dark:border-amber-900/40 p-3 text-xs">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium mb-1.5">
            <span className="flex items-center gap-1 text-amber-900 dark:text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {cartTotal >= freeShippingThreshold ? (
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Parabéns! Você ganhou Frete Grátis Especial</strong>
              ) : (
                <>Faltam <strong>{formatCurrency(freeShippingThreshold - cartTotal)}</strong> para Frete Grátis</>
              )}
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-amber-200/60 dark:bg-amber-900/40 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                cartTotal >= freeShippingThreshold ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-white text-base mb-1">Seu carrinho está vazio</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
                Explore nossas soluções de energia solar, sistemas de conforto, segurança e eletrodomésticos.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('produtos');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-semibold shadow-md transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => {
              const currentPrice = product.promoPrice || product.price;
              return (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800/80 shadow-xs"
                >
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&auto=format&fit=crop&q=80'}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 dark:bg-slate-700 flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {product.categoryName}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(currentPrice * quantity)}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity - 1)}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-200">{quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity + 1)}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal dos produtos:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete estimado:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {cartTotal >= freeShippingThreshold ? 'Grátis' : 'Calculado no checkout'}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total:</span>
                <span className="text-amber-600 dark:text-amber-400">{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            <button
              id="btn-go-to-checkout"
              onClick={() => {
                setIsCartOpen(false);
                navigateTo('checkout');
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Finalizar Pedido Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Checkout protegido com criptografia de ponta a ponta</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
