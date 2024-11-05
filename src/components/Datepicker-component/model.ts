export interface Props {
  okAndCancel?: (tyep: 'cancel' | 'ok', date: string) => void;
  openCalendar?: boolean;
}
