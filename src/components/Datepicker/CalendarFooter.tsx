import './style.scss';
import { CalendarFooterProps } from './model';

export default function CalendarFooter({
  onCancel,
  onOk,
}: CalendarFooterProps) {
  return (
    <div className="d-flex mt-3 justify-content-end">
      <button type="button" className="calendar-button" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" className="calendar-button ok" onClick={onOk}>
        Ok
      </button>
    </div>
  );
}
