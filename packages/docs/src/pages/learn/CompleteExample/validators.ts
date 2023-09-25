export const required = () => (value?: string) => {
  if (value?.trim()) return false;
  return 'This field is required.';
};

export const defined = () => (value?: unknown) => {
  if (value !== null && value !== undefined) return false;
  return 'This field is required.';
};

export const minValue = (min: number) => (value: number) => {
  if (value >= min) return false;
  return `The value must be at least ${min}`;
};

export const maxValue = (max: number) => (value: number) => {
  if (value <= max) return false;
  return `The value must be not more than ${max}`;
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format.';
};
