import React, { useState } from 'react';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

interface LgpdModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'lgpd' | 'cookies';
}

export const LgpdModal: React.FC<LgpdModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Política de Privacidade e Proteção de Dados',
      date: 'Atualizado em Setembro de 2026',
      body: `A Zion Confort Line (zionconfortline.com.br) tem o compromisso inequívoco com a privacidade e proteção dos dados pessoais de seus clientes, parceiros e colaboradores. Em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), detalhamos como tratamos suas informações:

1. Coleta de Dados: Coletamos dados estritamente necessários para dimensionamento de projetos de energia solar fotovoltaica, faturamento de produtos e prestação de assistência técnica (Nome, CPF/CNPJ, e-mail, telefone, endereço de instalação e consumo médio da fatura de energia).
2. Não Comercialização: Jamais vendemos, alugamos ou comercializamos dados cadastrais a terceiros estranhos à cadeia de atendimento e engenharia.
3. Segurança da Informação: Nossos servidores utilizam criptografia SSL/TLS de 256 bits e isolamento rigoroso de permissões de acesso (RBAC).
4. Direitos do Titular: O titular pode a qualquer momento solicitar confirmação de tratamento, acesso, correção ou exclusão definitiva de seus dados através do nosso canal: dpo@zionconfortline.com.br.`,
    },
    terms: {
      title: 'Termos e Condições de Uso',
      date: 'Vigência 2026',
      body: `Bem-vindo à plataforma Zion Confort Line. Ao navegar em nosso site público, loja virtual ou portais dedicados, você concorda com os seguintes termos:

1. Objeto: A plataforma destina-se à apresentação institucional, comercialização de produtos tecnológicos e equipamentos de conforto, dimensionamento solar e gerenciamento de relacionamento comercial.
2. Estimativas da Calculadora Solar: Os valores gerados na ferramenta de simulação solar têm caráter estimativo preliminar fundamentado em médias de irradiação solar e tarifas regionais, estando condicionados à vistoria técnica presencial e elaboração de projeto executivo por engenheiro qualificado.
3. Propriedade Intelectual: Todos os designs, marcas e códigos pertencem à Zion Confort Line.`,
    },
    lgpd: {
      title: 'Conformidade LGPD & Gestão de Consentimento',
      date: 'Lei Federal 13.709/2018',
      body: `Garantimos integral cumprimento aos 10 princípios da LGPD: Finalidade, Adequação, Necessidade, Livre Acesso, Qualidade dos Dados, Transparência, Segurança, Prevenção, Não Discriminação e Responsabilização.

• Encarregado de Dados (DPO): dpo@zionconfortline.com.br
• Base Legal: Execução de contrato e legítimo interesse no atendimento de cotações solicitadas pelo próprio usuário.
• Para exercer qualquer direito previsto no Art. 18 da LGPD, entre em contato através de nossa Central de Atendimento.`,
    },
    cookies: {
      title: 'Política de Cookies & Tecnologias de Sessão',
      date: 'Setembro 2026',
      body: `Utilizamos cookies funcionais e estritamente necessários para manter sua sessão segura, lembrar itens adicionados ao carrinho de compras e carregar suas preferências de navegação. Não utilizamos cookies invasivos de espionagem de dados pessoais sem consentimento expresso.`,
    },
  };

  const current = contentMap[type] || contentMap.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">{current.title}</h3>
            <p className="text-xs text-slate-400">{current.date} • Zion Confort Line</p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line border-t border-b border-slate-100 py-4 my-4">
          {current.body}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Entendido e Aceito
          </button>
        </div>
      </div>
    </div>
  );
};
