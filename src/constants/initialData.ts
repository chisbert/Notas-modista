import { CompanyInfo, DeliveryDocument, LineItem } from '../types';

export const DEFAULT_COMPANY: CompanyInfo = {
  brandName: 'MATURANA DECORHOGAR',
  slogan: 'VESTIMOS SU HOGAR',
  address: 'Avda. Palomeras, 129',
  cityPostal: '28018 - Madrid',
  phones: '91 380 36 36 / 637 365 321',
  website: 'www.maturanadecorhogar.com',
  email: 'clientesmaturana@gmail.com',
  social: '',
  ownerName: 'Dhogar PB',
  nif: 'E26670000',
  servicesTagline: [
    'CONFECCIONAMOS E INSTALAMOS',
    'CORTINAS, EDREDONES',
    'ESTORES, CABECEROS, BANDOS',
    'TODO EN ALFOMBRAS',
    'MANTAS Y SÁBANAS',
    '- CALIDAD Y DISEÑO -',
  ],
};

export const SAMPLE_TEMPLATES: { name: string; description: string; items: Omit<LineItem, 'id'>[] }[] = [
  {
    name: 'Confección e Instalación de Cortinas Salón',
    description: 'Cortinajes completos con barras de latón, lino doble y visillos',
    items: [
      {
        quantity: '2',
        concept: 'Confección de caídas en tejido lino rústico lavado color marfil (2.80m x 2.60m)',
        unitPrice: '145.00',
        total: 290.00,
      },
      {
        quantity: '1',
        concept: 'Visillo traslúcido onda perfecta con cinta de plomo en bajo (5.40m ancho)',
        unitPrice: '120.00',
        total: 120.00,
      },
      {
        quantity: '1',
        concept: 'Barra decorativa niquelada mate Ø 28mm con soportes a techo y terminales',
        unitPrice: '88.50',
        total: 88.50,
      },
      {
        quantity: '1',
        concept: 'Instalación y planchado profesional en domicilio del cliente',
        unitPrice: '65.00',
        total: 65.00,
      },
    ],
  },
  {
    name: 'Estores Enrollables Screen para Vivienda',
    description: 'Estores técnicos screen 5% filtro solar a medida',
    items: [
      {
        quantity: '2',
        concept: 'Estor enrollable Screen 5% tejido blanco/lino con contrapeso oculto (1.60m x 2.20m)',
        unitPrice: '110.00',
        total: 220.00,
      },
      {
        quantity: '1',
        concept: 'Estor cocina tejido resinado antimanchas lavable gris perla (1.20m x 1.80m)',
        unitPrice: '85.00',
        total: 85.00,
      },
      {
        quantity: '1',
        concept: 'Instalación, nivelación y anclaje con tornillería técnica',
        unitPrice: '50.00',
        total: 50.00,
      },
    ],
  },
  {
    name: 'Tapicería de Cabecero y Cojines a Juego',
    description: 'Confección a medida de cabecero acolchado y elementos de cama',
    items: [
      {
        quantity: '1',
        concept: 'Cabecero tapizado capitoné antimanchas Teflón color topo (1.60m x 1.25m)',
        unitPrice: '280.00',
        total: 280.00,
      },
      {
        quantity: '4',
        concept: 'Cojines decorativos desenfundables con vivo perimetral (50x50 cm) con relleno pluma sintética',
        unitPrice: '28.00',
        total: 112.00,
      },
      {
        quantity: '1',
        concept: 'Colcha cubre-edredón acolchada a juego con faldón ajustable',
        unitPrice: '175.00',
        total: 175.00,
      },
    ],
  },
];

export const createEmptyItem = (): LineItem => ({
  id: 'item_' + Math.random().toString(36).substring(2, 9),
  quantity: '1',
  concept: '',
  unitPrice: '',
  total: 0,
});

export const createInitialDocument = (customCompany?: CompanyInfo): DeliveryDocument => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return {
    id: 'doc_' + Date.now(),
    type: 'NOTA DE ENTREGA',
    number: 'NE-2026-001',
    date: formattedDate,
    company: customCompany || DEFAULT_COMPANY,
    customer: {
      name: 'Carmen Rodríguez García',
      phone: '644 123 456',
      address: 'Calle Alcalá, 248, 3º B, 28027 Madrid',
      notes: 'Horario preferente de entrega tardes a partir de las 17:00h',
    },
    items: [
      {
        id: 'item_1',
        quantity: '2',
        concept: 'Confección caídas cortina tela lino natural con trabillas ocultas salón',
        unitPrice: '135.00',
        total: 270.00,
      },
      {
        id: 'item_2',
        quantity: '1',
        concept: 'Visillo blanco roto con onda perfecta y cinta de peso en plomo (4.20m)',
        unitPrice: '95.00',
        total: 95.00,
      },
      {
        id: 'item_3',
        quantity: '1',
        concept: 'Riel técnico de aluminio blanco de arrastre silencioso con soportes a techo',
        unitPrice: '55.00',
        total: 55.00,
      },
      {
        id: 'item_4',
        quantity: '1',
        concept: 'Mano de obra especializada e instalación en domicilio',
        unitPrice: '60.00',
        total: 60.00,
      },
    ],
    includeTax: true,
    taxRate: 21,
    receptionDate: formattedDate,
    receiverName: 'Carmen Rodríguez García',
    receiverDni: '',
    deliveryObservations: 'Mercancía recibida e instalada conforme y en perfecto estado.',
    status: 'entregado',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
