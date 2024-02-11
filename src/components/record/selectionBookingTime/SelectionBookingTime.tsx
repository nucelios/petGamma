import styles from './SelectionBookingTime.module.scss';
import dayjs from 'dayjs';
import { Button } from 'antd';
import back from '../../../../public/arrow-left.svg';
import { ITimeSlot } from '../../../interfaces/ITimeSlot.ts';
import { useGetUpcomingRecordings } from '../../../features/queryHooks/queryHooks.ts';
import 'dayjs/locale/ru';
import { useState } from 'react';
import TimeSlot from './timeSlot/TimeSlot.tsx';
import SelectDay from './selectDay/SelectDay.tsx';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

type Props = {
	setActiveTab?: (key: string) => void;
	setRecordTime: (date: string) => void;
	setSlotId: (date: string) => void;
	psychologistId: number;
};
const SelectionBookingTime = ({
	setActiveTab,
	psychologistId,
	setRecordTime,
	setSlotId,
}: Props) => {
	const [selectedTime, setSelectedTime] = useState<null | string>(null);
	const [selectedDate, setSelectedDate] = useState<null | string>(null);
	const { data: currentDayRecords = [] } =
		useGetUpcomingRecordings(psychologistId);

	const handleTimeClick = (date: ITimeSlot) => {
		const selectedDate = dayjs(`${date.date}T${date.time}`).format(
			'YYYY-MM-DDTHH:mm:ss'
		);
		setSlotId(date.id);
		setRecordTime(selectedDate);
		setSelectedTime(date.time);
		setSelectedDate(date.date);
	};

	return (
		<>
			{setActiveTab && (
				<div className={styles.cardHeader}>
					<img
						className={styles.backButton}
						onClick={() => setActiveTab('1')}
						src={back}
						alt="back"
					/>
					<h1 className={styles.header}>Время записи</h1>
				</div>
			)}

			<div className={styles.bookingTimeSlot}>
				<span>Ближайшие свободные даты для записи.</span>
				<TimeSlot
					type="upcoming"
					date={currentDayRecords}
					handleTimeClick={handleTimeClick}
					selectedTime={selectedTime}
					selectedDate={selectedDate}
				/>
			</div>

			<div className={styles.line} />
			<SelectDay
				setSelectedTime={setSelectedTime}
				psychologistId={psychologistId}
				handleTimeClick={handleTimeClick}
				selectedTime={selectedTime}
				selectedDate={selectedDate}
			/>
			{setActiveTab && (
				<Button
					onClick={() => setActiveTab('3')}
					disabled={!selectedDate || !selectedTime}
					className={styles.btn}
				>
					Далее
				</Button>
			)}
		</>
	);
};

export default SelectionBookingTime;
