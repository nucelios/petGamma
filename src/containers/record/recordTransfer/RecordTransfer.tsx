import dayjs from 'dayjs';
import { useState } from 'react';
import styles from './RecordTransfer.module.scss';
import { Button, message } from 'antd';

import { useRecordTransferQuery } from '../../../features/queryHooks/queryHooks.ts';
import SelectionBookingTime from '../../../components/record/selectionBookingTime/SelectionBookingTime.tsx';
import { IRecord } from '../../../interfaces/IRecord.ts';

type Props = {
	closeModal: () => void;
	record: IRecord;
};

const RecordTransfer = ({ record, closeModal }: Props) => {
	const { id: recordId, psychologistId, datetime: recordTime } = record;
	const [newRecordTime, setNewRecordTime] = useState<string>('');
	const [slotId, setSlotId] = useState<string>('');
	const transferRecord = useRecordTransferQuery();
	const confirm = () => {
		transferRecord.mutate(
			{
				id: recordId,
				newDateTime: newRecordTime,
				newSlotId: slotId,
			},
			{
				onSuccess: () => {
					closeModal();
					message.success('Вы успешно пенесли запись на другую дату!');
				},
			}
		);
	};

	return (
		<div className={styles.main}>
			<div className={styles.cardHeader}>
				<h1 className={styles.header}>Перенос времени встречи</h1>
				<p>Назначено на </p>
				<h3>{dayjs(recordTime).format('DD MMMM в HH:mm')}</h3>
			</div>
			<SelectionBookingTime
				setRecordTime={setNewRecordTime}
				setSlotId={setSlotId}
				psychologistId={psychologistId}
			/>
			<Button
				onClick={confirm}
				disabled={!newRecordTime}
				className={styles.btn}
			>
				Подтвердить
			</Button>
		</div>
	);
};

export default RecordTransfer;
