import { FC, useMemo, useState } from 'react';
import { DescriptionsProps, Table } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { DescriptionsItemType } from 'antd/es/descriptions';
import styles from '../clients/clients.module.scss';
import ModalTable from '../../../ui/ModalTable/ModalTable.tsx';
import { IProfit } from '../../../../interfaces/IProfit.ts';
import { IProfitColumn } from './tabOptions.tsx';

interface Props {
	profits: IProfit[];
	tableOptions: IProfitColumn[];
	emptyText: string;
}

const AdaptiveProfit: FC<Props> = ({ profits, emptyText, tableOptions }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [items, setItems] = useState<DescriptionsProps['items'] | undefined>(
		undefined
	);

	const columns: ColumnsType<IProfit> = useMemo(() => {
		const showModal = (mouth: string) => {
			const profit: IProfit | undefined = profits.find(
				(profit) => profit.month === mouth
			);

			const nextItems: DescriptionsProps['items'] | undefined =
				profit &&
				tableOptions.map<DescriptionsItemType>((option, index) => {
					return {
						key: index,
						label: option.title,
						children: option.reactNode(profit),
					};
				});

			setItems(nextItems);
			setIsModalOpen(true);
		};

		return (() => {
			const userColumns: ColumnsType<IProfit> = tableOptions.map((option) => {
				const newColumn: ColumnType<IProfit> = {
					title: option.title,
					dataIndex: option.dataIndex,
					responsive: option.responsive,
					className: `${styles.colum}`,
					width: 'auto',
					render: (_, profit) => option.reactNode(profit),
				};
				return newColumn;
			});

			const detailedColumn: ColumnType<IProfit> = {
				title: '',
				dataIndex: '_detailed',
				className: `${styles.colum}`,
				width: 'auto',
				render: (_, record) => (
					<p className={styles.btn} onClick={() => showModal(record.month)}>
						Посмотреть
					</p>
				),
			};

			userColumns.push(detailedColumn);

			return userColumns;
		})();
	}, [profits, tableOptions]);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const dataSourceWithKeysFalse = profits.map((item) => {
		return {
			...item,
			key: item.month,
		};
	});

	return (
		<>
			<Table
				className={styles.row}
				columns={columns}
				dataSource={dataSourceWithKeysFalse}
				locale={{ emptyText }}
				virtual={false}
				pagination={{ position: ['none'] }}
				size="small"
			/>
			<ModalTable
				isModalOpen={isModalOpen}
				itemsTable={items}
				closeModal={handleCancel}
			/>
		</>
	);
};
export default AdaptiveProfit;
