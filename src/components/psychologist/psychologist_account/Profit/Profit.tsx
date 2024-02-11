import styles from '../clients/clients.module.scss';
import { useMemo } from 'react';
import { Spin } from 'antd';
import generateTableOptions from './tabOptions.tsx';
import AdaptiveProfit from './AdaptiveProfit.tsx';
import { useGetPsychologistProfit } from '../../../../features/queryHooks/queryHooks.ts';

const Profit = () => {
	const { data: profits = [], isLoading } = useGetPsychologistProfit();

	const tableOptions = useMemo(() => {
		return generateTableOptions(['month', 'count', 'totalSum', 'cleanSum']);
	}, []);

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	const emptyText = 'В настоящее время у вас нет доходов.';

	return (
		<>
			<AdaptiveProfit
				profits={profits}
				emptyText={emptyText}
				tableOptions={tableOptions}
			/>
		</>
	);
};
export default Profit;
