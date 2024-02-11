import { useState } from 'react';
import { Button, Collapse, Tabs, Spin, Form, Input } from 'antd';
import {
	useDeleteSymptom,
	useEditSymptom,
	useGetAllSymptoms,
	usePostOneSymptom,
} from '../../features/queryHooks/queryHooks';
import { ISymptom } from '../../interfaces/ISymptom';
import '../technique/AdminTechniques.scss';

const { Panel } = Collapse;

export const AdminSymptoms = () => {
	const { data: symptoms = [], isLoading, refetch } = useGetAllSymptoms();
	const { mutate: editSymptom } = useEditSymptom();
	const { mutate: postSymptom } = usePostOneSymptom();
	const { mutate: deleteSymptom } = useDeleteSymptom();
	const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
	const [symptomInput, setSymptomInput] = useState('');
	const [currentValues, setCurrentValues] = useState<ISymptom | null>(null);
	const [form] = Form.useForm();
	const [activeTabKey, setActiveTabKey] = useState('1');

	const sortedSymptoms = [...symptoms].sort((a, b) => b.id - a.id);

	const [renderKey, setRenderKey] = useState(0);

	const triggerRender = async () => {
		setRenderKey((prevKey) => prevKey + 1);
		await refetch();
	};

	const handleUpload = async () => {
		const payload = {
			name: symptomInput,
		};

		await postSymptom(payload);
		await triggerRender();
		setActiveTabKey('1');
	};

	const handleEditClick = (symptomId: number, currentValues: ISymptom) => {
		setEditMode((prevEditMode) => ({
			...Object.fromEntries(
				Object.keys(prevEditMode).map((key) => [key, false])
			),
			[symptomId]: true,
		}));

		setCurrentValues(currentValues);
		form.resetFields();
		form.setFieldsValue({
			title: currentValues.name || '',
		});
	};

	const handleSymptomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setSymptomInput(value);
	};

	const handleSaveClick = async (symptomId: number) => {
		const payload = {
			name: symptomInput || (currentValues?.name ?? ''),
			symptomId: symptomId,
		};

		await editSymptom(payload);

		setEditMode((prevEditMode) => ({ ...prevEditMode, [symptomId]: false }));

		await Promise.all([refetch(), triggerRender()]);
	};

	const handleCancelClick = (symptomId: number) => {
		setEditMode((prevEditMode) => ({ ...prevEditMode, [symptomId]: false }));
	};

	const renderSymptomContent = (symptom: ISymptom) => {
		if (editMode[symptom.id]) {
			return (
				<div>
					<Form onFinish={() => handleSaveClick(symptom.id)} form={form}>
						<Form.Item label="Название" name="name" initialValue={symptom.name}>
							<Input.TextArea
								onChange={handleSymptomInput}
								value={symptomInput}
								className="technique-editBlock-text technique-editBlock-textarea"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								onClick={() => handleSaveClick(symptom.id)}
							>
								Сохранить
							</Button>

							<Button
								type="default"
								onClick={() => handleCancelClick(symptom.id)}
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
					<Button onClick={() => handleEditClick(symptom.id, symptom)}>
						Edit
					</Button>
					<Button onClick={() => deleteSymptom(symptom.id)}>Delete</Button>
				</div>
			</div>
		);
	};

	const items = [
		{
			key: '1',
			label: 'Симптомы',
			children: (
				<div>
					{sortedSymptoms.map((symptom: ISymptom) => (
						<Collapse key={symptom.id}>
							<Panel key={symptom.id} header={symptom.name}>
								<div>
									<p className="technique-block-text">{symptom.name}</p>
									{renderSymptomContent(symptom)}{' '}
								</div>
							</Panel>
						</Collapse>
					))}
				</div>
			),
		},
		{
			key: '2',
			label: 'Добавить симптом',
			children: (
				<div>
					<Form
						name="file-upload-form"
						layout="vertical"
						onFinish={handleUpload}
					>
						<Form.Item
							label="Название симптома"
							name="name"
							rules={[{ required: true, message: 'Введите название' }]}
							className="technique-editBlock-text"
						>
							<Input.TextArea
								onChange={handleSymptomInput}
								className="technique-editBlock-textarea"
							/>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Добавить симптом
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
