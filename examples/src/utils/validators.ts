export const required = (text = 'This field is required') => (value: string) => {
  if (!value?.trim()) return text;
  return false;
};

export const minLength = (length: number, text = 'The value is too short') => (value: string) => {
  if (value.length < length) return text;
  return false;
};

export const maxLength = (length: number, text = 'The value is too long') => (value: string) => {
  if (value.length > length) return text;
  return false;
};

export const defined = (text = 'This field is required') => (value: any) => {
  if (!value) return text;
  return false;
};

export const email = (text = 'Invalid email format') => (value: string) => {
  if (!/\S+@\S+\.\S+/.test(value)) return text;
  return false;
};