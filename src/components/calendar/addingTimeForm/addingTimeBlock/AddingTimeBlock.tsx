import React, { useEffect, useState } from 'react';
import styles from '../AddingTimeForm.module.scss';
import { Alert, Select } from 'antd';
import dayjs from 'dayjs';
import { useAddNewTimes } from '../../../../features/queryHooks/queryHooks.ts';

interface AddingTimeBlockProps {
	date: string;
}

const AddingTimeBlock: React.FC<AddingTimeBlockProps> = ({ date }) => {
	const [isError, setIsError] = useState(false);
	const addNewTimes = useAddNewTimes(setIsError);

	const availableHours = Array.from({ length: 24 }, (_, i) => i);
	const currentHour = new Date().getHours();
	const filterHours =
		date === dayjs().format('YYYY-MM-DD')
			? availableHours.filter((hour) => hour >= currentHour)
			: availableHours;
	const [time, setTime] = useState<string>('');
	const [hours, setHours] = useState(currentHour);
	const [minutes, setMinutes] = useState(0);

	useEffect(() => {
		const selectedTime = dayjs().set('hour', hours).set('minute', minutes);
		const formattedTime = selectedTime.format('HH:mm');
		setTime(formattedTime);
	}, [hours, minutes]);

	const handleAddTime = () => {
		addNewTimes.mutate({
			date,
			time,
		});
	};
	return (
		<div className={styles.time_block}>
			{isError && (
				<Alert
					className={styles.error}
					message={
						'Вы не можете повторно выбрать данное время, так как у вас уже оно указано.'
					}
					type="error"
					closable
				/>
			)}
			<div className={styles.form}>
				<label className={styles.label}>Часы</label>
				<Select
					className={styles.input}
					defaultValue={currentHour}
					suffixIcon={null}
					onChange={(value) => setHours(value)}
				>
					{filterHours.map((hour) => (
						<Select.Option key={hour} value={hour}>
							{hour < 10 ? `0${hour}` : hour}
						</Select.Option>
					))}
				</Select>
			</div>
			<div className={styles.form}>
				<label className={styles.label}>Минуты</label>

				<Select
					className={styles.input}
					suffixIcon={null}
					defaultValue={minutes}
					onChange={(value) => setMinutes(value)}
				>
					<Select.Option key={minutes} value={minutes}>
						00
					</Select.Option>
				</Select>
			</div>

			<input
				className={styles.btn}
				onClick={handleAddTime}
				type="button"
				value="Добавить"
			/>
		</div>
	);
};

export default AddingTimeBlock;
