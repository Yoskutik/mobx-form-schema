import { useMemo, FormEvent } from 'react';
import { Button, TextField } from '@components';
import { Form } from '../Form/Form';
import { SignUpSchema } from './SignUpSchema';

export const SignUpExample = () => {
  const schema = useMemo(() => SignUpSchema.create(), []);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (schema.isValid) {
      alert('Form is valid, sign up succeeded!');
      return;
    }

    alert(
      'The form is not valid!\n'
      + `Errors: ${JSON.stringify(schema.errors, undefined, 2)}`,
    );
  };

  return (
    <Form onSubmit={handleSubmit} schema={schema} hideObservationInfo>
      <TextField schema={schema} field="username" label="Username" required maxLength={32} />
      <TextField schema={schema} field="email" label="E-mail" type="email" maxLength={64} />
      <TextField schema={schema} field="password" label="Password" type="password" required maxLength={64} />
      <TextField
        label="Confirm your password"
        field="confirmPassword"
        schema={schema}
        type="password"
        maxLength={64}
        required
      />
      <Button type="submit" variant="primary">Submit</Button>
    </Form>
  );
};
