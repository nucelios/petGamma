import 'dayjs/locale/ru';
import styles from '../clients.module.scss';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { useMemo, useState } from 'react';
import { useGetRecordsActualPsychologists } from '../../../../../features/queryHooks/queryHooks.ts';
import DatePicker from '../../../../datePicker/DatePicker.tsx';
import generateTableOptions from '../tableOptions.tsx';
import AdaptiveTable from '../AdaptiveTable.tsx';

const ClientsHistory = () => {
	const currentDate = dayjs().format('YYYY-MM-DD');
	const [selectDate, setSelectDate] = useState<string>(currentDate);
	const { data: history = [], isLoading } = useGetRecordsActualPsychologists(
		selectDate,
		false
	);

	const tableOptions = useMemo(() => {
		return generateTableOptions([
			'patientName',
			'cost',
			'format',
			'date',
			'time',
			'status',
			'psychologistComment',
		]);
	}, []);

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	const emptyText =
		'В настоящее время у вас нет истории клиентов на выбранную дату.';

	return (
		<>
			<DatePicker onPanelChange={setSelectDate} />
			<AdaptiveTable
				records={history}
				emptyText={emptyText}
				tableOptions={tableOptions}
			/>
		</>
	);
};
export default ClientsHistory;
