export type DocumentType = 'NOTA DE ENTREGA' | 'PRESUPUESTO';

export interface CompanyInfo {
  brandName: string;
  slogan: string;
  address: string;
  cityPostal: string;
  phones: string;
  website: string;
  email: string;
  social: string;
  ownerName: string;
  nif: string;
  servicesTagline: string[];
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface LineItem {
  id: string;
  quantity: string;
  concept: string;
  unitPrice: string;
  total: number;
}

export interface DeliveryDocument {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  company: CompanyInfo;
  customer: CustomerInfo;
  items: LineItem[];
  includeTax: boolean;
  taxRate: number; // e.g., 21%
  receptionDate?: string;
  receiverName?: string;
  receiverDni?: string;
  deliveryObservations?: string;
  status: 'borrador' | 'entregado' | 'pendiente';
  createdAt: string;
  updatedAt: string;
}
