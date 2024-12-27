// types/types.ts

// Interface for a single listing
interface Listing {
  id: number;
  media: MediaItem[];
  title: string;
  description: string;
}

interface MediaItem {
  uri: string;
  type: string;
}
