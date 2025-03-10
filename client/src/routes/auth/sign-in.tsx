import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { signIn } from 'src/controllers/auth.controller';
import { IApiError } from 'src/interfaces/error.interface';
import { setUser } from 'src/store/slices/auth.slice';
import { displayGeneralErrorToast } from 'src/scripts/toast.script';
import { InputPassword } from 'src/components/form/input-password';
import { InputText } from 'src/components/form/input-text';
import { Button } from 'src/components/ui/button';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().nonempty('Password is required')
  });

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(key: string, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: '' }));
  }

  function handleError(error: unknown) {
    if (typeof error !== 'object' || error === null) {
      displayGeneralErrorToast();
      return;
    }

    const apiError = error as IApiError;

    if (apiError.errors) {
      apiError.errors.forEach((error) => {
        const field = error.property;
        const messages = Object.values(error.constraints);

        if (field in errors) {
          errors[field as keyof typeof errors] = messages[0];
        }
      });
    }

    if (!Object.values(errors).some((error) => error)) {
      displayGeneralErrorToast();
    }
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
      const user = await signIn(values.email, values.password);
      dispatch(setUser(user));
      navigate('/');
    } catch (error) {
      handleError(error);
    }

    setIsLoading(false);
  }

  return (
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

        <div className="space-y-4">
          <Button
            className="w-full h-10 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Continue
          </Button>

          <span className="block text-center text-sm">
            Don't have an account?
            <Link
              className="mx-1 font-medium hover:underline underline-offset-2"
              to="/auth/sign-up"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export { SignIn };
