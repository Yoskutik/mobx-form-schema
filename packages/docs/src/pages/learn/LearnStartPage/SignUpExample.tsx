import { useMemo, FormEvent } from 'react';
import { Button, CheckboxField, TextField } from '@components';
import { SignUpSchema } from './SignUpSchema';

export const SignUpExample = () => {
  const schema = useMemo(() => SignUpSchema.create(), []);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (schema.isValid) {
      alert(`Form is valid! Form data: ${JSON.stringify(schema.presentation, undefined, 2)}`);
      return;
    }

    alert(`The form is not valid. Errors: ${JSON.stringify(schema.errors, undefined, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField schema={schema} field="username" label="Username" required maxLength={32} />
      <TextField schema={schema} field="email" label="E-mail" type="email" required maxLength={64} />
      <TextField schema={schema} field="password" label="Password" type="password" required maxLength={64} />
      <TextField
        label="Confirm your password"
        field="confirmPassword"
        schema={schema}
        type="password"
        maxLength={64}
        required
      />
      <CheckboxField schema={schema} field="shouldStayLoggedIn" label="Want to stay logged in" />
      <Button type="submit" variant="primary">Submit</Button>
    </form>
  );
};
