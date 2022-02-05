let i = 0;

export const generateId = (prefix = 'id') => `${prefix}-${i++}`;
