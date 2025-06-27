export enum BusinessStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }

export type Business = {
    id: number;
    name: string;
    slug: string;
    status: BusinessStatus;
    logoUrl: string | null;
    country: string | null;
    businessType: string | null;
    address: string | null;
    currency: string | null;
    revenueRange: string | null;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
  };
  