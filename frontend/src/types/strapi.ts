export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface Article {
  title: string;
  slug: string;
  teaser?: string;
  type: 'symptom' | 'condition' | 'guide' | 'supplement' | 'other';
  shortExplanation?: ShortExplanation;
  symptomsList?: string;
  causes?: Causes;
  naturalApproaches?: NaturalApproaches;
  lifestyleAdvice?: LifestyleAdvice;
  whenToSeeDoctor?: WhenToSeeDoctor;
  author?: string;
  authorRole?: string;
  lastUpdated?: string;
  sources?: Source[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: StrapiMedia;
  readingTime?: number;
  viewCount?: number;
  featured?: boolean;
  categories?: { data: StrapiData<Category>[] };
  symptoms?: { data: StrapiData<SymptomCondition>[] };
  recommendedProducts?: { data: StrapiData<Product>[] };
  relatedArticles?: { data: StrapiData<Article>[] };
  partners?: { data: StrapiData<Partner>[] };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
  localizations?: { data: StrapiData<Article>[] };
}

export interface ShortExplanation {
  whatIsIt?: string;
  acuteVsChronic?: string;
  prevalence?: string;
}

export interface Causes {
  lifestyleCauses?: string;
  environmentalCauses?: string;
  otherFactors?: string;
}

export interface NaturalApproaches {
  herbs?: string;
  supplements?: string;
  foods?: string;
  otherMethods?: string;
  importantNotes?: string;
}

export interface LifestyleAdvice {
  sleepAdvice?: string;
  exerciseAdvice?: string;
  dietAdvice?: string;
  stressReduction?: string;
  otherTips?: string;
}

export interface WhenToSeeDoctor {
  warningSignals?: string;
  urgentCare?: string;
  regularCheckup?: string;
  disclaimer?: string;
}

export interface Source {
  title: string;
  url?: string;
  date?: string;
  author?: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
}

export interface SymptomCondition {
  name: string;
  slug: string;
  shortDescription?: string;
  type: 'symptom' | 'condition' | 'both';
  severity?: 'mild' | 'moderate' | 'severe';
  image?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
}

export interface SupplementHerb {
  name: string;
  slug: string;
  latinName?: string;
  type: 'herb' | 'supplement' | 'vitamin' | 'mineral' | 'other';
  description?: string;
  benefits?: string;
  dosage?: string;
  forms?: string[];
  sideEffects?: string;
  interactions?: string;
  precautions?: string;
  scientificEvidence?: string;
  traditionalUse?: string;
  sources?: Source[];
  image?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
}

export interface Product {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  currency: string;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  productType: 'dropshipping' | 'affiliate' | 'own';
  supplierName?: string;
  supplierLink?: string;
  affiliateLink?: string;
  trackingCode?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  images?: StrapiMedia[];
  dosageInfo?: string;
  ingredients?: string;
  usage?: string;
  warnings?: string;
  certifications?: string[];
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  categories?: { data: StrapiData<Category>[] };
  supplementsHerbs?: { data: StrapiData<SupplementHerb>[] };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
}

export interface Partner {
  name: string;
  slug: string;
  type: 'doctor' | 'clinic' | 'therapist' | 'official_source' | 'webshop' | 'research' | 'other';
  description?: string;
  url: string;
  email?: string;
  phone?: string;
  address?: string;
  specialties?: string[];
  logo?: StrapiMedia;
  verified?: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}
