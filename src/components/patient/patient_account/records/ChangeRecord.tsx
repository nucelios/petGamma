import styles from './Record.module.scss';
import { FC, useState } from 'react';
import Wrapper from '../../../ui/Wrapper/Wrapper';
import RecordTransfer from '../../../../containers/record/recordTransfer/RecordTransfer';
import { IRecord } from '../../../../interfaces/IRecord';
import { IoSettingsOutline } from 'react-icons/io5';
import { Popconfirm, message } from 'antd';
import info_error from '../../../../assets/icon/info-error.svg';
import { useDeleteRecord } from '../../../../features/queryHooks/queryHooks';

interface Props {
	record: IRecord;
}

const ChangeRecord: FC<Props> = ({ record }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const deleteRecord = useDeleteRecord();

	const confirm = (id: number) => {
		deleteRecord.mutate(id);
	};

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const currentTime = new Date();
	const targetTime = new Date(record.datetime);
	const timeDifference = targetTime.getTime() - currentTime.getTime();

	return (
		<>
			<div style={{ position: 'relative' }}>
				<Wrapper key={record.id} active={modalVisible} onClick={closeModal}>
					<RecordTransfer record={record} closeModal={closeModal} />
				</Wrapper>
			</div>
			<div className={styles.editor}>
				{timeDifference < 2 * 60 * 60 * 1000 ? (
					<IoSettingsOutline
						className={styles.disable}
						title="Интервал меньше 2 часов, нельзя открыть"
					/>
				) : (
					<IoSettingsOutline
						onClick={() => openModal()}
						className={styles.setting}
					/>
				)}
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
					description="Вы уверены, что хотите отменить консультацию?"
					onConfirm={() => confirm(record.id)}
					onCancel={() => message.warning('Психолог ожидает встречи с вами.')}
					okButtonProps={{ className: styles.okText }}
					cancelButtonProps={{ className: styles.CancelText }}
					okText="Отменить"
					cancelText="Вернуться"
				>
					<p>Отменить</p>
				</Popconfirm>
			</div>
		</>
	);
};

export default ChangeRecord;
