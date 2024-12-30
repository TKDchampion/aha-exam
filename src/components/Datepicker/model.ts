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
  onSelectDate: (day: number) => void;
}

export interface CalendarFooterProps {
  onCancel: () => void;
  onOk: () => void;
}

export interface CalendarHeaderProps {
  monthYear: string;
  onChangeMonth: (months: string) => void;
}

export interface CalendarArrowControlProps {
  prevBtn: () => void;
  nextBtn: () => void;
  onToggleTitle: () => void;
  title: string;
}

export interface CalendarYearPopupProps {
  onYearSelect: (year: number) => void;
}
