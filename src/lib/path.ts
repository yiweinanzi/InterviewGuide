function splitSuffix(path: string): { pathname: string; suffix: string } {
  const match = path.match(/^([^?#]*)(.*)$/);
  return {
    pathname: match?.[1] ?? path,
    suffix: match?.[2] ?? '',
  };
}

function normalizeRoutePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const { pathname, suffix } = splitSuffix(normalized);
  if (pathname === '/') return `/${suffix}`;
  if (pathname.endsWith('/')) return `${pathname}${suffix}`;

  const lastSegment = pathname.split('/').pop() ?? '';
  if (lastSegment.includes('.')) return `${pathname}${suffix}`;

  return `${pathname}/${suffix}`;
}

export function withBaseFrom(base: string, path: string): string {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  return `${normalizedBase}${normalizeRoutePath(path)}`;
}

export function withBase(path: string): string {
  return withBaseFrom(import.meta.env.BASE_URL, path);
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

export function toQuestionSlug(id: string): string {
  return encodeURIComponent(id);
}

export function fromQuestionSlug(slug: string): string {
  return decodeURIComponent(slug);
}
