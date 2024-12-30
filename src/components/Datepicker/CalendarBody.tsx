import classNames from 'classnames';
import { CalendarBodyProps } from './model';
import './style.scss';
import CalendarYearPopup from './CalendarYearPopup';
import { useDatepicker } from '../../contexts/DatepickerContext';

export default function CalendarBody({
  days,
  monthYear,
  nowMonthYear,
  nowDay,
  selectDate,
  onSelectDate,
}: CalendarBodyProps) {
  const { state, dispatch } = useDatepicker();

  return (
    <div className="calendar-body">
      <div className="calendar-body-week-day">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div className="calendar-body-week-item" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body-days">
        {days.map((day, index) => {
          const style = classNames(
            'calendar-body-days-item',
            {
              fixed: nowMonthYear === monthYear && day === parseInt(nowDay, 10),
            },
            {
              active:
                selectDate?.monthYear === monthYear &&
                selectDate?.day === day.toString().padStart(2, '0'),
            },
          );
          const dayIndex = `${day}+${index}`;
          return (
            <div
              key={dayIndex}
              className={style}
              role="button"
              tabIndex={0}
              onClick={() => onSelectDate(day)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectDate(day);
              }}
            >
              {day === 0 ? '' : day}
            </div>
          );
        })}
      </div>
      {state.isOpenYearPage && (
        <CalendarYearPopup
          onYearSelect={(year) => {
            dispatch({ type: 'SET_YEAR', payload: { year } });
            dispatch({ type: 'CLOSE_YEAR_PAGE' });
          }}
        />
      )}
    </div>
  );
}
