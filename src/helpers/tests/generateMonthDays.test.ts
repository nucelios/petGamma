import { Dayjs } from 'dayjs';
import { generateMonthDays } from '../generateMonthDays';

jest.mock('dayjs', () => {
	const actualDayjs = jest.requireActual('dayjs');
	return {
		...actualDayjs,
		__esModule: true,
		default: jest.fn(() => actualDayjs('2022-01-24')) as () => Dayjs,
	};
});

describe('generateMonthDays', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('generates month days correctly', () => {
		const result = generateMonthDays();
		expect(result.length).toBeGreaterThan(0);
		expect(result.every((month) => month.days.length > 0)).toBe(true);
	});

	test('includes both current and next month days', () => {
		const result = generateMonthDays();
		const currentMonthExists = result.some(
			(month) => month.targetMonth === 'current'
		);
		const nextMonthExists = result.some(
			(month) => month.targetMonth === 'next'
		);
		expect(currentMonthExists && nextMonthExists).toBe(true);
	});

	test('handles different months correctly', () => {
		const result = generateMonthDays();
		const uniqueMonths = new Set(result.map((month) => month.month));
		expect(uniqueMonths.size).toBeGreaterThanOrEqual(2);
	});
});
