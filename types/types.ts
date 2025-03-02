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
  amenity_fee: number;
  security_deposit: number;
  application_fees: number;
  square_footage: number;
  address: string;
  tour_options: string[];
  included_in_rent: string[];
  lease_type: string;
  lease_start_date: string;
  lease_end_date: string;
  parking: string[];
  dishwasher: string;
  microwave: string;
  elevator: boolean;
}

interface MediaItem {
  uri: string;
  type: string;
}
