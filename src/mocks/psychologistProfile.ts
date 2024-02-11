export const psychologist = {
	fullName: 'Эрен Йегер',
	gender: 'male',
	format: ['online', 'offline'],
	cost: '1000 - 7 ????? ',
	video: 'https://www.youtube.com/watch?v=J9Xh9bm6LVc&t=6s',
	photo: 'https://w.forfun.com/fetch/e7/e75be6871e7279037302da4f67ae7542.jpeg',
	city: 'Сигансина',
	language: ['english', 'русский'],
	methods: [
		'Психоанализ',
		'Гештальт терапия',
		'Коучинг',
		'Супервизия',
		'Системная семейная терапия',
	],
	description:
		'Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame. Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame . Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame',
	experience:
		'Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame. Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame . Lorem ipsum dolor sit amet, consectetur adip eum. Lorem ipsum dolor sit amet, consect et dolor. Lorem ipsum dolor sit amet sit ame',
};

interface Event {
	[time: string]: { type: string; content: string };
}

interface Events {
	[date: string]: Event[];
}

export const events: Events = {
	'2023-11-01': [
		{
			'11:00': { type: 'busy', content: 'Консультация' },
			'12:00': { type: 'busy', content: 'Встреча' },
			'13:00': { type: 'busy', content: 'Запись' },
			'14:00': { type: 'busy', content: 'Встреча' },
			'15:00': { type: 'busy', content: 'Совещание' },
		},
	],
	'2023-11-06': [
		{
			'11:00': { type: 'busy', content: 'Консультация' },
			'12:00': { type: 'busy', content: 'Встреча' },
			'13:00': { type: 'busy', content: 'Запись' },
			'14:00': { type: 'busy', content: 'Встреча' },
			'15:00': { type: 'busy', content: 'Совещание' },
		},
	],
	'2023-11-10': [
		{
			'11:00': { type: 'busy', content: 'Консультация' },
			'12:00': { type: 'busy', content: 'Встреча' },
			'13:00': { type: 'busy', content: 'Запись' },
			'14:00': { type: 'busy', content: 'Встреча' },
			'15:00': { type: 'busy', content: 'Совещание' },
		},
	],
	'2023-12-01': [
		{
			'11:00': { type: 'busy', content: 'Консультация' },
			'12:00': { type: 'busy', content: 'Встреча' },
			'13:00': { type: 'busy', content: 'Запись' },
			'14:00': { type: 'busy', content: 'Встреча' },
			'15:00': { type: 'busy', content: 'Совещание' },
		},
	],
	'2023-12-05': [{ '11:00': { type: 'busy', content: 'Запись' } }],
	'2023-12-10': [
		{
			'11:00': { type: 'busy', content: 'Консультация' },
			'12:00': { type: 'busy', content: 'Совещание' },
			'13:00': { type: 'busy', content: 'Консультация' },
		},
	],
};

export const clients = [
	{
		id: 1,
		name: 'Санса Старк',
		lastSessionDate: '',
		nextSessionDate: '2023-11-15',
		totalSessions: 5,
	},
	{
		id: 2,
		name: 'Джон Сноу',
		lastSessionDate: '2023-10-25',
		nextSessionDate: '2023-11-10',
		totalSessions: 8,
	},
	{
		id: 3,
		name: 'Эдгар Старк',
		lastSessionDate: '',
		nextSessionDate: '2023-11-10',
		totalSessions: 8,
	},
	{
		id: 4,
		name: 'Сэрсея Ланистер',
		lastSessionDate: '2023-10-25',
		nextSessionDate: '2023-11-10',
		totalSessions: 8,
	},
	{
		id: 5,
		name: 'Жанибек Болатжанович',
		lastSessionDate: '2023-10-25',
		nextSessionDate: '2023-11-10',
		totalSessions: 8,
	},
];
