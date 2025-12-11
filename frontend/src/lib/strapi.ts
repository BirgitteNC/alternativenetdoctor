const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
    };
  } | null;
}

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    featuredImage: StrapiImage;
  };
}

export interface SupplementHerb {
  id: number;
  attributes: {
    name: string;
    slug: string;
    latinName: string;
    type: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: StrapiImage;
  };
}

export interface SymptomCondition {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: StrapiImage;
  };
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    price: number;
    discountPrice: number;
    stripeProductId: string;
    stripePriceId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: StrapiImage;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }

    const json: StrapiResponse<Article[]> = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchSupplementHerbs(): Promise<SupplementHerb[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/supplement-herbs?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch supplement herbs');
    }

    const json: StrapiResponse<SupplementHerb[]> = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching supplement herbs:', error);
    return [];
  }
}

export async function fetchSymptomConditions(): Promise<SymptomCondition[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/symptom-conditions?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch symptom conditions');
    }

    const json: StrapiResponse<SymptomCondition[]> = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching symptom conditions:', error);
    return [];
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const json: StrapiResponse<Product[]> = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export function getStrapiImageUrl(image: StrapiImage): string | null {
  if (!image?.data) return null;
  const url = image.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}