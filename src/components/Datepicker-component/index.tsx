import { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';
import classNames from 'classnames';
import { Props } from './model';
import getWeeksInMonth from '../../utils/list-days';

const nowMonthYear = moment().format('MMMM YYYY');
const nowDay = moment().format('DD');

function DatepickerCompanent({ okAndCancel, openCalendar }: Props) {
  const [days, setDays] = useState<number[]>([]);
  const [monthYear, setMonthYear] = useState('');
  const [selectDate, setSelectDate] = useState({
    monthYear: nowMonthYear,
    day: nowDay,
  });
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [currentNote, setCurrentNote] = useState('');
  const [isOpenYearPicker, setIsOpenYearPicker] = useState(false);

  useEffect(() => {
    setMonthYear(nowMonthYear);
    const daysList: number[] = getWeeksInMonth(nowMonthYear);
    setDays(daysList);
  }, []);

  useEffect(() => {
    setCurrentNote('');
    const savedNotes = notes[`${selectDate.monthYear}/${selectDate.day}`] || '';
    setCurrentNote(savedNotes);
  }, [selectDate]);

  const prev = () => {
    const newMonthYear = moment(monthYear)
      .subtract(1, 'months')
      .format('MMMM YYYY');
    setMonthYear(newMonthYear);
    const daysList: number[] = getWeeksInMonth(newMonthYear);
    setDays(daysList);
  };

  const next = () => {
    const newMonthYear = moment(monthYear).add(1, 'months').format('MMMM YYYY');
    setMonthYear(newMonthYear);
    const daysList: number[] = getWeeksInMonth(newMonthYear);
    setDays(daysList);
  };

  const handleSaveNote = () => {
    const dateKey = `${selectDate.monthYear}/${selectDate.day}`;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [dateKey]: currentNote,
    }));
  };

  return (
    <div className="calendar-component-box">
      {openCalendar && (
        <input
          className="calendar-txt"
          type="text"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Add a note for this date"
        />
      )}
      <div className="calendar-title">
        {moment(monthYear).format('MMM, YYYY')}
      </div>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <div
          className="calendar-arrow"
          role="button"
          tabIndex={0} // Makes the div focusable
          onClick={prev}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              prev();
            }
          }}
        >
          {'<'}
        </div>
        <div
          className="calendar-sub-title"
          role="button"
          tabIndex={0}
          onClick={() => setIsOpenYearPicker((value) => !value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpenYearPicker((value) => !value);
            }
          }}
        >
          {isOpenYearPicker ? monthYear.split(' ')[1] : monthYear}
        </div>

        <div
          className="calendar-arrow"
          role="button"
          tabIndex={0}
          onClick={next}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              next();
            }
          }}
        >
          {'>'}
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-body-week-day">
          <div className="calendar-body-week-item">Su</div>
          <div className="calendar-body-week-item">Mo</div>
          <div className="calendar-body-week-item">Tu</div>
          <div className="calendar-body-week-item">We</div>
          <div className="calendar-body-week-item">Th</div>
          <div className="calendar-body-week-item">Fr</div>
          <div className="calendar-body-week-item">Sa</div>
        </div>
        <div className="calendar-body-days">
          {days.map((day, index) => {
            const style = classNames(
              'calendar-body-days-item',
              {
                fixed:
                  nowMonthYear === monthYear && day === parseInt(nowDay, 10),
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
                onClick={() =>
                  day !== 0 &&
                  setSelectDate({
                    day: day.toString().padStart(2, '0'),
                    monthYear,
                  })
                }
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && day !== 0) {
                    setSelectDate({
                      day: day.toString().padStart(2, '0'),
                      monthYear,
                    });
                  }
                }}
              >
                {day === 0 ? '' : day}
              </div>
            );
          })}
        </div>
        {isOpenYearPicker && (
          <div className="calendar-body-year-picker">
            {Array(20)
              .fill(2021)
              .map((year: number, index: number) => {
                const yearIndex = `${year + index}`;
                const style = classNames('calendar-body-year-picker-item', {
                  active: yearIndex === monthYear.split(' ')[1],
                });
                return (
                  <div
                    key={yearIndex}
                    className={style}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setMonthYear(
                        `${monthYear.split(' ')[0]} ${year + index}`,
                      );
                      setIsOpenYearPicker(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMonthYear(
                          `${monthYear.split(' ')[0]} ${year + index}`,
                        );
                        setIsOpenYearPicker(false);
                      }
                    }}
                  >
                    {year + index}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="d-flex mt-3 justify-content-end">
        <div
          className="calendar-button"
          role="button"
          tabIndex={0}
          onClick={() => okAndCancel && okAndCancel('cancel', '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              okAndCancel?.('cancel', '');
            }
          }}
        >
          Cancel
        </div>

        <div
          className="calendar-button ok"
          role="button"
          tabIndex={0}
          onClick={() => {
            handleSaveNote();
            const outputDate = moment(
              `${selectDate.monthYear} ${selectDate.day}`,
            ).format('MM/DD/YYYY');
            if (okAndCancel) {
              okAndCancel('ok', outputDate);
            }
          }}
          onKeyDown={(e) => {
            handleSaveNote();
            if (e.key === 'Enter' || e.key === ' ') {
              const outputDate = moment(
                `${selectDate.monthYear} ${selectDate.day}`,
              ).format('MM/DD/YYYY');
              if (okAndCancel) {
                okAndCancel('ok', outputDate);
              }
            }
          }}
        >
          Ok
        </div>
      </div>
    </div>
  );
}

export default DatepickerCompanent;
