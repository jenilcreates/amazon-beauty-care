export interface ListicleItem {
  id: string;
  categoryHeader: string;
  title: string;
  description: string;
  buyItIf: string;
  price?: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  amazonUrl: string;
  brand?: string;
  size?: string;
  rating?: number;
  reviewsCount?: number;
  keyBenefits?: string[];
  couponCode?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
