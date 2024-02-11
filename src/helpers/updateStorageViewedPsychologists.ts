const updateStorageViewedPsychologists = (psychologistId: number) => {
	const maxViewed = 5;
	const viewedPsychologists: number[] = JSON.parse(
		localStorage.getItem('viewedPsychologists') || '[]'
	);
	const filteredViewed = viewedPsychologists.filter(
		(id) => id !== psychologistId
	);

	filteredViewed.unshift(psychologistId);
	if (filteredViewed.length > maxViewed) {
		filteredViewed.length = maxViewed;
	}

	localStorage.setItem('viewedPsychologists', JSON.stringify(filteredViewed));
};

export default updateStorageViewedPsychologists;
