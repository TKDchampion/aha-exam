import './style.scss';
import { CalendarArrowControlProps } from './model';
import leftArrow from '../../assets/icons/leftArrow.svg';
import rightArrow from '../../assets/icons/rightArrow.svg';

export default function CalendarArrowControl({
  prevBtn,
  nextBtn,
  onToggleTitle,
  title,
}: CalendarArrowControlProps) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button type="button" className="calendar-arrow" onClick={prevBtn}>
        <img src={leftArrow} alt="leftArrow" />
      </button>
      <div
        onClick={onToggleTitle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onToggleTitle();
        }}
      >
        {title}
      </div>
      <button type="button" className="calendar-arrow" onClick={nextBtn}>
        <img src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  );
}
