export interface Props {
  okAndCancel?: (tyep: 'cancel' | 'ok', date: string) => void;
  openCalendar?: boolean;
}

export interface CalendarBodyProps {
  days: number[];
  monthYear: string;
  nowMonthYear: string;
  nowDay: string;
  selectDate: { monthYear: string; day: string };
  isOpenYearPicker: boolean;
  onSelectDate: (day: number) => void;
  onYearSelect: (year: number) => void;
}

export interface CalendarFooterProps {
  onCancel: () => void;
  onOk: () => void;
}

export interface CalendarHeaderProps {
  monthYear: string;
  isOpenYearPicker: boolean;
  onToggleYearPicker: () => void;
  onChangeMonth: (months: number) => void;
}
