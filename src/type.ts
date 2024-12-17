/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export type FormElementType = {
  id: string;
  type: string;
  label: string;
  validation: z.ZodType<any> | null;
};

export type FormLayout = 'single' | 'double' | 'triple';

