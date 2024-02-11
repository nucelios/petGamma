import validateNumber from '../validateNumber';

describe('validate number', () => {
	const numbers = [10, '5'];
	const things = ['string', [], {}, undefined, null, true, () => {}];

	numbers.forEach((number) => {
		it('check type number', () => {
			const parsedInt: number =
				typeof number === 'string' ? parseInt(number) : number;
			const result = validateNumber(number);
			expect(typeof result).toBe('number');

			expect(result).toBe(parsedInt);
		});
	});

	things.forEach((thing) => {
		it('check type null', () => {
			const result = validateNumber(thing);
			expect(result).toBeNull();
		});
	});
});
