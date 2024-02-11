import styles from './clients.module.scss';
import { Breakpoint, Space } from 'antd';
import Alert from '../../../ui/Alert/Alert.tsx';
import dayjs from 'dayjs';
import { CiCircleInfo } from 'react-icons/ci';
import { IRecord } from '../../../../interfaces/IRecord';
import ChangePsychologistComment from './ClientsHistory/ScrollableText/ChangePsychologistComment.tsx';
import RecordConfirmation from '../../../patient/patient_account/records/RecordConfirmation.tsx';

type RecordColumnName =
	| 'patientName'
	| 'cost'
	| 'address'
	| 'status'
	| 'date'
	| 'time'
	| 'psychologistComment'
	| 'format';

export interface IRecordColumn {
	title: string;
	dataIndex: string;
	responsive?: Breakpoint[];
	reactNode: (record: IRecord) => JSX.Element;
}

interface IRecordAllColumn extends Record<RecordColumnName, IRecordColumn> {}

const columns: IRecordAllColumn = {
	patientName: {
		title: 'ФИО',
		dataIndex: 'patientName',
		reactNode: (record) => <>{record.patientName}</>,
	},
	cost: {
		title: 'Цена',
		dataIndex: 'cost',
		responsive: ['lg'],
		reactNode: (record) => <>{record.cost.toLocaleString()} ₸</>,
	},
	address: {
		title: 'Адрес сессии',
		dataIndex: 'address',
		responsive: ['md'],
		reactNode: (record) => (
			<RecordConfirmation record={record} role={'psychologistAbsent'} />
		),
	},
	date: {
		title: 'Дата',
		dataIndex: 'datetime',
		reactNode: (record) => <>{dayjs(record.datetime).format('DD.MM.YYYY')}</>,
	},
	time: {
		title: 'Время',
		dataIndex: 'datetime',
		responsive: ['sm'],
		reactNode: (record) => (
			<>
				<Space className={styles.info_container}>
					<Alert
						title={'Запись на консультацию'}
						message="Редактировать время записи можно за 2 часа до встречи, в ином случае запись можно только отменить."
					>
						<CiCircleInfo className={styles.info} />

						<span>{dayjs(record.datetime).format('HH:mm')}</span>
					</Alert>
				</Space>
			</>
		),
	},
	status: {
		title: 'Статус',
		dataIndex: 'status',
		responsive: ['xl'],
		reactNode: (record) => (
			<div style={{ wordWrap: 'break-word' }}>{record.status}</div>
		),
	},
	psychologistComment: {
		title: 'Комментарий',
		dataIndex: 'commentPsychologist',
		responsive: ['xxl'],
		reactNode: (record) => <ChangePsychologistComment record={record} />,
	},
	format: {
		title: 'Формат',
		dataIndex: 'format',
		responsive: ['md'],
		reactNode: (record) => <>{record.format}</>,
	},
};

const generateTableOptions = (columnNames: RecordColumnName[]) => {
	return columnNames.map((key) => columns[key]);
};

export default generateTableOptions;
