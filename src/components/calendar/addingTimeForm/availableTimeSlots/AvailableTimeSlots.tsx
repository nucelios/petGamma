import React from 'react';
import classNames from 'classnames/bind';
import { IoMdClose } from 'react-icons/io';
import styles from '../AddingTimeForm.module.scss';
import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import { useDeleteTime } from '../../../../features/queryHooks/queryHooks.ts';

interface AddingTimeTagContainerProps {
	data: ITimeSlot[];
	availableTimeSlots: ITimeSlot[];
}

const AvailableTimeSlots: React.FC<AddingTimeTagContainerProps> = ({
	availableTimeSlots,
}) => {
	const deleteTime = useDeleteTime();

	const handleDeleteSaveTime = (id: string) => {
		deleteTime.mutate(id);
	};

	return (
		<>
			<div className={styles.readme}>Выбранное вами время</div>
			<div className={styles.tagContainer}>
				{availableTimeSlots.length === 0 ? (
					<p>Время для записи (ничего не выбрано)</p>
				) : (
					availableTimeSlots.map((timeSlot: ITimeSlot) => {
						return (
							<div
								key={timeSlot.id}
								className={classNames.call(styles, styles.tag)}
							>
								{timeSlot.time}
								<span
									onClick={() => handleDeleteSaveTime(timeSlot.id)}
									className={styles.removeTag}
								>
									<IoMdClose className={styles.tag_delete} />
								</span>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default AvailableTimeSlots;
