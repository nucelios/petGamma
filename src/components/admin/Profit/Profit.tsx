import { Button, Table } from 'antd';
import { useGetOnePsychologistProfit } from '../../../features/queryHooks/queryHooks.ts';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { IProfit } from '../../../interfaces/IProfit.ts';
import Wrapper from '../../ui/Wrapper/Wrapper.tsx';
import { useState } from 'react';
interface Props {
	id: number;
}
const Profit = ({ id }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const { data = [] } = useGetOnePsychologistProfit(id);

	const dataSourceWithKeysFalse = data.map((item) => {
		return {
			...item,
			key: item.month,
		};
	});

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const columns: ColumnsType<IProfit> = [
		{
			title: 'Дата',
			dataIndex: 'month',
			align: 'center',
			render: (text) => <>{dayjs(text).format('YYYY MMMM')}</>,
		},
		{
			title: 'Количество записей',
			dataIndex: 'count',
			align: 'center',
			render: (text) => (
				<div style={{ textAlign: 'center' }}>{text.toLocaleString()}</div>
			),
		},
		{
			title: 'Заработано',
			dataIndex: 'totalSum',
			align: 'center',
			render: (text) => (
				<div style={{ textAlign: 'center' }}>
					{parseFloat(text).toLocaleString()} ₸
				</div>
			),
		},
		{
			title: 'С вычетом комиссии',
			dataIndex: 'cleanSum',
			align: 'center',
			render: (text) => (
				<div style={{ textAlign: 'center' }}>
					{parseFloat(text).toLocaleString()} ₸
				</div>
			),
		},
		{
			title: 'Прибыль в компанию',
			dataIndex: 'deduction',
			align: 'center',
			render: (text) => (
				<div style={{ textAlign: 'center' }}>
					{parseFloat(text).toLocaleString()} ₸
				</div>
			),
		},
	];

	const emptyText = 'Еще не доходов ';

	return (
		<>
			<Button type="primary" onClick={openModal}>
				Доход
			</Button>
			<Wrapper key={id} active={modalVisible} onClick={closeModal}>
				<Table
					style={{ padding: 10, height: '70svh' }}
					columns={columns}
					dataSource={dataSourceWithKeysFalse}
					locale={{ emptyText }}
					virtual={false}
					pagination={{ position: ['none'] }}
				/>
			</Wrapper>
		</>
	);
};
export default Profit;
