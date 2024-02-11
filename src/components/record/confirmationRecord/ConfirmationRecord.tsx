import styles from './ConfirmationRecord.module.scss';
import back from '../../../../public/arrow-left.svg';
import dayjs from 'dayjs';
import { Button, Spin } from 'antd';
import { useAppSelector } from '../../../store/hooks.ts';
import { userSelect } from '../../../features/user/userSlice.ts';

type Props = {
	setActiveTab: (key: string) => void;
	onSummit: () => void;
	format: string;
	recordTime: string;
	cost: number;
	loading: boolean;
};

const ConfirmationRecord = ({
	setActiveTab,
	onSummit,
	format,
	recordTime,
	cost,
	loading,
}: Props) => {
	const user = useAppSelector(userSelect);

	return (
		<>
			<div className={styles.cardHeader}>
				<img
					className={styles.backButton}
					onClick={() => setActiveTab('2')}
					src={back}
					alt="back"
				/>
				<h1 className={styles.header}>Запись</h1>
			</div>

			<div className={styles.bookingInfo}>
				<div className={styles.bookingFullName}>
					<p>ФИО</p>
					<h2>{user?.patient?.name}</h2>
				</div>
				<div className={styles.main}>
					<div className={styles.bookingFormat}>
						<p>Формат</p>
						<h3 className={styles.bookingSelect}>{format}</h3>
					</div>
					<div className={styles.bookingFormat}>
						<p>Сумма</p>
						<h3 className={styles.bookingSelect}>{cost.toLocaleString()} ₸</h3>
					</div>
				</div>

				<div className={styles.bookingFormat}>
					<p>Время записи</p>
					<h4 className={styles.bookingSelect}>
						{dayjs(recordTime).format('D MMMM HH:mm ')}
					</h4>
				</div>
			</div>

			<Button disabled={loading} className={styles.btn} onClick={onSummit}>
				{loading ? <Spin /> : 'Записаться'}
			</Button>
		</>
	);
};

export default ConfirmationRecord;
