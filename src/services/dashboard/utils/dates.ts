export default function Dates() {
  const now = new Date();
  const dayBefore = new Date();
  dayBefore.setDate(now.getDate() - 1);
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const threeDaysLater = new Date();
  threeDaysLater.setDate(now.getDate() + 3);

  return {
    now,
    dayBefore,
    firstDay,
    lastDay,
    threeDaysLater,
  };
}
