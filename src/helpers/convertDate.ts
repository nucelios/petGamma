const convertDate = (dateString: string) => {
	const dateObject = new Date(dateString);

	const monthNames = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];

	const day = dateObject.getDate();
	const monthIndex = dateObject.getMonth();
	const year = dateObject.getFullYear();

	return `${day} ${monthNames[monthIndex]} ${year} года`;
};

export default convertDate;
