import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const CHUNK_ERROR = /loading chunk|dynamically imported module|importing a module script failed/i;
const RELOAD_COOLDOWN_MS = 10_000;

/**
 * Catches render errors anywhere below it and shows a branded fallback instead
 * of a blank white screen. Stale hashed-chunk import failures (common right
 * after a redeploy invalidates old chunks) are auto-recovered with a single
 * reload, guarded by a timestamp so a persistent error can never loop.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack);

    if (CHUNK_ERROR.test(error?.message ?? '')) {
      try {
        const last = Number(window.sessionStorage.getItem('chunk-reload-ts') ?? '0');
        if (Date.now() - last > RELOAD_COOLDOWN_MS) {
          window.sessionStorage.setItem('chunk-reload-ts', String(Date.now()));
          window.location.reload();
        }
      } catch {
        // sessionStorage unavailable (private mode / SSR) — fall through to fallback.
      }
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cloud-white px-6 text-center">
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-sunset-copper">
          ClarksvilleTN.AI
        </p>
        <h1 className="mt-4 font-serif text-3xl text-river-blue md:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md font-sans text-historic-stone">
          An unexpected error interrupted this page. Reloading usually resolves it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-river-blue px-6 py-3 font-sans font-medium text-cloud-white transition-colors hover:bg-river-blue/90"
          >
            Reload page
          </button>
          <a
            href="/"
            className="rounded-md border border-river-blue px-6 py-3 font-sans font-medium text-river-blue transition-colors hover:bg-river-blue/5"
          >
            Go home
          </a>
        </div>
      </div>
    );
  }
}
