export const TextFieldTokens = {
  // === Container ===
  container: {
    height: '56px',
    radius: '4px 4px 0 0',
    padding: {
      horizontal: '16px',
      vertical: '8px',
    },
  },

  // === Colors ===
  colors: {
    container: {
      filled: '#f3edf7', // Surface Container Highest
      outlined: 'transparent',
      disabled: 'rgba(29, 27, 32, 0.04)',
      error: '#b3261e', // Error
    },
    label: {
      default: '#49454f', // On Surface Variant
      focused: '#6750a4', // Primary
      error: '#b3261e',   // Error
      disabled: '#1d1b20', // On Surface (reduced opacity handled in CSS)
    },
    input: {
      text: '#1d1b20', // On Surface
      placeholder: '#49454f', // On Surface Variant
      disabled: '#1d1b20',
    },
    border: {
      default: '#79747e', // Outline
      focused: '#6750a4', // Primary
      error: '#b3261e',
      disabled: 'rgba(29, 27, 32, 0.12)',
    },
    icon: {
      default: '#49454f', // On Surface Variant
      error: '#b3261e',
      disabled: '#1d1b20',
    },
    supporting: {
      text: '#49454f', // On Surface Variant
      error: '#b3261e',
    },
  },

  // === Typography ===
  typography: {
    label: {
      font: '"Roboto", sans-serif',
      size: '16px',
      lineHeight: '24px',
      tracking: '0.5px',
      weight: '400',
    },
    supporting: {
      size: '12px',
      lineHeight: '16px',
      tracking: '0.4px',
    },
  },

  // === States ===
  states: {
    hover: {
      opacity: '0.08',
      layer: 'rgba(29, 27, 32, 0.08)',
    },
    pressed: {
      layer: 'rgba(29, 27, 32, 0.12)',
    },
    disabled: {
      opacity: '0.38',
    },
  },

  // === Transitions ===
  transition: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // === Spacing ===
  spacing: {
    icon: {
      size: '24px',
      gap: '12px',
    },
    supporting: {
      marginTop: '4px',
    },
    label: {
      floatingGap: '24px',
    },
  },
} as const;
