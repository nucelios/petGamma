import styles from '../Record.module.scss';
import { useMemo } from 'react';
import { useGetActualRecordsPatient } from '../../../../../features/queryHooks/queryHooks';
import generateTableOptions from '../tableOptions';
import { Spin } from 'antd';
import AdaptiveTable from '../../../../psychologist/psychologist_account/clients/AdaptiveTable';

const MyRecords = () => {
	const { data: records = [], isLoading } = useGetActualRecordsPatient();

	const tableOptions = useMemo(() => {
		return generateTableOptions([
			'psychologistName',
			'cost',
			'address',
			'date',
			'time',
			'status',
			'changeRecord',
		]);
	}, []);

	const emptyText =
		'Пока что у вас нет активных записей на сеансы. Вы можете записаться на приём, чтобы начать свой путь к психологическому благополучию.';

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	return (
		<>
			<AdaptiveTable
				records={records}
				emptyText={emptyText}
				tableOptions={tableOptions}
			/>
		</>
	);
};

export default MyRecords;
