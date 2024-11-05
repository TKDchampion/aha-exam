import { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';
import { Props } from './model';
import getWeeksInMonth from '../../utils/list-days';
import NotesInput from './NotesInput';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';

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
  const [isOpenYearPicker, setIsOpenYearPicker] = useState(false);

  useEffect(() => {
    setDays(getWeeksInMonth(monthYear));
  }, [monthYear]);

  useEffect(() => {
    setCurrentNote(notes[`${selectDate.monthYear}/${selectDate.day}`] || '');
  }, [selectDate, notes]);

  const changeMonth = (months: number) => {
    const newMonthYear = moment(monthYear)
      .add(months, 'months')
      .format('MMMM YYYY');
    setMonthYear(newMonthYear);
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
    <div className="calendar-component-box">
      {openCalendar && (
        <NotesInput value={currentNote} onChange={setCurrentNote} />
      )}
      <CalendarHeader
        monthYear={monthYear}
        isOpenYearPicker={isOpenYearPicker}
        onToggleYearPicker={() => setIsOpenYearPicker(!isOpenYearPicker)}
        onChangeMonth={changeMonth}
      />
      <CalendarBody
        days={days}
        monthYear={monthYear}
        nowMonthYear={nowMonthYear}
        nowDay={nowDay}
        selectDate={selectDate}
        isOpenYearPicker={isOpenYearPicker}
        onSelectDate={handleDateSelect}
        onYearSelect={(year) => {
          setMonthYear(`${monthYear.split(' ')[0]} ${year}`);
          setIsOpenYearPicker(false);
        }}
      />
      <CalendarFooter
        onCancel={() => okAndCancel?.('cancel', '')}
        onOk={handleOk}
      />
    </div>
  );
}

export default Datepicker;
