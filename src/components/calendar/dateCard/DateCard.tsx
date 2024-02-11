import dayjs from 'dayjs';
import classNames from 'classnames/bind';
import openSvg from '../../../../public/unlock.svg';
import closeSvg from '../../../../public/close.svg';
import styles from './DateCard.module.scss';
import { useState } from 'react';
import AddingTimeForm from '../addingTimeForm/AddingTimeForm.tsx';

type Props = {
	date: string;
};
const DateCard = ({ date }: Props) => {
	const [active, setActive] = useState(false);
	const isDate = dayjs.utc(date).startOf('day').local();
	const isPastDate = isDate.isBefore(dayjs(), 'day');
	const handleClick = () => {
		if (!isPastDate) {
			setActive(true);
		}
	};

	return (
		<>
			<AddingTimeForm date={date} active={active} setActive={setActive} />
			<div
				onClick={handleClick}
				className={classNames.call(styles, styles.card, {
					[styles.pastDate]: isPastDate,
				})}
			>
				<div className={styles.card_header}>
					<div className={styles.card_header_day}>{isDate.format('dd')}</div>
					<img
						className={styles.card_svg}
						src={isPastDate ? closeSvg : openSvg}
						alt="close"
					/>
				</div>
				<div className={styles.card_main}>{dayjs(isDate).date()}</div>

				<div onClick={handleClick} className={styles.card_footer}>
					{isPastDate ? 'Недоступно' : 'Выбрать время'}
				</div>
			</div>
		</>
	);
};

export default DateCard;
