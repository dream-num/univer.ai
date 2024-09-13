import type { ClassValue } from 'clsx'
import _clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx(...inputs: ClassValue[]) {
  return twMerge(_clsx(inputs))
}
