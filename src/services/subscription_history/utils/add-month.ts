import { addMonths } from "date-fns";

export default function addMonth(date: Date): Date {
  const newDate = addMonths(date, 1);
  return newDate;
}
