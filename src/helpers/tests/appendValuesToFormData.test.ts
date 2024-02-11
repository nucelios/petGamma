import { IPsychologistRegisterData } from '../../interfaces/IPsychologist';
import {
	appendArrayToFormData,
	appendDateToFormData,
	appendValuesToFormData,
} from '../appendValuesToFormData';

describe('appendArrayToFormData', () => {
	test('should append values to FormData', () => {
		const formData = new FormData();
		const key = 'testKey';
		const values = [1, 2, 3];

		appendArrayToFormData(formData, key, values);

		expect(formData.getAll(key)).toEqual(['1', '2', '3']);
	});

	test('should handle undefined or null values', () => {
		const formData = new FormData();
		const key = 'testKey';
		const values = undefined;

		appendArrayToFormData(formData, key, values);

		expect(formData.getAll(key)).toEqual([]);
	});
});

describe('appendDateToFormData', () => {
	test('should append date to FormData', () => {
		const formData = new FormData();
		const key = 'testKey';
		const date = new Date();

		appendDateToFormData(formData, key, date);

		expect(formData.get(key)).toBe(date.toISOString());
	});
});

describe('appendValuesToFormData', () => {
	test('should append values to FormData', () => {
		const formData = new FormData();
		const values = {
			key1: 'value1',
			key2: [1, 2, 3],
		} as unknown as IPsychologistRegisterData;

		appendValuesToFormData(formData, values);

		expect(formData.getAll('key1')).toEqual(['value1']);
		expect(formData.getAll('key2')).toEqual(['1']);
	});
});
