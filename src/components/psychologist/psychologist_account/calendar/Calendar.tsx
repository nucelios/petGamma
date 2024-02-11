import styles from './Calendar.module.scss';
import dayjs, { Dayjs } from 'dayjs';

import 'dayjs/locale/ru';
import DateCard from '../../../calendar/dateCard/DateCard.tsx';
import { FC, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown, MenuProps, Space } from 'antd';

const generateMonthDays = (date: string): Dayjs[] => {
	const days: Dayjs[] = [];
	for (let i = 0; i < dayjs(date).daysInMonth(); i++) {
		days.push(dayjs(date).date(i + 1));
	}

	return days;
};

const Calendars: FC = () => {
	const [mouth, setMouth] = useState(dayjs().format('YYYY-MM'));

	const currentDate = dayjs();
	const nextDate = dayjs(currentDate).add(1, 'month');
	const format = [currentDate, nextDate];

	const items: MenuProps['items'] = format.map((value) => ({
		key: value.format('YYYY-MM'),
		label: value.format('MMMM'),
		value: value.format('YYYY-MM'),
	}));

	const handleMonthChange = (newDate: string) => {
		setMouth(newDate);
	};
	return (
		<>
			<div className={styles.header}>
				<Dropdown
					className={styles.select}
					menu={{
						items,
						onClick: (value) => handleMonthChange(value.key),
					}}
				>
					<Space>
						{dayjs(mouth).format('MMMM')}
						<IoIosArrowDown />
					</Space>
				</Dropdown>
			</div>
			<div className={styles.wrapper}>
				{generateMonthDays(mouth).map((data) => (
					<DateCard
						date={data.format('YYYY-MM-DD')}
						key={data.format('YYYY-MM-DD')}
					/>
				))}
			</div>
		</>
	);
};

export default Calendars;
