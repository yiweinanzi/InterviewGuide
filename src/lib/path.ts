export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base === '/' ? path : `${base.replace(/\/$/, '')}${path}`;
}

export function toCompanySlug(name: string): string {
  return encodeURIComponent(name);
}

export function fromCompanySlug(slug: string): string {
  return decodeURIComponent(slug);
}

export function toCategorySlug(key: string): string {
  return encodeURIComponent(key);
}

export function fromCategorySlug(slug: string): string {
  return decodeURIComponent(slug);
}
