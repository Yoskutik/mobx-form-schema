import { useMemo } from 'react';
import { Button, TextField } from '@components';
import { SingUpSchema } from './SingUpSchema';

export const SingUpExample = () => {
  const schema = useMemo(() => (
    SingUpSchema.create({
      email: 'your@email.com',
      password: '00000000',
      repeatedPassword: '00000000',
    })
  ), []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(
      `Is form valid: ${!schema.validateAll()}\n` +
      `Is form changed: ${schema.checkAnyChanges()}\n` +
      `Form presentation: ${JSON.stringify(schema.presentation, undefined, 2)}\n` +
      (schema.isValid ? '' : `Errors: ${JSON.stringify(schema.errors, undefined, 2)}`)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField schema={schema} field="email" label="E-mail" />
      <TextField schema={schema} field="password" type="password" label="Password" />
      <TextField schema={schema} field="repeatedPassword" type="password" label="Confirm password" />
      <Button type="submit" buttonStyle="primary">
        Submit
      </Button>
    </form>
  );
};