import Advance from '../../components/Advance';
import Datepicker from '../../components/Datepicker';
import InputElement from '../../components/Input-element';

function Demo() {
  return (
    <div>
      <h1>Demo</h1>
      <div className="row">
        <div className="col-4">
          <h2>Password Input</h2>
          <InputElement isPassword />
        </div>
        <div className="col-4">
          <h2>Calendar</h2>
          <Datepicker openCalendar />
        </div>
        <div className="col-4">
          <h2>Calendar</h2>
          <Advance />
        </div>
      </div>
    </div>
  );
}

export default Demo;
