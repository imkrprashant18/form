/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export type FormElement = {
  id: string;
  type: 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  validation?: z.ZodType<any>;
};

export type FormLayout = 'single' | 'double' | 'triple';

export type FormState = {
  elements: FormElement[];
  layout: FormLayout;
};

