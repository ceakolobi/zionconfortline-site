import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DemoSwitcher } from './components/common/DemoSwitcher';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { CartDrawer } from './components/common/CartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { AuthModal } from './components/common/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { SolarLandingPage } from './pages/SolarLandingPage';
import { AboutPage } from './pages/AboutPage';
import {
  ServicesPage,
  ProjectsPage,
  CalculatorPage,
  BlogPage,
  FaqPage,
  ContactPage,
} from './pages/StaticViews';
import { ClientPortal } from './pages/ClientPortal';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

// Toast Notification
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { notification, hideNotification } = useApp();

  if (!notification) return null;

  const bgMap = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-900 text-white',
  };

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-200" />,
    error: <AlertCircle className="w-5 h-5 text-rose-200" />,
    info: <Info className="w-5 h-5 text-amber-400" />,
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border border-white/10 ${
          bgMap[notification.type]
        }`}
      >
        {iconMap[notification.type]}
        <span className="text-xs font-semibold pr-2">{notification.message}</span>
        <button
          onClick={hideNotification}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeRoute } = useApp();

  const renderCurrentView = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'produtos':
        return <CatalogPage />;
      case 'solar':
        return <SolarLandingPage />;
      case 'sobre':
        return <AboutPage />;
      case 'servicos':
        return <ServicesPage />;
      case 'projetos':
        return <ProjectsPage />;
      case 'calculadora':
        return <CalculatorPage />;
      case 'blog':
        return <BlogPage />;
      case 'faq':
        return <FaqPage />;
      case 'contato':
        return <ContactPage />;
      case 'cliente':
        return <ClientPortal />;
      case 'vendedor':
        return <SellerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      <ToastNotification />
      <DemoSwitcher />
      <Header />
      <main className="flex-grow">{renderCurrentView()}</main>
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <AuthModal />
      <WhatsAppFloat />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
