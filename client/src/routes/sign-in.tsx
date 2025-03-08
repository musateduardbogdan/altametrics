import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { signIn } from 'src/controllers/auth.controller';
import { displayGeneralErrorToast } from 'src/scripts/toast.script';
import { InputPassword } from 'src/components/form/input-password';
import { InputText } from 'src/components/form/input-text';
import { Button } from 'src/components/ui/button';

function SignIn() {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
  });

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(key: string, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: '' }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = schema.safeParse(values);

    if (!result.success) {
      const errors = { email: '', password: '' };

      result.error.errors.forEach((error) => {
        errors[error.path[0] as keyof typeof errors] = error.message;
      });

      setErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      console.log(values);

      await signIn(values.email, values.password);
    } catch (error) {
      displayGeneralErrorToast();
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <div className="h-screen mx-auto max-w-sm flex items-center justify-center px-2 py-8">
      <div className="grow space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
            Sign In
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            Fill in the form below to log in.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputText
              id="email"
              label="Email address"
              placeholder="Enter your email address"
              value={values.email}
              error={errors.email}
              onChange={(value) => handleInputChange('email', value)}
            />

            <InputPassword
              id="password"
              label="Password"
              placeholder="Enter your account password"
              value={values.password}
              error={errors.password}
              onChange={(value) => handleInputChange('password', value)}
            />
          </div>

          <Button
            className="w-full h-10 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export { SignIn };
