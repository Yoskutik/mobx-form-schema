// Shared file

export const required = () => (value?: string) => {
  if (value?.trim()) return false;
  return 'This field is required';
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format';
};

export const lengthBetween = (min: number, max: number) => (value: string) => {
  if (value.length >= min && value.length <= max) return false;
  if (value.length < min) return `Should be longer than ${min} characters`;
  return `Should be shorter than ${max} characters`;
};

export const minLength = (min: number) => (value: string) => {
  if (value.length < min) return `Should be longer than ${min} characters`;
  return false;
};