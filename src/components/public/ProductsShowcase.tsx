import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  ShoppingCart,
  MessageCircle,
  Eye,
  Sparkles,
  ArrowRight,
  Package,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

export const ProductsShowcase: React.FC = () => {
  const { products, categories, addToCart, setSelectedProductDetail, navigateTo } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');

  const filteredProducts = activeCategoryFilter === 'todos'
    ? products
    : products.filter((p) => p.category === activeCategoryFilter);

  return (
    <section id="produtos-destaque-section" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Catálogo Multissetorial
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Equipamentos de alta tecnologia selecionados com garantia de fábrica, eficiência energética e durabilidade comprovada.
            </p>
          </div>

          <button
            onClick={() => navigateTo('produtos')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            <span>Ver Loja Completa</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          <button
            onClick={() => setActiveCategoryFilter('todos')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategoryFilter === 'todos'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            Todos os Produtos ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.slug)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeCategoryFilter === cat.slug
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentPrice = product.promoPrice || product.price;
            const hasPromo = !!product.promoPrice && product.promoPrice < product.price;
            const discountPercent = hasPromo
              ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
              : 0;

            const whatsappProductUrl = generateWhatsAppUrl({
              type: 'produto',
              productName: product.name,
              productSku: product.sku,
            });

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80'}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80';
                      }}
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {hasPromo && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] shadow-sm">
                          -{discountPercent}% OFF
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] shadow-sm">
                          Mais Vendido
                        </span>
                      )}
                    </div>

                    {/* Quick view button */}
                    <button
                      onClick={() => setSelectedProductDetail(product)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                      title="Ver detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Category & Stock */}
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {product.categoryName}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Package className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {product.stock} em estoque
                      </span>
                    </div>

                    {/* Name */}
                    <h3
                      onClick={() => setSelectedProductDetail(product)}
                      className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors mb-2"
                    >
                      {product.name}
                    </h3>

                    {/* Description preview */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Reviews */}
                    <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating.toFixed(1)}</span>
                      <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      {hasPromo && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {formatCurrency(product.price)}
                        </div>
                      )}
                      <div className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                        {formatCurrency(currentPrice)}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        ou 12x de {formatCurrency(currentPrice / 12)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Comprar + WhatsApp */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                    <span>Comprar</span>
                  </button>

                  <a
                    href={whatsappProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
