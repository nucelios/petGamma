import { translateLanguage } from '../translateLanguageю';

describe('translateLanguage', () => {
	test('translates "russian" to "Русский"', () => {
		const result = translateLanguage('russian');
		expect(result).toBe('Русский');
	});

	test('translates "english" to "Английский"', () => {
		const result = translateLanguage('english');
		expect(result).toBe('Английский');
	});

	test('translates "kazakh" to "Казахский"', () => {
		const result = translateLanguage('kazakh');
		expect(result).toBe('Казахский');
	});

	test('returns the original language if not "russian", "english", or "kazakh"', () => {
		const result = translateLanguage('unknownLanguage');
		expect(result).toBe('unknownLanguage');
	});
});
