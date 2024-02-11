import { IPsychologist } from '../../../interfaces/IPsychologist';
import { Button, Table, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
	useGetPsychologistsAdminFalse,
	useGetPsychologistsAdminTrue,
	usePsychoDeleteAdmin,
	usePsychoPublishAdmin,
} from '../../../features/queryHooks/queryHooks';
import { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import Profit from '../Profit/Profit.tsx';

const Psychologists = () => {
	const [activePage, setActive] = useState(false);
	const navigate = useNavigate();
	const { data: trueData } = useGetPsychologistsAdminFalse();
	const { data: falseData } = useGetPsychologistsAdminTrue();
	const { mutate: publishPsycho } = usePsychoPublishAdmin();
	const { mutate: deletePsycho } = usePsychoDeleteAdmin();
	const arrPsychoTrue = trueData?.data;
	const arrPsychoFalse = falseData?.data;
	const publishAction = (id: number) => {
		publishPsycho(id);
	};
	const deleteAction = (id: number) => {
		deletePsycho(id);
	};
	const viewAction = (id: number) => {
		navigate(`/psychologists/${id}`);
	};

	const changePublish = () => {
		if (activePage === false) {
			setActive(true);
		} else {
			setActive(false);
		}
	};

	const columns = [
		{
			title: 'Полное имя',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'День рождение',
			dataIndex: 'birthday',
			key: 'birthday',
		},
		{
			title: 'Состояние публикации',
			dataIndex: 'isPublish',
			key: 'isPublish',
			render: (isPublish: boolean) => (
				<span>{isPublish ? 'Опубликован' : 'Неопубликован'}</span>
			),
		},
		{
			title: 'Публикация',
			key: 'publish',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => publishAction(psycho.id)}>
					{activePage ? 'Отменить публикацию' : 'Опубликовать'}
				</Button>
			),
		},
		{
			title: 'Удаление',
			key: 'delete',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => deleteAction(psycho.id)}>
					Удалить
				</Button>
			),
		},
		{
			title: 'Просмотр',
			key: 'view',
			render: (psycho: IPsychologist) => (
				<Button type="primary" onClick={() => viewAction(psycho.id)}>
					Просмотреть
				</Button>
			),
		},
		{
			title: 'Доход',
			key: 'view',
			render: (psycho: IPsychologist) => <Profit id={psycho.id} />,
		},
	];

	if (arrPsychoTrue != undefined && arrPsychoFalse != undefined) {
		const dataSourceWithKeysTrue = arrPsychoTrue.map((item) => {
			const date = new Date(item.birthday);
			const formattedBirthday = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;
			return {
				...item,
				birthday: formattedBirthday,
				key: item.id,
			};
		});

		const dataSourceWithKeysFalse = arrPsychoFalse.map((item) => {
			const date = new Date(item.birthday);
			const formattedBirthday = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;
			return {
				...item,
				birthday: formattedBirthday,
				key: item.id,
			};
		});

		return (
			<Tabs activeKey={activePage ? 'false' : 'true'} onChange={changePublish}>
				<TabPane tab="Опубликованные психологи" key="false">
					<Table columns={columns} dataSource={dataSourceWithKeysFalse} />
				</TabPane>
				<TabPane tab="Неопубликованные психологи" key="true">
					<Table columns={columns} dataSource={dataSourceWithKeysTrue} />
				</TabPane>
			</Tabs>
		);
	}
};

export default Psychologists;
