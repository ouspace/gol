import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconButton from '../button.icon';

describe('IconButton', () => {
  it('renders with icon', () => {
    render(<IconButton aria-label="Icon button">🔔</IconButton>);
    const button = screen.getByRole('button', { name: /icon button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with disabled prop', () => {
    render(<IconButton aria-label="Disabled icon" disabled>🔕</IconButton>);
    const button = screen.getByRole('button', { name: /disabled icon/i });
    expect(button).toBeDisabled();
  });
});
