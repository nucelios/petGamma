interface ServerValidationError {
	type: string;
	messages: string[];
}

export interface ServerFormValidationResponse {
	message: string;
	errors: ServerValidationError[];
}
