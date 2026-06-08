/**
 * Visible loading state shown while a lazy route chunk resolves. Replaces the
 * previous invisible empty div so route transitions don't flash a blank panel.
 */
export default function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-tech-silver border-t-river-blue motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
