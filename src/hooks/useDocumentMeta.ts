import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

function removeRobots() {
  const el = document.head.querySelector('meta[name="robots"][data-page-meta]');
  if (el) el.remove();
}

export function useDocumentMeta({
  title,
  description,
  canonical,
  ogImage,
  noIndex,
  jsonLd,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title;
    upsertMetaByName('description', description);
    upsertCanonical(canonical);

    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:url', canonical);
    if (ogImage) upsertMetaByProperty('og:image', ogImage);

    if (noIndex) {
      let robots = document.head.querySelector<HTMLMetaElement>(
        'meta[name="robots"][data-page-meta]',
      );
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        robots.setAttribute('data-page-meta', '');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex,nofollow');
    } else {
      removeRobots();
    }

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.setAttribute('data-page-jsonld', '');
      scriptEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
      if (noIndex) removeRobots();
    };
  }, [title, description, canonical, ogImage, noIndex, jsonLd]);
}
