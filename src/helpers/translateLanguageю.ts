export function translateLanguage(language: string) {
	switch (language) {
		case 'russian':
			return 'Русский';
		case 'english':
			return 'Английский';
		case 'kazakh':
			return 'Казахский';
		default:
			return language;
	}
}
