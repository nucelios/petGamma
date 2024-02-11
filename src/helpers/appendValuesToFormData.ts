import { IPsychologistRegisterData } from '../interfaces/IPsychologist.ts';

export const appendArrayToFormData = <T>(
	formData: FormData,
	key: string,
	values: T[] | undefined | null
) => {
	if (values && values.length > 0) {
		values.forEach((value) => formData.append(key, String(value)));
	}
};

export const appendDateToFormData = (
	formData: FormData,
	key: string,
	date: Date
) => {
	formData.append(key, date.toISOString());
};

export const appendValuesToFormData = (
	formData: FormData,
	values: IPsychologistRegisterData
) => {
	Object.entries(values).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			formData.append(key, value[0]);
		} else {
			formData.append(key, value);
		}
	});
};
