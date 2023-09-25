import { useMemo, FormEvent } from 'react';
import { Button, CheckboxField, TextField } from '@components';
import { Form } from '../Form/Form';
import { LoginSchema } from './LoginSchema';

export const LoginExample = () => {
  const schema = useMemo(() => LoginSchema.create(), []);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (schema.isValid && schema.isChanged) {
      alert(
        'Login succeeded!\n'
        + 'Your credentials temporally saved.\n'
        + 'You can now try to change the form to see, how does form changes observation works.',
      );
      schema.sync();
      return;
    }

    if (!schema.isChanged) {
      alert('The form is not changed');
      return;
    }

    alert(
      'The form is not valid!\n'
      + `Errors: ${JSON.stringify(schema.errors, undefined, 2)}`,
    );
  };

  return (
    <Form onSubmit={handleSubmit} schema={schema}>
      <TextField schema={schema} field="email" label="E-mail" />
      <TextField schema={schema} field="password" type="password" label="Password" />
      <CheckboxField schema={schema} field="shouldRememberMe" label="Remember me" />
      <Button type="submit" variant="primary">Login</Button>
    </Form>
  );
};
