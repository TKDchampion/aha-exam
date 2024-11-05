interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotesInput({ value, onChange }: NotesInputProps) {
  return (
    <input
      className="calendar-txt"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add a note for this date"
    />
  );
}
