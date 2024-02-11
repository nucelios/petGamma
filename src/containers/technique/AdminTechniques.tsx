import { useState } from 'react';
import { Button, Collapse, Tabs, Form, Input, Spin } from 'antd';
import {
	useDeleteTechnique,
	useEditTechnique,
	useGetAllTechnique,
	usePostOneTechnique,
} from '../../features/queryHooks/queryHooks';
import './AdminTechniques.scss';
import { ITechnique } from '../../interfaces/ITechnique';

const { Panel } = Collapse;

export const AdminTechniques = () => {
	const { data: technique = [], isLoading, refetch } = useGetAllTechnique();
	const { mutate: editTechnique } = useEditTechnique();
	const { mutate: postTechnique } = usePostOneTechnique();
	const { mutate: deleteTechnique } = useDeleteTechnique();
	const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
	const [techniqueInput, setTechniqueInput] = useState('');
	const [currentValues, setCurrentValues] = useState<ITechnique | null>(null);
	const [form] = Form.useForm();
	const [activeTabKey, setActiveTabKey] = useState('1');

	const sortedTechnique = [...technique].sort((a, b) => b.id - a.id);

	const [renderKey, setRenderKey] = useState(0);

	const triggerRender = async () => {
		setRenderKey((prevKey) => prevKey + 1);
		await refetch();
	};

	const handleUpload = async () => {
		const payload = {
			name: techniqueInput,
		};

		await postTechnique(payload);
		await triggerRender();
		setActiveTabKey('1');
	};

	const handleEditClick = (techniqueId: number, currentValues: ITechnique) => {
		setEditMode((prevEditMode) => ({
			...Object.fromEntries(
				Object.keys(prevEditMode).map((key) => [key, false])
			),
			[techniqueId]: true,
		}));

		setCurrentValues(currentValues);
		form.resetFields();
		form.setFieldsValue({
			title: currentValues.name || '',
		});
	};

	const handleTechniqueInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setTechniqueInput(value);
	};

	const handleSaveClick = async (techniqueId: number) => {
		const payload = {
			name: techniqueInput || (currentValues?.name ?? ''),
			techniqueId: techniqueId,
		};

		await editTechnique(payload);

		setEditMode((prevEditMode) => ({ ...prevEditMode, [techniqueId]: false }));

		await Promise.all([refetch(), triggerRender()]);
	};

	const handleCancelClick = (techniqueId: number) => {
		setEditMode((prevEditMode) => ({ ...prevEditMode, [techniqueId]: false }));
	};

	const renderTechniqueContent = (technique: ITechnique) => {
		if (editMode[technique.id]) {
			return (
				<div>
					<Form onFinish={() => handleSaveClick(technique.id)} form={form}>
						<Form.Item
							label="Название"
							name="name"
							initialValue={technique.name}
						>
							<Input.TextArea
								onChange={handleTechniqueInput}
								value={techniqueInput}
								className="technique-editBlock-text technique-editBlock-textarea"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								onClick={() => handleSaveClick(technique.id)}
							>
								Сохранить
							</Button>

							<Button
								type="default"
								onClick={() => handleCancelClick(technique.id)}
							>
								Отмена
							</Button>
						</Form.Item>
					</Form>
				</div>
			);
		}

		return (
			<div className="adminTechnique-inBlock-item">
				<div>
					<Button onClick={() => handleEditClick(technique.id, technique)}>
						Edit
					</Button>
					<Button onClick={() => deleteTechnique(technique.id)}>Delete</Button>
				</div>
			</div>
		);
	};

	const items = [
		{
			key: '1',
			label: 'Психологические техники',
			children: (
				<div>
					{sortedTechnique.map((technique: ITechnique) => (
						<Collapse key={technique.id}>
							<Panel key={technique.id} header={technique.name}>
								<div>
									<p className="technique-block-text">{technique.name}</p>
									{renderTechniqueContent(technique)}{' '}
								</div>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '2',
			label: 'Добавить технику',
			children: (
				<div>
					<Form
						name="file-upload-form"
						layout="vertical"
						onFinish={handleUpload}
					>
						<Form.Item
							label="Название техники"
							name="name"
							rules={[{ required: true, message: 'Введите название' }]}
							className="technique-editBlock-text"
						>
							<Input.TextArea
								onChange={handleTechniqueInput}
								className="technique-editBlock-textarea"
							/>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Добавить технику
							</Button>
						</Form.Item>
					</Form>
				</div>
			),
		},
	];

	if (isLoading) {
		return <Spin className={'spinner'} size="large" />;
	}

	return (
		<div key={renderKey}>
			<>
				<Tabs
					activeKey={activeTabKey}
					defaultActiveKey="1"
					items={items}
					onChange={(key) => setActiveTabKey(key)}
				/>
			</>
		</div>
	);
};
