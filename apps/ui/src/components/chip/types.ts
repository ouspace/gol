import type { ReactNode, RefAttributes, SyntheticEvent } from 'react';

type Size<TValue extends string> = TValue | number;
type Color<TValue extends string> = TValue | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hsla(${string})` | `#${string}`;

type AssistExcludedProperties  = 'selected' | 'onToggle' | 'onRemove' | 'avatar';
type FilterExcludedProperties  = 'onRemove' | 'avatar';
type InputExcludedProperties  = 'onToggle';
type SuggestionExcludedProperties  = 'selected' | 'onToggle' | 'onRemove' | 'avatar' | 'icon';

export type Properties = RefAttributes<HTMLElement> & {
  /**
   * Defines the chip role/type.
   * 
   * @default "assist"
   * 
   * Role-specific available properties:
   * - assist: onClick, icon, href, target
   * - filter: onClick, onToggle, selected, icon, href, target
   * - input: onClick, onRemove, selected, icon, avatar, href, target
   * - suggestion: onClick, href, target
   * 
   * @example
   * // Assist chips - for actions and help
   * <Chip role="assist" onClick={handler}>Content</Chip>
   * 
   * // Filter chips - for selectable filters
   * <Chip role="filter" selected={true} onToggle={handler}>Content</Chip>
   * 
   * // Input chips - for removable tags
   * <Chip role="input" onRemove={handler} avatar={<UserIcon/>}>Content</Chip>
   * 
   * // Suggestion chips - for clickable suggestions
   * <Chip role="suggestion" onClick={handler}>Content</Chip>
   * 
   * @remarks
   * All roles support: children, color, variant, radius, disabled
   */
  role?: 'assist' | 'filter' | 'input' | 'suggestion';

  /**
   * Main content of the chip
   * 
   * @example
   * children="Primary Chip"
   * children={<chip>Custom Content</chip>}
   */
  children: ReactNode;

  /**
   * Defines the chip color, and supports `rgb` | `rgba` | `hsl` | `hsla` | `hex` | `named colors`
   * 
   * @default "default"
   * @example
   * color="primary"   
   * color="success"   
   * color="error"    
   */
  color?: Color<'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'>;

  /**
   * Defines the chip size
   * 
   * @default "normal"
   * @example
   * size="small"   
   * size="normal"  
   * size="big"    
   * size={28}  
   */
  size?: Size<'small' | 'normal' | 'big'>;

  /**
   * Defines the visual style of the chip
   * 
   * @default "filled"
   * @example
   * variant="filled"  
   * variant="outlined" 
   */
  variant?: 'filled' | 'outlined';

  /**
   * Defines the border radius of the chip
   * 
   * @default "rounded"
   * @example
   * radius="square"   
   * radius="rounded"  
   * radius={8}        
   * radius="50%"      
   * radius="2rem"    
   */
  radius?: 'square' | 'rounded' | number | `${number}px` | `${number}rem` | `${number}%`;

  /**
   * Icon displayed at the start of the chip (don't use with avatar)
   * 
   * @example
   * icon={<CustomIcon />}
   */
  icon?: ReactNode;

  /**
   * Avatar displayed at the start of the chip (only for input chips, don't use with icon)
   * 
   * @example
   * avatar={<img src="/user.jpg"/>}
   */
  avatar?: ReactNode;

  /**
   * URL to make the chip a clickable link
   * 
   * @example
   * href="https://example.com"
   * href="/dashboard"
   */
  href?: string;

  /**
   * Target attribute for the link
   * 
   * @example
   * target="_blank"   
   * target="_self"    
   * target="_parent" 
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Indicates if the chip is selected (only for filter/input chips)
   * @default false
   */
  selected?: boolean;

  /**
   * Disables the chip interaction
   * @default false
   */
  disabled?: boolean;

  /**
	 * Defines the chip class name
	 */
  className?: string;

  /**
   * Click event
   * 
   * @param event
   * @returns 
   */
  onClick?: (event: SyntheticEvent, properties: Properties) => void;

  /**
   * Remove event handler for input chips (shows X button)
   * 
   * @param event
   * @returns 
   */
  onRemove?: (event: SyntheticEvent, properties: Properties) => void;

  /**
   * Toggle event handler for filter chips
   * 
   * @param event 
   * @param selected 
   * @returns
   */
  onToggle?: (event: SyntheticEvent, selected: boolean, properties: Properties) => void;
};

/**
 * Properties specific to assist chips
 */
export type AssistProperties = Omit<Properties, AssistExcludedProperties> & {  
  role: 'assist';
};

/**
 * Properties specific to filter chips
 */
export type FilterProperties = Omit<Properties, FilterExcludedProperties> & {
  role: 'filter';
};

/**
 * Properties specific to input chips
 */
export type InputProperties = Omit<Properties, InputExcludedProperties> & {
  role: 'input';
};

/**
 * Properties specific to suggestion chips
 */
export type SuggestionProperties = Omit<Properties, SuggestionExcludedProperties> & {
  role: 'suggestion';
};

/**
 * Union type for all chip variants
 */
export type ChipsProperties =
  | Properties
  | AssistProperties
  | FilterProperties
  | InputProperties
  | SuggestionProperties;
