import _clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function clsx(...inputs: ClassValue[]) {
  return twMerge(_clsx(inputs))
}
