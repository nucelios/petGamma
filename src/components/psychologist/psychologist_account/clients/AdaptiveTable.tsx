import { ColumnType, ColumnsType } from 'antd/es/table';
import 'dayjs/locale/ru';
import styles from './clients.module.scss';
import { IRecord } from '../../../../interfaces/IRecord';
import { DescriptionsProps, Table } from 'antd';
import { FC, useMemo, useState } from 'react';
import { IRecordColumn } from './tableOptions';
import ModalTable from '../../../ui/ModalTable/ModalTable';
import { DescriptionsItemType } from 'antd/es/descriptions';

interface Props {
	records: IRecord[];
	tableOptions: IRecordColumn[];
	emptyText: string;
}

const AdaptiveTable: FC<Props> = ({ records, emptyText, tableOptions }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [items, setItems] = useState<DescriptionsProps['items'] | undefined>(
		undefined
	);

	const columns: ColumnsType<IRecord> = useMemo(() => {
		const showModal = (recordId: number) => {
			const record: IRecord | undefined = records.find(
				(record) => record.id === recordId
			);

			const nextItems: DescriptionsProps['items'] | undefined =
				record &&
				tableOptions.map<DescriptionsItemType>((option, index) => {
					return {
						key: index,
						label: option.title,
						children: option.reactNode(record),
					};
				});

			setItems(nextItems);
			setIsModalOpen(true);
		};

		return (() => {
			const userColumns: ColumnsType<IRecord> = tableOptions.map((option) => {
				const newColumn: ColumnType<IRecord> = {
					title: option.title,
					dataIndex: option.dataIndex,
					responsive: option.responsive,
					className: `${styles.colum}`,
					width: 'auto',
					render: (_, record) => option.reactNode(record),
				};
				return newColumn;
			});

			const detailedColumn: ColumnType<IRecord> = {
				title: '',
				dataIndex: '_detailed',
				className: `${styles.colum}`,
				width: 'auto',
				render: (_, record) => (
					<p className={styles.btn} onClick={() => showModal(record.id)}>
						Посмотреть
					</p>
				),
			};

			userColumns.push(detailedColumn);

			return userColumns;
		})();
	}, [records, tableOptions]);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const dataSourceWithKeysFalse = records.map((item) => {
		return {
			...item,
			key: item.id,
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
export default AdaptiveTable;
