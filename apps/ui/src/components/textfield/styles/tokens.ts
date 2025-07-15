export const TextFieldTokens = {
	// Container
	container: {
		height: '56px',
		radius: '4px 4px 0 0',
		padding: {
			horizontal: '16px',
			vertical: '8px'
		}
	},

	// Colors
	colors: {
		container: {
			filled: 'var(--md-sys-color-surface-container-highest)',
			outlined: 'transparent',
			disabled: 'rgba(29, 27, 32, 0.04)',
			error: 'var(--md-sys-color-error)'
		},
		label: {
			default: 'var(--md-sys-color-on-surface-variant)',
			focused: 'var(--md-sys-color-primary)',
			error: 'var(--md-sys-color-error)',
			disabled: 'var(--md-sys-color-on-surface)'
		},
		input: {
			text: 'var(--md-sys-color-on-surface)',
			placeholder: 'var(--md-sys-color-on-surface-variant)',
			disabled: 'var(--md-sys-color-on-surface)'
		},
		border: {
			default: 'var(--md-sys-color-outline)',
			focused: 'var(--md-sys-color-primary)',
			error: 'var(--md-sys-color-error)',
			disabled: 'rgba(29, 27, 32, 0.12)'
		},
		icon: {
			default: 'var(--md-sys-color-on-surface-variant)',
			error: 'var(--md-sys-color-error)',
			disabled: 'var(--md-sys-color-on-surface)'
		},
		supporting: {
			text: 'var(--md-sys-color-on-surface-variant)',
			error: 'var(--md-sys-color-error)'
		}
	},

	// Typography
	typography: {
		label: {
			font: 'var(--md-sys-typescale-body-large-font)',
			size: 'var(--md-sys-typescale-body-large-size)',
			lineHeight: 'var(--md-sys-typescale-body-large-line-height)',
			tracking: 'var(--md-sys-typescale-body-large-tracking)',
			weight: 'var(--md-sys-typescale-body-large-weight)'
		},
		supporting: {
			size: '12px',
			lineHeight: '16px',
			tracking: '0.4px'
		}
	},

	// States
	states: {
		hover: {
			opacity: '0.08',
			layer: 'rgba(29, 27, 32, 0.08)'
		},
		pressed: {
			layer: 'rgba(29, 27, 32, 0.12)'
		},
		disabled: {
			opacity: '0.38'
		}
	},

	// Transitions
	transition: {
		duration: '200ms',
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
	},

	// Spacing
	spacing: {
		icon: {
			size: '24px',
			gap: '12px'
		},
		supporting: {
			marginTop: '4px'
		},
		label: {
			floatingGap: '24px'
		}
	}
} as const;