export const PanelInfo = [
  { id: 1, text: 'Have at least one uppercase letter', isChecked: false },
  { id: 2, text: 'Have at least one lowercase letter', isChecked: false },
  { id: 3, text: 'Have at least one number', isChecked: false },
  {
    id: 4,
    text: 'Have at least one special character (!@#$...etc)',
    isChecked: false,
  },
  { id: 5, text: 'At least 8 characters long.', isChecked: false },
];

export interface Props {
  isPassword?: boolean;
  onChange?: (str: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  calssName?: string;
  labelName?: string;
  value?: string;
  placeholder?: string;
}
