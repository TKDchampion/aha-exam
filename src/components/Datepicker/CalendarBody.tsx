import classNames from 'classnames';
import { CalendarBodyProps } from './model';
import './style.scss';

export default function CalendarBody({
  days,
  monthYear,
  nowMonthYear,
  nowDay,
  selectDate,
  isOpenYearPicker,
  onSelectDate,
  onYearSelect,
}: CalendarBodyProps) {
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
                selectDate?.day === day.toString(),
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
      {isOpenYearPicker && (
        <div className="calendar-body-year-picker">
          {Array.from({ length: 20 }, (_, i) => 2021 + i).map((year) => (
            <div
              key={year}
              onClick={() => onYearSelect(year)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onYearSelect(year);
              }}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
