// root.tsx
import { toDefaults } from './helpers';
import { type Properties } from './types';
import './styles/index.css';

export default function Button(properties?: Properties) {
  const defaults = toDefaults(properties);

  const style = {
    ...defaults.style,
    '--ui-button-variant': defaults.variant,
    '--ui-button-size': defaults.size,
  } as React.CSSProperties;

  return (
    <button
      ref={defaults.ref}
      style={style}
      className={`ui-button ${defaults.className}`}
      disabled={defaults.disabled}
      onClick={defaults.onClick}
    >
      {defaults.label}
    </button>
  );
}
