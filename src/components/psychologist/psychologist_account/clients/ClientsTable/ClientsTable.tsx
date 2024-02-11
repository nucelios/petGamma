import 'dayjs/locale/ru';
import styles from '../clients.module.scss';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { useMemo, useState } from 'react';
import DatePicker from '../../../../datePicker/DatePicker.tsx';
import { useGetRecordsActualPsychologists } from '../../../../../features/queryHooks/queryHooks.ts';
import generateTableOptions from '../tableOptions.tsx';
import AdaptiveTable from '../AdaptiveTable.tsx';

const ClientsTable = () => {
	const currentDate = dayjs().format('YYYY-MM-DD');
	const [selectDate, setSelectDate] = useState<string>(currentDate);
	const { data: history = [], isLoading = [] } =
		useGetRecordsActualPsychologists(selectDate, true);

	const tableOptions = useMemo(() => {
		return generateTableOptions([
			'patientName',
			'cost',
			'address',
			'date',
			'time',
			'status',
		]);
	}, []);

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	const emptyText = 'На текущую дату нет актуальных записей на приём. ';

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
export default ClientsTable;
