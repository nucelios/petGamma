import styles from '../Record.module.scss';
import { Spin } from 'antd';
import { useMemo } from 'react';
import { useGetRecordsHistoryPatient } from '../../../../../features/queryHooks/queryHooks.ts';
import generateTableOptions from '../tableOptions.tsx';
import AdaptiveTable from '../../../../psychologist/psychologist_account/clients/AdaptiveTable.tsx';

const RecordsHistory = () => {
	const { data: history = [], isLoading = [] } = useGetRecordsHistoryPatient();

	const tableOptions = useMemo(() => {
		return generateTableOptions([
			'psychologistName',
			'cost',
			'format',
			'date',
			'time',
			'status',
			'commentPatient',
		]);
	}, []);

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	const emptyText =
		'Пока что у вас нет активных записей на сеансы. Вы можете записаться на приём, чтобы начать свой путь к психологическому благополучию.';

	return (
		<>
			<AdaptiveTable
				records={history}
				emptyText={emptyText}
				tableOptions={tableOptions}
			/>
		</>
	);
};
export default RecordsHistory;
