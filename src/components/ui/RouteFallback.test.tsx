import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RouteFallback from './RouteFallback';

describe('RouteFallback', () => {
  it('exposes an accessible loading status', () => {
    render(<RouteFallback />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(/loading/i);
  });
});
