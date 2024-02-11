import styles from '../SelectionBookingTime.module.scss';
import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import TimeSlotItem from './TimeSlotItem.tsx';

type Props = {
	type: 'time' | 'upcoming';
	date: ITimeSlot[];
	handleTimeClick: (time: ITimeSlot) => void;
	selectedTime: string | null;
	selectedDate: string | null;
};

const TimeSlot = ({
	type,
	date,
	handleTimeClick,
	selectedTime,
	selectedDate,
}: Props) => {
	return (
		<>
			{date.length > 0 ? (
				<div className={styles.timeSlotContainer}>
					{date.map((time) => (
						<TimeSlotItem
							type={type}
							key={time.id}
							time={time}
							handleTimeClick={handleTimeClick}
							selectedTime={selectedTime}
							selectedDate={selectedDate}
						/>
					))}
				</div>
			) : (
				<div className={styles.absent}>Нет доступных сеансов.</div>
			)}
		</>
	);
};

export default TimeSlot;
