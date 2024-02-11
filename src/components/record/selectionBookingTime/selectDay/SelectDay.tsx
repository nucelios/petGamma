import styles from '../SelectionBookingTime.module.scss';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAppointmentsSelectDayQuery } from '../../../../features/queryHooks/queryHooks.ts';
import { MonthObject } from '../../../../interfaces/IMonthObject.ts';
import dayjs from 'dayjs';
import { generateMonthDays } from '../../../../helpers/generateMonthDays.ts';
import { useState } from 'react';
import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import TimeSlot from '../timeSlot/TimeSlot.tsx';

type Props = {
	psychologistId: number;
	handleTimeClick: (time: ITimeSlot) => void;
	setSelectedTime: (value: null) => void;
	selectedTime: string | null;
	selectedDate: string | null;
};

const SelectDay = ({
	psychologistId,
	handleTimeClick,
	selectedDate,
	selectedTime,
	setSelectedTime,
}: Props) => {
	const monthsAndDays: MonthObject[] = generateMonthDays();
	const [selectedDay, setSelectedDay] = useState<null | string>(null);
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const formattedDay = selectedDay
		? dayjs(`${selectedMonth}-${selectedDay}`).format('YYYY-MM-DD')
		: '';
	const shouldFetchAppointments = !!selectedMonth && !!selectedDay;

	const { data: selectedDays } = useAppointmentsSelectDayQuery(
		psychologistId,
		formattedDay,
		shouldFetchAppointments
	);

	const handleFormatChangeDay = (value: string) => {
		setSelectedTime(null);
		setSelectedDay(value);
	};

	const handleFormatChangeMonth = (value: string) => {
		setSelectedTime(null);
		setSelectedMonth(value);
	};
	const selectedMonthObject = monthsAndDays.find(
		(obj) => obj.month === dayjs(selectedMonth).format('MMMM')
	);

	const selectOptions = monthsAndDays.map((monthObject: MonthObject) => ({
		value: monthObject.yearMonth,
		label: monthObject.month,
	}));

	const dayOptions = selectedMonthObject
		? selectedMonthObject.days.map((day) => ({ value: day, label: day }))
		: [];

	const renderSelectOptions = (
		type: string,
		options: { value: string; label: string }[],
		handleChange: (value: string) => void
	) => (
		<Select
			defaultValue={type}
			className={styles.bookingSelect}
			suffixIcon={<DownOutlined style={{ color: '#2e2e2e' }} />}
			dropdownStyle={{
				background: '#f5f5f5',
				margin: '10px',
				textTransform: 'capitalize',
			}}
			bordered={false}
			options={options}
			onChange={(value) => handleChange(value)}
		/>
	);

	return (
		<>
			<div className={styles.selectDay}>
				<div>
					<p>Месяц</p>
					{renderSelectOptions('Месяц', selectOptions, handleFormatChangeMonth)}
				</div>
				<div>
					<p>Число</p>
					{renderSelectOptions('День', dayOptions, handleFormatChangeDay)}
				</div>
			</div>
			{selectedDays && (
				<div className={styles.bookingTimeSlot}>
					<span style={{ color: '#9F9F9F' }}>Доступное время</span>
					<TimeSlot
						type="time"
						date={selectedDays}
						handleTimeClick={handleTimeClick}
						selectedTime={selectedTime}
						selectedDate={selectedDate}
					/>
				</div>
			)}
		</>
	);
};

export default SelectDay;
