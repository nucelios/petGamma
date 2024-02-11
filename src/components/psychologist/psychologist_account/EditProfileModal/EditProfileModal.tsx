import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { ITechnique } from '../../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../../interfaces/ITherapyMethod';
import { ISymptom } from '../../../../interfaces/ISymptom';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { ICity } from '../../../../interfaces/IPsychologistForm';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

export interface ModalFormState {
	fullName: string;
	gender: 'female' | 'male';
	birthday: Date;
	address: string;
	description: string;
	video: string | null;
	experienceYears: number;
	languages: string[];
	education: string;
	format: 'online' | 'offline';
	cost: number;
	consultationType: string[];
	selfTherapy: number;
	lgbt: '0' | '1';
	cityId: number;
	symptomIds: number[];
	therapyMethodIds: number[];
	techniqueIds: number[];
}

type Props = {
	open: boolean;
	onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onSave: (values: ModalFormState) => void;
	psychologist: IPsychologist;
	techniques: ITechnique[];
	therapyMethods: ITherapyMethod[];
	symptoms: ISymptom[];
	cities: ICity[];
};

const { Option } = Select;

export const EditProfileModal = ({
	open,
	onCancel,
	onSave,
	psychologist,
	techniques,
	therapyMethods,
	symptoms,
	cities,
}: Props) => {
	const [form] = Form.useForm();
	const [time, setTime] = useState<Dayjs | null>(null);

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			values.birthday = time;
			await onSave(values);
		} catch (error) {
			console.error('Save failed:', error);
		}
	};

	return (
		<Modal
			title="Редактировать профиль"
			open={open}
			onCancel={onCancel}
			onOk={handleSave}
		>
			<Form form={form} layout="vertical" initialValues={psychologist}>
				<Form.Item
					label="ФИО"
					name="fullName"
					rules={[{ required: true, message: 'Введите имя пользователя' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пол"
					name="gender"
					rules={[{ required: true, message: 'Выберите пол' }]}
				>
					<Select>
						<Option value="male">Мужской</Option>
						<Option value="female">Женский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Дата и время рождения"
					name="birthday"
					rules={[{ required: true, message: 'Введите дату рождения' }]}
				>
					<DatePicker onChange={(date) => setTime(date)} />
					<br />
				</Form.Item>

				<Form.Item
					label="Город"
					name="cityId"
					rules={[{ required: true, message: 'Выберите хотя бы один город!' }]}
				>
					<Select>
						{cities && cities.length !== 0 ? (
							<>
								{cities.map((city, index) => (
									<Option key={index} value={city.id}>
										{city.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>

				<Form.Item label="Адрес" name="address">
					<Input />
				</Form.Item>

				<Form.Item
					label="О себе"
					name="description"
					rules={[{ required: true, message: 'Введите данные о себе' }]}
				>
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					label="Видео (ссылка)"
					name="video"
					rules={[
						{
							type: 'url',
							message: 'Пожалуйста, введите корректную ссылку на видео',
						},
						{ required: true, message: 'Введите ссылку на видео' },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Опыт работы"
					name="experienceYears"
					rules={[{ required: true, message: 'Введите Ваш опыт работы' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Язык"
					name="languages"
					rules={[{ required: true, message: 'Выберите язык' }]}
				>
					<Select mode="multiple">
						<Option value="kazakh">Казахский</Option>
						<Option value="russian">Русский</Option>
						<Option value="english">Английский</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Образование"
					name="education"
					rules={[{ required: true, message: 'Введите образование' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Форма приема"
					name="format"
					rules={[{ required: true, message: 'Введите форму приема' }]}
				>
					<Select mode="multiple">
						<Option value="online">Онлайн</Option>
						<Option value="offline">Оффлайн</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Стоимость"
					name="cost"
					rules={[{ required: true, message: 'Введите стоимость' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Вид консультации"
					name="consultationType"
					rules={[{ required: true, message: 'Введите вид консультации' }]}
				>
					<Select mode="multiple">
						<Option value="solo">Один человек</Option>
						<Option value="duo">Вдвоем</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Личная терапия (в годах)"
					name="selfTherapy"
					rules={[{ required: true, message: 'Введите личную терапию' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item label="Опыт работы с лгбт" name="lgbt">
					<Select>
						<Option value="0">Нет</Option>
						<Option value="1">Да</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Психологические техники"
					name="techniqueIds"
					rules={[
						{ required: true, message: 'Выберите не менее двух техник!' },
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques = getFieldValue('techniqueIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух техник!')
								);
							},
						}),
					]}
				>
					<Select mode="multiple">
						{techniques && techniques.length !== 0 ? (
							<>
								{techniques.map((technique) => (
									<Option key={technique.id} value={technique.id}>
										{technique.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>

				<Form.Item
					label="Методы терапии"
					name="therapyMethodIds"
					rules={[
						{
							required: true,
							message: 'Выберите не менее двух методов терапии!',
						},
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques = getFieldValue('techniqueIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух техник!')
								);
							},
						}),
					]}
				>
					<Select mode="multiple">
						{therapyMethods && therapyMethods.length !== 0 ? (
							<>
								{therapyMethods.map((method) => (
									<Option key={method.id} value={method.id}>
										{method.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>

				<Form.Item
					label="Симптомы"
					name="symptomIds"
					rules={[
						{ required: true, message: 'Выберите не менее двух симптомов!' },
						({ getFieldValue }) => ({
							validator() {
								const selectedTechniques = getFieldValue('techniqueIds') || [];
								if (selectedTechniques.length >= 2) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Выберите не менее двух техник!')
								);
							},
						}),
					]}
				>
					<Select mode="multiple">
						{symptoms && symptoms.length !== 0 ? (
							<>
								{symptoms.map((symptom) => (
									<Option key={symptom.id} value={symptom.id}>
										{symptom.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
