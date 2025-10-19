import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '../text-field';

describe('TextField Component', () => {
  it('should render outlined variant by default', () => {
    render(<TextField variant="outlined" value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    const container = input.closest('.textfield');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('textfield--outlined');
  });

  it('should show label and supporting text', () => {
    render(
      <TextField
        label="Username"
        supportingText="Enter your username"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your username/i)).toBeInTheDocument();
  });

  it('should show error message', () => {
    render(
      <TextField
        label="Email"
        error
        errorText="This field is required"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it('should allow typing (controlled)', () => {
    render(<TextField label="Name" value="Guido Test" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Guido Test');
  });

  it('should be disabled when disabled prop is set', () => {
    render(<TextField label="Name" disabled value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});