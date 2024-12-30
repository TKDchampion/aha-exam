import { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';
import { Props } from './model';
import getWeeksInMonth from '../../utils/list-days';
import NotesInput from './NotesInput';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import DatepickerProvider from '../../contexts/DatepickerContext';

function Datepicker({ okAndCancel, openCalendar }: Props) {
  const nowMonthYear = moment().format('MMMM YYYY');
  const nowDay = moment().format('DD');

  const [days, setDays] = useState<number[]>([]);
  const [monthYear, setMonthYear] = useState(nowMonthYear);
  const [selectDate, setSelectDate] = useState({
    monthYear: nowMonthYear,
    day: nowDay,
  });
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    setDays(getWeeksInMonth(monthYear));
  }, [monthYear]);

  useEffect(() => {
    setCurrentNote(notes[`${selectDate.monthYear}/${selectDate.day}`] || '');
  }, [selectDate, notes]);

  const changeMonth = (monthYearValue: string) => {
    setMonthYear(monthYearValue);
  };

  const handleSaveNote = () => {
    const dateKey = `${selectDate.monthYear}/${selectDate.day}`;
    setNotes((prevNotes) => ({ ...prevNotes, [dateKey]: currentNote }));
  };

  const handleDateSelect = (day: number) => {
    if (day !== 0) {
      setSelectDate({ day: day.toString().padStart(2, '0'), monthYear });
    }
  };

  const handleOk = () => {
    handleSaveNote();
    const outputDate = moment(
      `${selectDate.monthYear} ${selectDate.day}`,
    ).format('MM/DD/YYYY');
    okAndCancel?.('ok', outputDate);
  };

  return (
    <DatepickerProvider>
      <div className="calendar-component-box">
        {openCalendar && (
          <NotesInput value={currentNote} onChange={setCurrentNote} />
        )}
        <CalendarHeader monthYear={monthYear} onChangeMonth={changeMonth} />
        <CalendarBody
          days={days}
          monthYear={monthYear}
          nowMonthYear={nowMonthYear}
          nowDay={nowDay}
          selectDate={selectDate}
          onSelectDate={handleDateSelect}
        />
        <CalendarFooter
          onCancel={() => okAndCancel?.('cancel', '')}
          onOk={handleOk}
        />
      </div>
    </DatepickerProvider>
  );
}

export default Datepicker;
