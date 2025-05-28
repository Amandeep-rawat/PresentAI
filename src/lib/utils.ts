import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo=(timestamp:string)=>{
const now=new Date();

const diffInSeconds=Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);
const intervals = [
  {
    label: "year",
    value: 60 * 60 * 24 * 365, // 1 year in seconds
  },
  {
    label: "month",
    value: 60 * 60 * 24 * 30, // approx 1 month in seconds
  },
  {
    label: "week",
    value: 60 * 60 * 24 * 7, // 1 week in seconds
  },
  {
    label: "day",
    value: 60 * 60 * 24, // 1 day in seconds
  },
  {
    label: "hour",
    value: 60 * 60, // 1 hour in seconds
  },
  {
    label: "minute",
    value: 60, // 1 minute in seconds
  },
  {
    label: "second",
    value: 1, // 1 second
  },
];
for(let i=0;i<intervals.length;i++){
  const interval=intervals[i];
  const count=Math.floor(diffInSeconds/interval.value);
  if(count>=1){
     return `${count} ${interval.label} ago`
  }
}
return 'Just now'

}