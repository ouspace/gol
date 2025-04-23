export interface CheckboxProperties {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}
