import moment from 'moment';
import './style.scss';
import { CalendarHeaderProps } from './model';
import leftArrow from '../../assets/icons/leftArrow.svg';
import rightArrow from '../../assets/icons/rightArrow.svg';

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
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="calendar-arrow"
          onClick={() => onChangeMonth(-1)}
        >
          <img src={leftArrow} alt="leftArrow" />
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
          <img src={rightArrow} alt="rightArrow" />
        </button>
      </div>
    </div>
  );
}
