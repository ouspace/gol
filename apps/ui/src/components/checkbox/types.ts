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
     * @default false
     */
    checked?: boolean;
    
    /**
     *
     * @default false
     */
    disabled?: boolean;
    
    /**
     * 
     * @default 'primary'
     */
    theme?: 'primary' | 'secondary' | 'error';
    
    /**
     *
     */
    onChange: (checked: boolean) => void;
  }