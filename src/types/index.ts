export type CategoryType = "e-money" | "digital-product";

export interface EMoneyBrand {
  id: string;
  name: string;
  code: string; // Kode Bebas Nominal Sekalipay: BBSD, BBSSH002, etc.
  icon: string;
  placeholder: string;
  badge?: string;
  popular?: boolean;
}

export interface NominalItem {
  amount: number;
  label: string;
  price: number; // Customer price
  originalPrice: number;
  popular?: boolean;
}

export interface DigitalProduct {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: number;
  requiresEmail: boolean;
  features: string[];
  badge?: string;
  description: string;
  slug: string;
}

export interface OrderItem {
  id: string;
  invoice: string;
  type: "e-money" | "digital";
  title: string;
  targetAccount: string; // No HP atau Email
  accountHolderName?: string;
  amount: number;
  fee: number;
  uniqueCode: number;
  totalPayment: number;
  gatewayType: "INDOAPI" | "DYNAMIC_QRIS";
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";
  createdAt: string;
  expiredAt: string;
  qrisString: string;
  fulfillmentData?: {
    licenseKey?: string;
    activationLink?: string;
    instructions?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
}
