export const required = () => (value?: string) => {
  if (value?.trim()) return false;
  return 'This field is required.';
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format.';
};

export const username = () => (value: string) => {
  if (/^[a-zA-Z0-9_]+$/.test(value)) return false;
  return 'You can use only latin letters, digits and underscore sign.';
};

export const minLength = (min: number) => (value: string) => {
  if (value.length < min) return `Should be at least ${min} characters.`;
  return false;
};
