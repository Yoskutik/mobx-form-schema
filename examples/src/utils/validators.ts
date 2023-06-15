export const required = () => (value: string) => {
  if (value?.trim()) return false;
  return 'This field is required';
};

export const minLength = (min: number) => (value: string) => {
  if (value.length >= min) return false;
  return `The value is too short. The minimum length is ${min} characters`;
};

export const defined = () => (value: any) => {
  if (value) return false;
  return 'This field is required';
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format';
};