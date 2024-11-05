import Advance from '../../components/Advance';
import Datepicker from '../../components/Datepicker';
import InputElement from '../../components/Input-element';

function Demo() {
  return (
    <div className="container">
      <h1 className="text-center">Demo</h1>
      <div className="row">
        <div className="col-xl-4 col-12 mb-4">
          <h2>Password Input</h2>
          <InputElement isPassword />
        </div>
        <div className="col-xl-4 col-12 mb-4">
          <h2>Calendar</h2>
          <Datepicker openCalendar />
        </div>
        <div className="col-xl-4 col-12 mb-4">
          <h2>Advanced Calendar</h2>
          <Advance />
        </div>
      </div>
    </div>
  );
}

export default Demo;
