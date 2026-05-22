import { toDefaults } from './helpers';
import { type Properties } from './types';
import './styles/index.css';

export default function ComponentName(properties?: Properties) {
  const defaults = toDefaults(properties);

  const style = {
    ...defaults.style,
    // Inject CSS variables here
    // '--ui-comp-color': 'var(--md-sys-color-primary)',
  } as React.CSSProperties;

  return (
    <div style={style} className={`ui-component ${defaults.className}`}>
      {defaults.children}
    </div>
  );
}
