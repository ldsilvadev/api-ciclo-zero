import { addDays, addMonths, getDay } from "date-fns";

function getNextBusinessDay(date: Date): Date {
  let nextDate = date;
  while (getDay(nextDate) === 0 || getDay(nextDate) === 6) {
    nextDate = addDays(nextDate, 1);
  }
  return nextDate;
}

export default function addBillingMonth(
  date: Date,
  billing_cycle: string,
): Date {
  if (billing_cycle === "YEARLY") {
    const oneYearLater = addMonths(date, 12);
    return getNextBusinessDay(oneYearLater);
  } else {
    const oneMonthLater = addMonths(date, 1);
    return getNextBusinessDay(oneMonthLater);
  }
}
