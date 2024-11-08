import { useState } from 'react';
import Datepicker from '../Datepicker';
import InputElement from '../Input-element';
import './style.scss';

function Advance() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div>
      <InputElement
        calssName="advance-input"
        labelName="Birthday"
        onFocus={() => setIsOpenDatePicker(true)}
        value={selectedDate}
        placeholder="mm/dd/yyyy"
        // onBlur={(e) => console.log(e)}
      />
      {isOpenDatePicker && (
        <Datepicker
          okAndCancel={(type, date) => {
            if (type === 'ok') {
              setSelectedDate(date);
            }
            setIsOpenDatePicker(false);
          }}
          openCalendar
        />
      )}
    </div>
  );
}

export default Advance;
