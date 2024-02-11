import { ServerFormValidationResponse } from '../interfaces/ServerFormValidationResponse';

const formServerErrorHandler = (
	serverErrors: ServerFormValidationResponse | null,
	name: string
): string | undefined => {
	if (!serverErrors) return;

	const formErrors = serverErrors.errors;
	const textError = formErrors.find((error) => error.type === name);
	if (!textError) return;

	return textError.messages.join(',');
};

export default formServerErrorHandler;
