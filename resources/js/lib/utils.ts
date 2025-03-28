import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"



export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

;



export const formatMinutes = (minutes: number): string => {
    dayjs.extend(duration);
  if (minutes < 60) return `${minutes} minutes`; // Less than 1 hour 
  return dayjs.duration(minutes, "minutes").format("H [h] m [m]");
};

export const getBadgeColor = (status: 'In use'| 'Available'| 'Maintenance') => {
    const badgeColors = { 'In use': 'bg-red-400', Available: 'bg-green-400', Maintenance: 'bg-gray-400' };
    return badgeColors[status];
};

