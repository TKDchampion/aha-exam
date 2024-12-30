import classNames from 'classnames';
import { CalendarYearPopupProps } from './model';
import './style.scss';
import { useDatepicker } from '../../contexts/DatepickerContext';

export default function CalendarYearPopup({
  onYearSelect,
}: CalendarYearPopupProps) {
  const { state } = useDatepicker();

  return (
    <div className="calendar-body-year-picker">
      {Array.from(
        { length: state.endYear - state.startYear + 1 },
        (_, i) => state.startYear + i,
      ).map((yearItem) => (
        <div
          key={yearItem}
          className={classNames('calendar-body-year-picker-item', {
            active: yearItem === state.year,
          })}
          onClick={() => onYearSelect(yearItem)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onYearSelect(yearItem);
          }}
        >
          {yearItem}
        </div>
      ))}
    </div>
  );
}
