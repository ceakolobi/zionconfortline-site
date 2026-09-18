import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  CheckCircle2,
  Shield,
  Truck,
  MessageCircle,
  ShoppingCart,
  Zap,
  Package,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductDetail, setSelectedProductDetail, addToCart, setIsCartOpen } = useApp();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const currentPrice = product.promoPrice || product.price;
  const hasDiscount = !!product.promoPrice && product.promoPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : 0;

  const productWhatsappUrl = generateWhatsAppUrl({
    type: 'produto',
    productName: product.name,
    productSku: product.sku,
  });

  const handleAddToCartAndOpen = () => {
    addToCart(product, quantity);
    setSelectedProductDetail(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProductDetail(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Images */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4 shadow-xs">
              <img
                src={product.images[selectedImgIndex] || product.images[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80'}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
                }}
              />
              {hasDiscount && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs shadow-md">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImgIndex === idx
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&auto=format&fit=crop&q=80';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>Entrega técnica especializada</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug mb-3">
                {product.name}
              </h2>

              {/* Reviews & Stock */}
              <div className="flex items-center gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400 dark:text-slate-500">({product.reviewsCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Package className="w-3.5 h-3.5" />
                  <span>Em estoque ({product.stock} unidades)</span>
                </div>
              </div>

              {/* Price Container */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-4 border border-slate-200/80 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400">Valor para compra direta:</div>
                <div className="flex items-baseline gap-3 mt-1">
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                    {formatCurrency(currentPrice)}
                  </div>
                  {hasDiscount && (
                    <div className="text-sm text-slate-400 dark:text-slate-500 line-through">
                      {formatCurrency(product.price)}
                    </div>
                  )}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-1">
                  ou 12x de {formatCurrency(currentPrice / 12)} sem juros no cartão
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Features bullets */}
              <div className="space-y-1.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-white mb-1">Destaques e Benefícios:</div>
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Technical specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-6">
                  <div className="font-bold text-xs text-slate-900 dark:text-white mb-2">Especificações Técnicas:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-700 overflow-hidden text-[11px]">
                    {Object.entries(product.specs).map(([k, v], idx) => (
                      <div
                        key={k}
                        className={`flex justify-between p-2.5 ${
                          idx % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-800/50'
                        }`}
                      >
                        <span className="font-semibold text-slate-600 dark:text-slate-400">{k}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  id="btn-add-to-cart-modal"
                  onClick={handleAddToCartAndOpen}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>

              {/* Direct WhatsApp Purchase button */}
              <a
                id="btn-buy-via-whatsapp-modal"
                href={productWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Negociar ou Comprar via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
