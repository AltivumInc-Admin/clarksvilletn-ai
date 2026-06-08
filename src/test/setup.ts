import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  // setupFiles run for every test file, including node-environment backend
  // tests where there is no DOM — skip the jsdom cleanup there.
  if (typeof document === 'undefined') return;
  cleanup();
  while (document.head.firstChild) {
    document.head.removeChild(document.head.firstChild);
  }
  document.title = '';
});
