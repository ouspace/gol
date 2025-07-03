export type Properties = {
  /**
   *
   */
  id?: string;
  
  /**
   *
   */
  label?: string;
  
  /**
   *
   * @default undefined
   */
  value?: boolean | null;
  
  /**
   *
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'error';
  
  /**
   *
   */
  onChange?: (event: React.SyntheticEvent, properties: Properties) => void;
}