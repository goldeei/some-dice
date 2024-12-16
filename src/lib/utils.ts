import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randomBetweenOneAndZero = (min: number, max: number) =>
	Math.random() * (max - min) + min;
