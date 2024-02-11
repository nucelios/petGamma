import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import styles from '../SelectionBookingTime.module.scss';

type Props = {
	type: 'time' | 'upcoming';
	time: ITimeSlot;
	handleTimeClick: (time: ITimeSlot) => void;
	selectedTime: string | null;
	selectedDate: string | null;
};

const TimeSlotItem = ({
	time,
	type,
	handleTimeClick,
	selectedTime,
	selectedDate,
}: Props) => (
	<div
		className={classNames.call(
			styles,
			styles.time,
			type === 'upcoming' && styles.upcomingTime,
			{
				[styles.selectedTime]:
					selectedTime === time.time && selectedDate === time.date,
			}
		)}
		onClick={() => handleTimeClick(time)}
	>
		{type === 'time'
			? time.time
			: dayjs(time.date + ' ' + time.time).format('MM.DD - HH:mm')}
	</div>
);

export default TimeSlotItem;
