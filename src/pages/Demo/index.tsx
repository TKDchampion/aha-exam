import InputComponent from '../../components/Input-component';

function Demo() {
  return (
    <div>
      <h1>Demo</h1>
      <div className="row">
        <div className="col-4">
          <h2>Password Input</h2>
          <InputComponent isPassword />
        </div>
        {/* <div className="col-4">
          <h2>Calendar</h2>
          <CalendarCompanent />
        </div>
        <div className="col-4">
          <h2>Calendar</h2>
          <AdvanceComponent />
        </div> */}
      </div>
    </div>
  );
}

export default Demo;
