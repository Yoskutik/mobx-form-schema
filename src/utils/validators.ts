import { TValidator } from '@yoskutik/mobx-react-mvvm';

export const required = (): TValidator => value => !value && 'The value must be defined';

export const email = (): TValidator => (value: string) => value && !/^\S+@\S+\.\S+$/.test(value)
    && 'The value is not a valid email';

export const maxLength = (n: number): TValidator => (value: string) => value && value.length > n
    && `The maximum value length is ${n} characters`;

export const minLength = (n: number): TValidator => (value: string) => value && value.length < n
    && `The minimum value length is ${n} characters`;

export const password = (): TValidator => (value: string) => {
  if (!value) return false;
  if (!/[a-z]/.test(value)) return 'The password must contain at least 1 lowercase character';
  if (!/[A-Z]/.test(value)) return 'The password must contain at least 1 uppercase character';
  if (!/\d/.test(value)) return 'The password must contain at least 1 digit';
  return false;
};
