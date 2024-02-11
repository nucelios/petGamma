import styles from '../AddingTimeForm.module.scss';
import { FC } from 'react';
import dayjs from 'dayjs';
interface AddingTimeHeaderProps {
	date: string;
}

const AddingTimeHeader: FC<AddingTimeHeaderProps> = ({ date }) => {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<h2>{dayjs(date).format('dd, D MMMM')}</h2>
				<h1>Время для записи</h1>
				<div className={styles.readme}>
					<p>Сессия по времени занимает один час.</p>
				</div>
			</div>
		</div>
	);
};

export default AddingTimeHeader;
