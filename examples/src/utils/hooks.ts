import { FormSchema } from '@yoskutik/mobx-form-schema';
import { useState } from 'react';

type Constructable<T> = (new (...args: any[]) => T) & { create: (...args: any[]) => any };

export const useFormSchema = <T extends FormSchema>(v: Constructable<T>, data?: Record<string, any>): T => (
  useState(() => v.create(data))[0]
);
