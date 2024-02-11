import convertDate from '../convertDate';

describe('convertDate', () => {
	test('should convert date string to formatted date', () => {
		const dateString = '2022-01-24T12:34:56.789Z';
		const formattedDate = convertDate(dateString);
		expect(formattedDate).toBe('24 января 2022 года');
	});
});
