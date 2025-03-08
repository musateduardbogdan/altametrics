import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

function InputPassword({
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
  const [type, setType] = useState('password');

  function handleVisibilityButtonClick() {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }

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

      <div className="relative">
        <Input
          className={`${error ? 'border-red-600' : ''} text-sm h-10`}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />

        {value && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
            type="button"
            onClick={handleVisibilityButtonClick}
          >
            {type === 'password' ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        )}
      </div>

      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}

export { InputPassword };
