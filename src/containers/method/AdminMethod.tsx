import { useState } from 'react';
import { Button, Collapse, Tabs, Spin, Form, Input } from 'antd';
import {
	useDeleteMethod,
	useEditMethod,
	useGetAllMethod,
	usePostOneMethod,
} from '../../features/queryHooks/queryHooks';
import { IMethod } from '../../interfaces/IPsychologistForm';
import '../technique/AdminTechniques.scss';

const { Panel } = Collapse;

export const AdminMethod = () => {
	const { data: method = [], isLoading, refetch } = useGetAllMethod();
	const { mutate: editMethod } = useEditMethod();
	const { mutate: postMethod } = usePostOneMethod();
	const { mutate: deleteMethod } = useDeleteMethod();
	const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
	const [methodInput, setMethodInput] = useState('');
	const [currentValues, setCurrentValues] = useState<IMethod | null>(null);
	const [form] = Form.useForm();
	const [activeTabKey, setActiveTabKey] = useState('1');

	const sortedMethod = [...method].sort((a, b) => b.id - a.id);

	const [renderKey, setRenderKey] = useState(0);

	const triggerRender = async () => {
		setRenderKey((prevKey) => prevKey + 1);
		await refetch();
	};

	const handleUpload = async () => {
		const payload = {
			name: methodInput,
		};

		await postMethod(payload);
		await triggerRender();
		setActiveTabKey('1');
	};

	const handleEditClick = (methodId: number, currentValues: IMethod) => {
		setEditMode((prevEditMode) => ({
			...Object.fromEntries(
				Object.keys(prevEditMode).map((key) => [key, false])
			),
			[methodId]: true,
		}));

		setCurrentValues(currentValues);
		form.resetFields();
		form.setFieldsValue({
			title: currentValues.name || '',
		});
	};

	const handleMethodInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setMethodInput(value);
	};

	const handleSaveClick = async (methodId: number) => {
		const payload = {
			name: methodInput || (currentValues?.name ?? ''),
			methodId: methodId,
		};

		await editMethod(payload);

		setEditMode((prevEditMode) => ({ ...prevEditMode, [methodId]: false }));

		await Promise.all([refetch(), triggerRender()]);
	};

	const handleCancelClick = (methodId: number) => {
		setEditMode((prevEditMode) => ({ ...prevEditMode, [methodId]: false }));
	};

	const renderTechniqueContent = (method: IMethod) => {
		if (editMode[method.id]) {
			return (
				<div>
					<Form onFinish={() => handleSaveClick(method.id)} form={form}>
						<Form.Item label="Название" name="name" initialValue={method.name}>
							<Input.TextArea
								onChange={handleMethodInput}
								value={methodInput}
								className="technique-editBlock-text technique-editBlock-textarea"
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={() => handleSaveClick(method.id)}>
								Сохранить
							</Button>

							<Button
								type="default"
								onClick={() => handleCancelClick(method.id)}
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
					<Button onClick={() => handleEditClick(method.id, method)}>
						Edit
					</Button>
					<Button onClick={() => deleteMethod(method.id)}>Delete</Button>
				</div>
			</div>
		);
	};

	const items = [
		{
			key: '1',
			label: 'Методы терапии',
			children: (
				<div>
					{sortedMethod.map((method: IMethod) => (
						<Collapse key={method.id}>
							<Panel key={method.id} header={method.name}>
								<div>
									<p className="technique-block-text">{method.name}</p>
									{renderTechniqueContent(method)}{' '}
								</div>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '2',
			label: 'Добавить метод',
			children: (
				<div>
					<Form
						name="file-upload-form"
						layout="vertical"
						onFinish={handleUpload}
					>
						<Form.Item
							label="Название метода"
							name="name"
							rules={[{ required: true, message: 'Введите название' }]}
							className="technique-editBlock-text"
						>
							<Input.TextArea
								onChange={handleMethodInput}
								className="technique-editBlock-textarea"
							/>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Добавить метод
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
