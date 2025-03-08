import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

function InputText({
  id,
  label,
  placeholder,
  value,
  error,
  onChange
}: {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label className={error ? 'text-red-600' : ''} htmlFor={id}>
          {label}
        </Label>
      )}

      <Input
        className={`${error ? 'border-red-600' : ''} text-sm h-10`}
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}

export { InputText };
