import { useEffect, useState, useCallback, useMemo } from 'react';
import './style.scss';
import moment from 'moment';
import { DatepickerProps } from './model';
import getWeeksInMonth from '../../utils/list-days';
import NotesInput from './NotesInput';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import DatepickerProvider from '../../contexts/DatepickerContext';

function Datepicker({
  okAndCancel,
  openCalendar,
  defaultDate,
}: DatepickerProps) {
  const nowMonthYear = moment().format('MMMM YYYY');
  const nowDay = moment().format('DD');

  const [days, setDays] = useState<number[]>([]);
  const [monthYear, setMonthYear] = useState(nowMonthYear);
  const [selectDate, setSelectDate] = useState({
    monthYear: nowMonthYear,
    day: nowDay,
  });
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const currentNote = useMemo(
    () => notes[`${selectDate.monthYear}/${selectDate.day}`] || '',
    [selectDate, notes],
  );

  useEffect(() => {
    if (defaultDate) {
      const defalutFormat = moment(defaultDate).format('MMMM YYYY');
      setMonthYear(defalutFormat);
      setSelectDate({
        monthYear: defalutFormat,
        day: moment(defaultDate).format('DD'),
      });
    }
  }, [defaultDate]);

  useEffect(() => {
    setDays(getWeeksInMonth(monthYear));
  }, [monthYear]);

  const changeMonth = useCallback((monthYearValue: string) => {
    setMonthYear(monthYearValue);
  }, []);

  const handleSaveNote = useCallback(() => {
    const dateKey = `${selectDate.monthYear}/${selectDate.day}`;
    setNotes((prevNotes) => ({ ...prevNotes, [dateKey]: currentNote }));
  }, [selectDate, currentNote]);

  const handleDateSelect = useCallback(
    (day: number) => {
      if (day !== 0) {
        setSelectDate({ day: day.toString().padStart(2, '0'), monthYear });
      }
    },
    [monthYear],
  );

  const handleOk = useCallback(() => {
    handleSaveNote();
    const outputDate = moment(
      `${selectDate.monthYear} ${selectDate.day}`,
    ).format('MM/DD/YYYY');
    okAndCancel?.('ok', outputDate);
  }, [handleSaveNote, selectDate, okAndCancel]);

  return (
    <DatepickerProvider>
      <div className="calendar-component-box">
        {openCalendar && (
          <NotesInput
            value={currentNote}
            onChange={(value) =>
              setNotes((prevNotes) => ({
                ...prevNotes,
                [`${selectDate.monthYear}/${selectDate.day}`]: value,
              }))
            }
          />
        )}
        <CalendarHeader monthYear={monthYear} onChangeMonth={changeMonth} />
        <CalendarBody
          days={days}
          monthYear={monthYear}
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
