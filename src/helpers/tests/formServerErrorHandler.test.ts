import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse';
import formServerErrorHandler from '../formServerErrorHandler';

describe('formServerErrorHandler', () => {
	test('should handle server errors and return error messages for a specific field', () => {
		const serverErrors: ServerFormValidationResponse = {
			message: 'Validation failed',
			errors: [
				{ type: 'name', messages: ['Name is required'] },
				{ type: 'email', messages: ['Invalid email format'] },
			],
		};
		const fieldName = 'name';
		const result = formServerErrorHandler(serverErrors, fieldName);
		expect(result).toBe('Name is required');
	});

	test('should return undefined if there are no server errors or no error messages for the specified field', () => {
		const serverErrors: ServerFormValidationResponse = {
			message: 'Validation failed',
			errors: [{ type: 'email', messages: ['Invalid email format'] }],
		};
		const fieldName = 'name';
		const result = formServerErrorHandler(serverErrors, fieldName);
		expect(result).toBeUndefined();
	});

	test('should return undefined if serverErrors is null', () => {
		const serverErrors: ServerFormValidationResponse | null = null;
		const fieldName = 'name';
		const result = formServerErrorHandler(serverErrors, fieldName);
		expect(result).toBeUndefined();
	});
});
