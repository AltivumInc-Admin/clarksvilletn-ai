import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentMeta } from './useDocumentMeta';

function getMeta(name: string) {
  return document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
}

function getOg(property: string) {
  return document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
}

function getCanonical() {
  return document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
}

function getJsonLdScript() {
  return document.head.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"][data-page-jsonld]',
  );
}

describe('useDocumentMeta', () => {
  it('sets title, description, and canonical on mount', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Home | Example',
        description: 'A test description.',
        canonical: 'https://clarksvilletn.ai/',
      }),
    );

    expect(document.title).toBe('Home | Example');
    expect(getMeta('description')?.getAttribute('content')).toBe('A test description.');
    expect(getCanonical()?.getAttribute('href')).toBe('https://clarksvilletn.ai/');
  });

  it('writes Open Graph title/description/url', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'About',
        description: 'About the project.',
        canonical: 'https://clarksvilletn.ai/about',
      }),
    );

    expect(getOg('og:title')?.getAttribute('content')).toBe('About');
    expect(getOg('og:description')?.getAttribute('content')).toBe('About the project.');
    expect(getOg('og:url')?.getAttribute('content')).toBe(
      'https://clarksvilletn.ai/about',
    );
  });

  it('adds og:image only when ogImage is provided', () => {
    type Props = Parameters<typeof useDocumentMeta>[0];
    const initialProps: Props = {
      title: 'T',
      description: 'D',
      canonical: 'https://clarksvilletn.ai/',
    };
    const { rerender } = renderHook((props: Props) => useDocumentMeta(props), {
      initialProps,
    });
    expect(getOg('og:image')).toBeNull();

    rerender({
      title: 'T',
      description: 'D',
      canonical: 'https://clarksvilletn.ai/',
      ogImage: 'https://clarksvilletn.ai/og.png',
    });
    expect(getOg('og:image')?.getAttribute('content')).toBe(
      'https://clarksvilletn.ai/og.png',
    );
  });

  it('adds noindex,nofollow robots meta when noIndex is true', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Submit',
        description: 'Private page.',
        canonical: 'https://clarksvilletn.ai/ai-ready/submit',
        noIndex: true,
      }),
    );

    const robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"][data-page-meta]',
    );
    expect(robots?.getAttribute('content')).toBe('noindex,nofollow');
  });

  it('removes the robots tag on unmount when noIndex was true', () => {
    const { unmount } = renderHook(() =>
      useDocumentMeta({
        title: 'Submit',
        description: 'Private page.',
        canonical: 'https://clarksvilletn.ai/ai-ready/submit',
        noIndex: true,
      }),
    );
    expect(
      document.head.querySelector('meta[name="robots"][data-page-meta]'),
    ).not.toBeNull();

    unmount();

    expect(
      document.head.querySelector('meta[name="robots"][data-page-meta]'),
    ).toBeNull();
  });

  it('does not emit a robots meta when noIndex is absent', () => {
    renderHook(() =>
      useDocumentMeta({
        title: 'Home',
        description: 'Public page.',
        canonical: 'https://clarksvilletn.ai/',
      }),
    );
    expect(
      document.head.querySelector('meta[name="robots"][data-page-meta]'),
    ).toBeNull();
  });

  it('injects JSON-LD script and removes it on unmount', () => {
    const jsonLd = { '@context': 'https://schema.org', '@type': 'WebPage' };
    const { unmount } = renderHook(() =>
      useDocumentMeta({
        title: 'LD',
        description: 'LD page.',
        canonical: 'https://clarksvilletn.ai/',
        jsonLd,
      }),
    );

    const script = getJsonLdScript();
    expect(script).not.toBeNull();
    expect(JSON.parse(script!.textContent ?? '{}')).toEqual(jsonLd);

    unmount();
    expect(getJsonLdScript()).toBeNull();
  });

  it('updates existing tags instead of duplicating them across prop changes', () => {
    const { rerender } = renderHook(
      (props: Parameters<typeof useDocumentMeta>[0]) => useDocumentMeta(props),
      {
        initialProps: {
          title: 'First',
          description: 'First description.',
          canonical: 'https://clarksvilletn.ai/a',
        },
      },
    );

    rerender({
      title: 'Second',
      description: 'Second description.',
      canonical: 'https://clarksvilletn.ai/b',
    });

    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1);
    expect(getCanonical()?.getAttribute('href')).toBe('https://clarksvilletn.ai/b');
    expect(getMeta('description')?.getAttribute('content')).toBe('Second description.');
    expect(document.title).toBe('Second');
  });
});
