import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Package,
  Star,
  ShoppingCart,
  MessageCircle,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export const CatalogPage: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    setSelectedProductDetail,
  } = useApp();

  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory && selectedCategory !== 'todos' && product.category !== selectedCategory) {
          return false;
        }
        // In stock filter
        if (onlyInStock && product.stock <= 0) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchSku) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.promoPrice || a.price;
        const priceB = b.promoPrice || b.price;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <span className="text-xs text-slate-500 dark:text-slate-400">Início / Loja Virtual</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Catálogo de Produtos & Equipamentos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Soluções completas com faturamento seguro, garantia técnica e suporte especializado.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs mb-8 space-y-4 transition-colors">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, categoria ou código SKU..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500"
                />
                <span>Apenas em estoque</span>
              </label>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none"
                >
                  <option value="relevance">Mais Relevantes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                !selectedCategory
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Todos os Setores ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Exibindo <strong>{filteredAndSortedProducts.length}</strong> produtos
            {selectedCategory ? ` na categoria selecionada` : ''}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-slate-700 dark:text-slate-300">Nenhum produto encontrado</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tente ajustar seus termos de busca ou filtros de categoria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setOnlyInStock(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 dark:text-slate-950 text-white text-xs font-bold"
            >
              Restaurar Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => {
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
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
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

                      <button
                        onClick={() => setSelectedProductDetail(product)}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          {product.categoryName}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Package className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          {product.stock} un.
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedProductDetail(product)}
                        className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors mb-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating.toFixed(1)}</span>
                        <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
                      </div>

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

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
                      <span>Comprar</span>
                    </button>

                    <a
                      href={whatsappProductUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:border-emerald-800/60 dark:text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
