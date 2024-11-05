import moment from 'moment';
import './style.scss';
import { CalendarHeaderProps } from './model';

export default function CalendarHeader({
  monthYear,
  isOpenYearPicker,
  onToggleYearPicker,
  onChangeMonth,
}: CalendarHeaderProps) {
  return (
    <div>
      <div className="calendar-title">
        {moment(monthYear).format('MMM, YYYY')}
      </div>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <button
          type="button"
          className="calendar-arrow"
          onClick={() => onChangeMonth(-1)}
        >
          {'<'}
        </button>
        <div
          onClick={onToggleYearPicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onToggleYearPicker();
          }}
        >
          {isOpenYearPicker ? monthYear.split(' ')[1] : monthYear}
        </div>
        <button
          type="button"
          className="calendar-arrow"
          onClick={() => onChangeMonth(1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
