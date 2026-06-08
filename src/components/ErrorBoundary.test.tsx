import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Boom({ message }: { message: string }): never {
  throw new Error(message);
}

let reload: ReturnType<typeof vi.fn>;
let originalLocation: Location;

beforeEach(() => {
  window.sessionStorage.clear();
  reload = vi.fn();
  originalLocation = window.location;
  // jsdom's location.reload is non-configurable, so replace the whole object.
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload, href: 'http://localhost/' },
  });
  // React logs caught errors to console.error; keep test output clean.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders a branded fallback with a reload action when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom message="kaboom" />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
    // A non-chunk render error must NOT auto-reload (would loop on a real bug).
    expect(reload).not.toHaveBeenCalled();
  });

  it('auto-reloads once on a stale dynamic-import (chunk) failure', () => {
    render(
      <ErrorBoundary>
        <Boom message="Failed to fetch dynamically imported module: /assets/Home-abc.js" />
      </ErrorBoundary>,
    );
    expect(reload).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.getItem('chunk-reload-ts')).toBeTruthy();
  });

  it('does not reload again for a repeat chunk failure within the cooldown window', () => {
    window.sessionStorage.setItem('chunk-reload-ts', String(Date.now()));
    render(
      <ErrorBoundary>
        <Boom message="error loading dynamically imported module" />
      </ErrorBoundary>,
    );
    expect(reload).not.toHaveBeenCalled();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
