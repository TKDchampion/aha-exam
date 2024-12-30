import { useEffect } from 'react';
import moment from 'moment';
import './style.scss';
import { CalendarHeaderProps } from './model';
import CalendarArrowControl from './CalendarArrowControl';
import { useDatepicker } from '../../contexts/DatepickerContext';

export default function CalendarHeader({
  monthYear,
  onChangeMonth,
}: CalendarHeaderProps) {
  const { state, dispatch } = useDatepicker();

  const handleMonth = (monthIndex: number) => {
    const newMonthYear = moment(monthYear)
      .add(monthIndex, 'months')
      .format('MMMM YYYY');
    onChangeMonth(newMonthYear);
    dispatch({
      type: 'SET_YEAR',
      payload: { year: parseInt(newMonthYear.split(' ')[1], 10) },
    });
  };

  const handleYear = (yearIndex: number) => {
    dispatch({
      type: 'SET_START_AND_END_YEAR',
      payload: {
        startYear: yearIndex > 0 ? state.startYear + 21 : state.startYear - 21,
      },
    });
  };

  const handleControl = (index: number) => {
    if (state.isOpenYearPage) {
      handleYear(index);
    } else {
      handleMonth(index);
    }
  };

  useEffect(() => {
    onChangeMonth(`${monthYear.split(' ')[0]} ${state.year}`);
  }, [state.year]);

  return (
    <div>
      <div className="calendar-title">
        {moment(monthYear).format('MMM, YYYY')}
      </div>
      <CalendarArrowControl
        prevBtn={() => handleControl(-1)}
        nextBtn={() => handleControl(1)}
        onToggleTitle={() =>
          dispatch({
            type: state.isOpenYearPage ? 'CLOSE_YEAR_PAGE' : 'OPEN_YEAR_PAGE',
          })
        }
        title={state.isOpenYearPage ? state.year.toString() : monthYear}
      />
    </div>
  );
}
