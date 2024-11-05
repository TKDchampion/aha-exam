import { useState } from 'react';
import DatepickerCompanent from '../Datepicker-component';
import InputComponent from '../Input-component';
import './style.scss';

function AdvanceComponent() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div>
      <InputComponent
        calssName="advance-input"
        labelName="Birthday"
        onFocus={() => setIsOpenDatePicker(true)}
        value={selectedDate}
        // onBlur={(e) => console.log(e)}
      />
      {isOpenDatePicker && (
        <DatepickerCompanent
          okAndCancel={(type, date) => {
            if (type === 'ok') {
              setSelectedDate(date);
            }
            setIsOpenDatePicker(false);
          }}
        />
      )}
    </div>
  );
}

export default AdvanceComponent;
