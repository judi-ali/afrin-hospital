export function getArabicDayName(dayNumber: number): string {
  const days = [
    "السبت", // 6 - Saturday
    "الأحد", // 0 - Sunday
    "الإثنين", // 1 - Monday
    "الثلاثاء", // 2 - Tuesday
    "الأربعاء", // 3 - Wednesday
    "الخميس", // 4 - Thursday
  ];

  // Validate the input
  if (dayNumber < 0 || dayNumber > 6) {
    throw new Error(
      `Invalid day number: ${dayNumber}. Must be between 0 and 6.`
    );
  }

  return days[dayNumber];
}
