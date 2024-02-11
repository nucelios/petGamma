import dayjs from 'dayjs';
import { MonthObject } from '../interfaces/IMonthObject.ts';

export const generateMonthDays = (): MonthObject[] => {
	const currentDate = dayjs();
	const monthsAndDays: MonthObject[] = [];

	for (let i = 0; i < 60; i++) {
		// Iterate through more days to cover both current and next month
		const currentDay = currentDate.add(i, 'day');
		const monthName: string = currentDay.format('MMMM');
		const dayOfMonth: string = currentDay.format('D');
		const yearMonth: string = currentDay.format('YYYY-MM');
		const isCurrentMonth: boolean = currentDay.isSame(currentDate, 'month');
		const isNextMonth: boolean = currentDay.isSame(
			currentDate.add(1, 'month'),
			'month'
		);

		if (isCurrentMonth || isNextMonth) {
			const targetMonth: string = isCurrentMonth ? 'current' : 'next';

			const monthObject: MonthObject | undefined = monthsAndDays.find(
				(obj) => obj.month === monthName && obj.targetMonth === targetMonth
			);

			if (monthObject) {
				monthObject.days.push(dayOfMonth);
			} else {
				monthsAndDays.push({
					month: monthName,
					days: [dayOfMonth],
					yearMonth: yearMonth,
					targetMonth: targetMonth,
				});
			}
		}
	}

	return monthsAndDays;
};
