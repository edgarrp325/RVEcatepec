import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { twMerge } from 'tailwind-merge';
import relativeTime from 'dayjs/plugin/relativeTime';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatMinutes = (minutes: number): string => {
    dayjs.extend(duration);
    if (minutes < 60) return `${minutes} minutes`; // Less than 1 hour
    return dayjs.duration(minutes, 'minutes').format('H [h] m [m]');
};

export const getRelativeTime = (date: string) => {
    const diffInDays = dayjs().diff(dayjs(date), "day");

    if (diffInDays <= 3) {
        dayjs.extend(relativeTime);
        return dayjs().to(dayjs(date));
    } else {
        return dayjs(date).format("DD/MM/YY");
    }
};

export const getCompactNumber = (number: number) => {
    const formatter = new Intl.NumberFormat('en', {
        notation: 'compact',
    });

    return formatter.format(number);
};

export const getBadgeColor = (status: 'In use' | 'Available' | 'Maintenance') => {
    const badgeColors = { 'In use': 'bg-red-400', Available: 'bg-green-400', Maintenance: 'bg-gray-400' };
    return badgeColors[status];
};

export const downloadFile  = (url:string) =>{
    const link = document.createElement('a');
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};