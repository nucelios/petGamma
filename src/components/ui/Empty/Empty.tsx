import EmptySvg from '../../../assets/icon/eye-slash.svg';
import styles from './Empty.module.scss';
const Empty = () => {
	return (
		<div className={styles.empty}>
			<img className={styles.img} src={EmptySvg} alt="Empty" />
			<div>
				<h2 className={styles.text}>
					К сожалени, по вашему вопросу ничего не найдено
				</h2>
			</div>
		</div>
	);
};

export default Empty;
