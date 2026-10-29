// Centralized WhatsApp link builder with contextual messages
export const ZION_WHATSAPP_NUMBER = '5547992202930'; // Número oficial de atendimento Zion Confort Line: 47 992202930
export const ZION_WHATSAPP_DISPLAY = '(47) 99220-2930';
export const ZION_WHATSAPP_RAW = '47 992202930';

export type WhatsAppActionType =
  | 'geral'
  | 'solar_orcamento'
  | 'produto'
  | 'servico'
  | 'suporte'
  | 'vendedor'
  | 'calculadora';

interface WhatsAppParams {
  type?: WhatsAppActionType;
  productName?: string;
  productSku?: string;
  serviceName?: string;
  solarKwp?: number;
  billValue?: number;
  userName?: string;
  sellerName?: string;
  customMessage?: string;
}

export function generateWhatsAppUrl(params: WhatsAppParams = {}): string {
  let text = 'Olá! Estou no site da Zion Confort Line e gostaria de atendimento.';

  switch (params.type) {
    case 'solar_orcamento':
      text = `Olá! Gostaria de solicitar um orçamento para projeto de ENERGIA SOLAR fotovoltaica.`;
      if (params.billValue) {
        text += ` Minha conta de luz média é de R$ ${params.billValue.toLocaleString('pt-BR')}/mês.`;
      }
      break;

    case 'calculadora':
      text = `Olá! Realizei uma simulação na Calculadora Solar da Zion Confort Line.`;
      if (params.solarKwp) {
        text += ` Estimativa de potência: ${params.solarKwp.toFixed(2)} kWp.`;
      }
      if (params.billValue) {
        text += ` Conta média: R$ ${params.billValue.toLocaleString('pt-BR')}/mês.`;
      }
      text += ` Poderiam me enviar uma proposta detalhada com visita técnica?`;
      break;

    case 'produto':
      text = `Olá! Gostaria de mais informações e condições de pagamento para o produto: *${params.productName || 'em destaque'}*`;
      if (params.productSku) {
        text += ` (Código SKU: ${params.productSku})`;
      }
      break;

    case 'servico':
      text = `Olá! Tenho interesse no serviço de: *${params.serviceName || 'Especializado'}*. Como funciona o agendamento?`;
      break;

    case 'suporte':
      text = `Olá Suporte Zion Confort Line! Preciso de auxílio técnico com meu sistema ou pedido.`;
      break;

    case 'vendedor':
      text = `Olá ${params.sellerName || 'consultor Zion'}! Gostaria de tirar dúvidas com o especialista comercial.`;
      break;

    default:
      if (params.customMessage) {
        text = params.customMessage;
      }
      break;
  }

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${ZION_WHATSAPP_NUMBER}?text=${encoded}`;
}
