import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import styles from '../AddingTimeForm.module.scss';
import classNames from 'classnames/bind';
import infoTime from '../../../../../public/info-circle.svg';

interface Props {
	unavailableTimeSlots: ITimeSlot[];
}

const UnavailableTimeSlots = ({ unavailableTimeSlots }: Props) => {
	return (
		<div className={styles.appointeds}>
			<p>Назначенные встречи</p>
			<div className={styles.block_employed}>
				{unavailableTimeSlots.length === 0 ? (
					<p className={styles.dont}>Назначенных встреч нет.</p>
				) : (
					unavailableTimeSlots.map((timeSlot: ITimeSlot) => {
						return (
							<div
								key={timeSlot.id}
								className={classNames.call(styles, styles.tag_employed)}
							>
								<img className={styles.tag_info} src={infoTime} alt="info" />

								{timeSlot.time}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default UnavailableTimeSlots;
