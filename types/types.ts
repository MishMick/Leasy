// types/types.ts

// Interface for a single listing
interface Listing {
  id: number;
  media: MediaItem[];
  bedrooms: number;
  price: number;
  bathrooms: number;
  laundry: string;
  ac: string;
  heat: string;
  amenityFee: number;
  securityDeposit: number;
  applicationFees: number;
  squareFootage: number;
  address: string;
  tourOptions: string[];
  includedInRent: string[];
  leaseType: string;
  leaseStartDate: string;
  leaseEndDate: string;
  parking: string;
  dishwasher: string;
  microwave: string;
  elevator: boolean;
}

interface MediaItem {
  uri: string;
  type: string;
}
