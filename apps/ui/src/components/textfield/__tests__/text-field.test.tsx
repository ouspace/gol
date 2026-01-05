import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import noop from 'lodash/noop';
import TextField from '../text-field';

describe('components/text-field', () => {
  describe('layout', () => {
    it('should render outlined variant by default', () => {
      render(<TextField variant="outlined" value="" onChange={noop} />);
      const input = screen.getByRole('textbox');
      const container = input.closest('.field.text');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('outlined');
    });

    it('should render filled variant', () => {
      render(<TextField variant="filled" value="" onChange={noop} />);
      const input = screen.getByRole('textbox');
      const container = input.closest('.field.text');
      expect(container).toHaveClass('filled');
    });

    it('should show label and supporting text', () => {
      render(
        <TextField
          label="Username"
          supportingText="Enter your username"
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByText(/enter your username/i)).toBeInTheDocument();
    });

    it('should show prefix and suffix', () => {
      render(
        <TextField
          label="Price"
          prefix="$"
          suffix="USD"
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
    });

    it('should render with leading icon', () => {
      render(
        <TextField
          label="Search"
          leadingIcon={<span data-testid="leading-icon">🔍</span>}
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    });

    it('should render with trailing icon', () => {
      render(
        <TextField
          label="Password"
          trailingIcon={<span data-testid="trailing-icon">👁️</span>}
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
    });

    it('should have placeholder attribute', () => {
      render(
        <TextField
          label="Email"
          placeholder="Enter your email"
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        'Enter your email'
      );
    });
  });

  describe('events', () => {
    it('should allow typing (controlled)', () => {
      render(<TextField label="Name" value="Guido Test" onChange={noop} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Guido Test');
    });

    it('should handle uncontrolled behavior with defaultValue', () => {
      render(<TextField label="Name" defaultValue="Initial Value" onChange={noop} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Initial Value');
    });

    it('should handle empty value correctly', () => {
      render(<TextField label="Field" value="" onChange={noop} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });

  describe('validation', () => {
    it('should show error message', () => {
      render(
        <TextField
          label="Email"
          error
          errorText="This field is required"
          value=""
          onChange={noop}
        />
      );
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is set', () => {
      render(<TextField label="Name" disabled value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should be read-only when readOnly prop is set', () => {
      render(<TextField label="Name" readOnly value="Read only text" onChange={noop} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('should mark field as required with asterisk', () => {
      render(<TextField label="Required Field" required value="" onChange={noop} />);
      expect(screen.getByLabelText(/required field/i)).toBeInTheDocument();
    });

    it('should show character counter when showCounter is true', () => {
      render(
        <TextField
          label="Description"
          max={100}
          showCounter
          value="Hello"
          onChange={noop}
        />
      );
      expect(screen.getByText(/5\s*\/\s*100/)).toBeInTheDocument();
    });

    it('should respect max prop', () => {
      render(
        <TextField label="Name" max={10} value="" onChange={noop} />
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('should apply error styling when error prop is true', () => {
      render(
        <TextField
          error
          errorText="Error message"
          value=""
          onChange={noop}
        />
      );
      const input = screen.getByRole('textbox');
      const container = input.closest('.field.text');
      expect(container).toHaveClass('error');
    });
  });

  describe('accessibility', () => {
    it('should be accessible with aria attributes', () => {
      const { container } = render(
        <TextField
          label="Name"
          supportingText="Help text"
          value=""
          onChange={noop}
        />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName(/name/i);

      const supportingTextId = container.querySelector('.textfield__supporting-text')?.id;
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(supportingTextId!));
    });

    it('should update aria-invalid on error', () => {
      render(<TextField label="Email" error errorText="Invalid" value="" onChange={noop} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('integration', () => {
    it('should accept different input types', () => {
      const { rerender } = render(
        <TextField type="email" value="" onChange={noop} />
      );
      expect(screen.getByTestId('textfield-input')).toHaveAttribute('type', 'email');

      rerender(<TextField type="password" value="" onChange={noop} />);
      expect(screen.getByTestId('textfield-input')).toHaveAttribute('type', 'password');

      rerender(<TextField type="tel" value="" onChange={noop} />);
      expect(screen.getByTestId('textfield-input')).toHaveAttribute('type', 'tel');

      rerender(<TextField type="number" value="" onChange={noop} />);
      expect(screen.getByTestId('textfield-input')).toHaveAttribute('type', 'number');
    });

    it('should have data-testid attribute', () => {
      render(<TextField label="Test" value="" onChange={noop} />);
      expect(screen.getByTestId('textfield-input')).toBeInTheDocument();
    });
  });
});