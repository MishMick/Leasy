// types/types.ts

// Interface for a single listing
interface Listing{
    id: number;
    images: ImageItem[];
    title: string;
    description: string;
}
  
interface ImageItem{
    uri: string;
}

  