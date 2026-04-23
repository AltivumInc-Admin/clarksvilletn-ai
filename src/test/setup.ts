import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  while (document.head.firstChild) {
    document.head.removeChild(document.head.firstChild);
  }
  document.title = '';
});
