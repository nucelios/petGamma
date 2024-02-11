import updateStorageViewedPsychologists from '../updateStorageViewedPsychologists';

const localStorageMock = (() => {
	let store: { [key: string]: string } = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		clear: () => {
			store = {};
		},
	};
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('updateStorageViewedPsychologists', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should update localStorage with the viewed psychologists', () => {
		const psychologistId = 1;

		updateStorageViewedPsychologists(psychologistId);

		const storedData = JSON.parse(
			localStorage.getItem('viewedPsychologists') || '[]'
		);
		expect(storedData).toEqual([psychologistId]);
	});

	it('should limit the number of viewed psychologists to maxViewed', () => {
		const maxViewed = 5;
		const psychologistIds = [1, 2, 3, 4, 5, 6];

		psychologistIds.forEach((id) => updateStorageViewedPsychologists(id));

		const storedData = JSON.parse(
			localStorage.getItem('viewedPsychologists') || '[]'
		);
		expect(storedData.length).toBe(maxViewed);
	});

	it('should not store duplicate psychologistIds', () => {
		const psychologistId = 1;

		updateStorageViewedPsychologists(psychologistId);
		updateStorageViewedPsychologists(psychologistId);

		const storedData = JSON.parse(
			localStorage.getItem('viewedPsychologists') || '[]'
		);
		expect(storedData).toEqual([psychologistId]);
	});
});
