import { Breakpoint } from 'antd';
import dayjs from 'dayjs';
import { IProfit } from '../../../../interfaces/IProfit.ts';

type RecordColumnName = 'month' | 'count' | 'totalSum' | 'cleanSum';

export interface IProfitColumn {
	title: string;
	dataIndex: string;
	responsive?: Breakpoint[];
	reactNode: (record: IProfit) => JSX.Element;
}

interface IRecordAllColumn extends Record<RecordColumnName, IProfitColumn> {}

const columns: IRecordAllColumn = {
	month: {
		title: 'Месяц',
		dataIndex: 'month',
		reactNode: (profit) => <>{dayjs(profit.month).format('YYYY - MMMM ')}</>,
	},
	count: {
		title: 'Количество записей',
		dataIndex: 'count',
		responsive: ['lg'],
		reactNode: (profit) => <>{profit.count.toLocaleString()}</>,
	},
	totalSum: {
		title: 'Заработано',
		dataIndex: 'totalSum',
		responsive: ['md'],
		reactNode: (record) => (
			<>{parseFloat(record.totalSum).toLocaleString()} ₸</>
		),
	},
	cleanSum: {
		title: 'С учетом удержания',
		dataIndex: 'cleanSum',
		responsive: ['sm'],
		reactNode: (record) => (
			<>
				<>{parseFloat(record.cleanSum).toLocaleString()} ₸</>
			</>
		),
	},
};

const generateTableOptions = (columnNames: RecordColumnName[]) => {
	return columnNames.map((key) => columns[key]);
};

export default generateTableOptions;
