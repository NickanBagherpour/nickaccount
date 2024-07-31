export type Option = {
  value: string;
  label: string;
};

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'standard';

export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  size?: SelectSize;
  variant?: SelectVariant;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
};