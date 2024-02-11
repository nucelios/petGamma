import styles from './Record.module.scss';
import { FC } from 'react';
import { IRecord } from '../../../../interfaces/IRecord';
import { Popconfirm, message, Tooltip } from 'antd';
import info_error from '../../../../assets/icon/info-error.svg';
import { useRecordConfirmation } from '../../../../features/queryHooks/queryHooks.ts';

interface Props {
	record: IRecord;
	role: 'patientAbsent' | 'psychologistAbsent';
}

const RecordConfirmation: FC<Props> = ({ record, role }) => {
	const changeStatus = useRecordConfirmation();
	const currentTime = new Date();
	const targetTime = new Date(record.datetime);
	const timeDifference = targetTime.getTime() - currentTime.getTime();
	const isWithin5Minutes = timeDifference <= 5 * 60 * 1000;
	const openZoomLink = (link: string) => {
		changeStatus.mutate({ recordId: record.id, role });
		window.open(link, '_blank');
	};

	return (
		<>
			{record.format === 'offline' ? (
				<span>{record.address}</span>
			) : !isWithin5Minutes ? (
				<Tooltip title="Невозможно открыть менее чем за 5 минут до начала.">
					<span className={styles.colum}>Ссылка</span>
				</Tooltip>
			) : (
				<Popconfirm
					rootClassName={styles.popconfirm}
					icon={
						<img
							className={styles.error}
							src={info_error}
							style={{ color: 'red' }}
							alt={'info'}
						/>
					}
					title={false}
					className={styles.wrapper}
					description="При переходе по ссылке вы подтверждаете своё участие!"
					onConfirm={() => openZoomLink(record.broadcast)}
					onCancel={() => message.warning('Психолог ожидает встречи с вами.')}
					okButtonProps={{ className: styles.okText }}
					cancelButtonProps={{ className: styles.CancelText }}
					okText="Перейти"
					cancelText="Вернуться"
				>
					<span className={styles.colum}>Ссылка</span>
				</Popconfirm>
			)}
		</>
	);
};

export default RecordConfirmation;
