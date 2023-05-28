// Shared file

export const required = () => (value?: string) => {
  if (value?.trim()) return false;
  return 'This field is required';
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format';
};

export const minLength = (n: number) => (value: string) => {
  if (value.length >= n) return false;
  return `The value should be at least ${n} symbols`;
};