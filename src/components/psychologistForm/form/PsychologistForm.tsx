import {
	Form,
	Input,
	Button,
	Typography,
	Select,
	DatePicker,
	Layout,
	Upload,
	Row,
	Col,
	InputNumber,
} from 'antd';
import {
	IPsychologist,
	IPsychologistRegisterData,
} from '../../../interfaces/IPsychologist.ts';
import InformationText from '../../ui/Text/InformationText.tsx';
import { ServerFormValidationResponse } from '../../../interfaces/ServerFormValidationResponse.ts';
import { ITechnique } from '../../../interfaces/ITechnique.ts';
import { ISymptom } from '../../../interfaces/ISymptom.ts';
import { ITherapyMethod } from '../../../interfaces/ITherapyMethod.ts';
import { ICity, IPhoto } from '../../../interfaces/IPsychologistForm.ts';
import { useEffect, useState } from 'react';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadButton } from '../../ui/Button/UploadButton.tsx';
import './PsychologistForm.scss';
import UploadInput from '../../ui/Upload/UploadInput.tsx';
import {
	appendArrayToFormData,
	appendValuesToFormData,
} from '../../../helpers/appendValuesToFormData.ts';
import AboutModerationModal from '../aboutModerationModal/AboutModerationModal.tsx';
import infoIcon from '../../../assets/icon/info-circle.svg';
import Alert from '../../ui/Alert/Alert.tsx';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { RootState } from '../../../store/index.ts';
import {
	useDeleteCertificatesPsychologist,
	useDeletePhotoPsychologist,
	useEditEmail,
	useEditPsychologist,
	useGetOnePsychologist,
	usePostCertificatesPsychologist,
	usePostPhotoPsychologist,
} from '../../../features/queryHooks/queryHooks.ts';
import {
	setPhotoPsychologist,
	setPsychologist,
} from '../../../features/user/userSlice.ts';
const { Title } = Typography;
const { Option } = Select;

type Props = {
	submit: (submitData: FormData) => void;
	errors?: ServerFormValidationResponse | null;
	techniques: ITechnique[];
	symptoms: ISymptom[];
	therapyMethods: ITherapyMethod[];
	cities: ICity[];
};

export const PsychologistForm = ({
	submit,
	errors,
	symptoms,
	techniques,
	therapyMethods,
	cities,
}: Props) => {
	const [сurrentPassword, setCurrentPassword] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const user = useAppSelector((state: RootState) => state.users.userInfo);
	const { mutate: editPsychologist } = useEditPsychologist(
		Number(user?.psychologist?.id)
	);

	const { mutate: editEmail } = useEditEmail();

	const { mutate: postPhotoPsychologist } = usePostPhotoPsychologist();
	const { mutate: postCertificatePsychologist } =
		usePostCertificatesPsychologist();

	const { mutate: deletePhotoPsychologist } = useDeletePhotoPsychologist();
	const { mutate: deleteCertificatesPsychologist } =
		useDeleteCertificatesPsychologist();
	const dispatch = useAppDispatch();
	const { dataPsychologist } = useAppSelector((store) => store.users);
	const onDeletePhotoPsychologist = async (id: number) => {
		await deletePhotoPsychologist(id);
		if (psychologist?.photos) {
			const newFilterPsylogoist: IPhoto[] = psychologist?.photos.filter(
				(item) => item.id !== id
			);
			await dispatch(setPhotoPsychologist(newFilterPsylogoist));
		}
	};
	const { data: psychologist } = user?.accessToken
		? // eslint-disable-next-line react-hooks/rules-of-hooks, no-mixed-spaces-and-tabs
		  useGetOnePsychologist(Number(user?.psychologist?.id))
		: { data: undefined };
	useEffect(() => {
		if (user?.accessToken) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			dispatch(setPsychologist(psychologist as IPsychologist));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function formatDateString(dateString: Date | string | undefined): string {
		if (!dateString) return '';

		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	const formattedBirthday = formatDateString(psychologist?.birthday);

	const initialValues = {
		lgbt: false || '',
		fullName: psychologist?.fullName || '',
		gender: psychologist?.gender || '',
		birthday: formattedBirthday || '',
		experienceYears: psychologist?.experienceYears || '',
		languages: psychologist?.languages || '',
		format: psychologist?.format || '',
		cost: psychologist?.cost || '',
		consultationType: psychologist?.consultationType || '',
		selfTherapy: psychologist?.selfTherapy || '',
		cityId: psychologist?.city.id || '',
		symptomIds: psychologist?.symptoms.map((symptoms) => symptoms.id),
		therapyMethodIds: psychologist?.therapyMethods.map(
			(therapyMethods) => therapyMethods.id
		),
		techniqueIds: psychologist?.techniques.map((technique) => technique.id),
		address: psychologist?.address || '',
		education: psychologist?.education || '',
		description: psychologist?.description || '',
		video: psychologist?.video || '',
		photos: psychologist?.photos || '',
	};

	const [certificateFileList, setCertificateFileList] = useState<UploadFile[]>(
		[]
	);

	const handleCancelClick = () => {
		window.location.reload();
	};

	const handleCertificateChange: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setCertificateFileList(newFileList);
	};
	const getErrorsBy = (name: string) => {
		const error = errors?.errors?.find((error) => error.type === name);
		return error?.messages.join(',');
	};
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleSubmit = async (values: IPsychologistRegisterData) => {
		const formData = new FormData();
		values.photos.fileList.forEach((file: UploadFile) => {
			formData.append('photos', file.originFileObj as Blob);
		});

		values.certificates.forEach((certificate) => {
			formData.append(`certificates`, certificate.originFileObj);
		});

		appendArrayToFormData(formData, 'symptomIds', values.symptomIds);
		appendArrayToFormData(formData, 'languages', values.languages);
		appendArrayToFormData(formData, 'format', values.format);
		appendArrayToFormData(formData, 'techniqueIds', values.techniqueIds);
		appendArrayToFormData(
			formData,
			'therapyMethodIds',
			values.therapyMethodIds
		);
		appendArrayToFormData(
			formData,
			'consultationType',
			values.consultationType
		);
		appendValuesToFormData(formData, values);
		submit(formData);
	};

	const handleEdit = async (values: IPsychologistRegisterData) => {
		const formData = new FormData();

		if (values.photos?.fileList?.length > 0) {
			values.photos.fileList.forEach((file: UploadFile) => {
				formData.append('photos', file.originFileObj as Blob);
			});
		}

		if (values.certificates?.length > 0) {
			values.certificates.forEach((certificate) => {
				if (certificate.originFileObj) {
					formData.append('certificates', certificate.originFileObj);
				}
			});
		}

		appendArrayToFormData(formData, 'symptomIds', values.symptomIds);
		appendArrayToFormData(formData, 'languages', values.languages);
		appendArrayToFormData(formData, 'format', values.format);
		appendArrayToFormData(formData, 'techniqueIds', values.techniqueIds);
		appendArrayToFormData(
			formData,
			'therapyMethodIds',
			values.therapyMethodIds
		);
		formData.append('lgbt', String(values.lgbt));

		appendValuesToFormData(formData, values);

		editPsychologist(formData);
	};
	const handleChangeFile: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList);
	};
	const handlePostPhotoPsychologist = async (fileList: UploadFile[]) => {
		const formData = new FormData();
		if (fileList && fileList.length > 0) {
			fileList.forEach((file: UploadFile) => {
				formData.append('photos', file as unknown as Blob);
			});
		}

		await postPhotoPsychologist(formData);
	};

	const handlePostCertificatePsychologist = async (fileList: UploadFile[]) => {
		const formData = new FormData();
		if (fileList && fileList.length > 0) {
			fileList.forEach((file: UploadFile) => {
				formData.append('certificates', file as unknown as Blob);
			});
		}

		await postCertificatePsychologist(formData);
	};

	const handleEditEmail = async () => {
		const data = {
			email: email,
			сurrentPassword: сurrentPassword,
			password: password,
		};

		editEmail(data);
	};

	const handleCurrentPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCurrentPassword(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<div>
			<Layout className="layout">
				<Form
					name="register-form"
					className="form"
					onFinish={user?.accessToken ? handleEdit : handleSubmit}
					initialValues={user?.accessToken ? initialValues : undefined}
				>
					{user?.accessToken ? (
						<div>
							<Button
								className="form-edit-btn"
								htmlType="submit"
								onClick={() => handleEditEmail()}
							>
								Применить
							</Button>
							<Button
								onClick={handleCancelClick}
								className="form-edit-btn-grey"
							>
								Отменить изменения
							</Button>
						</div>
					) : (
						<Title level={3} className="form_title text">
							Регистрация
						</Title>
					)}
					<InformationText
						text=" Вся ниже указанная информация будет отображаться в вашей анкете
				психолога, кроме номера телефона и почты. Адрес, только при выборе
				работы оффлайн."
					/>

					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<label className="label">Почта</label>
							<Form.Item
								className="form-item"
								name="email"
								hasFeedback
								rules={[
									{
										required: !user?.accessToken,
										message: 'Пожалуйста, введите свой электронный адрес.',
									},
									{
										type: 'email',
										message: 'Ваш e-mail недействителен.',
									},
								]}
								validateStatus={
									errors?.errors?.find((error) => error.type === 'email')
										? 'error'
										: undefined
								}
								help={getErrorsBy('email')}
							>
								{user?.accessToken ? (
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
										defaultValue={user?.email}
										value={email}
										onChange={handleEmailChange}
									/>
								) : (
									<Input
										className="input--grey input"
										placeholder="example@gmail.com"
										size="small"
									/>
								)}
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							{user?.accessToken ? (
								<label className="label">Новый пароль</label>
							) : (
								<label className="label">Пароль</label>
							)}
							<Form.Item
								name="password"
								hasFeedback
								rules={[
									{
										required: !user?.accessToken,
										message: 'Пожалуйста, введите пароль.',
									},
									{
										min: 6,
										message: 'Пароль должен состоять минимум из 6 символов.',
									},
								]}
							>
								<Input.Password
									className="input--grey input"
									placeholder="Минимум 6 символов"
									autoComplete="on"
									value={password}
									onChange={handlePasswordChange}
									size="small"
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							{user?.accessToken ? (
								<label className="label">Старый пароль</label>
							) : (
								<label className="label">Повторите пароль</label>
							)}
							<Form.Item
								name="confirm"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: !user?.accessToken,
										message: 'Пожалуйста, подтвердите свой пароль!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!user?.accessToken) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('Неверный пароль'));
											} else {
												return Promise.resolve();
											}
										},
									}),
								]}
							>
								<Input.Password
									placeholder="Повторите пароль"
									className="input--grey input"
									autoComplete="on"
									size="small"
									value={сurrentPassword}
									onChange={handleCurrentPasswordChange}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Typography style={{ fontSize: 18 }} className="text">
						Личная информация
					</Typography>
					<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">ФИО</label>
							<Form.Item
								name="fullName"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите имя пользователя',
									},
								]}
								validateFirst={false}
							>
								{user?.accessToken && psychologist ? (
									<Input
										className="input--grey input"
										placeholder="Введите ФИО"
										size="small"
										defaultValue={psychologist.fullName}
									/>
								) : (
									<Input
										placeholder="Введите ФИО"
										className="input--grey input"
									/>
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							<label className="label">Город</label>
							<Form.Item
								name="cityId"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите хотя бы один город!',
									},
								]}
							>
								<Select
									placeholder="Выберите город"
									style={{ display: 'flex', alignItems: 'center' }}
									defaultValue={
										user?.accessToken && psychologist
											? `${psychologist.city.name}`
											: undefined
									}
								>
									{user?.accessToken
										? cities.map((city) => (
												<Select.Option key={city.id} value={city.id}>
													{city.name}
												</Select.Option>
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ))
										: cities.map((city) => (
												<Select.Option key={city.id} value={city.id}>
													{city.name}
												</Select.Option>
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ))}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							<label className="label">Пол</label>
							<Form.Item
								name="gender"
								rules={[
									{ required: !user?.accessToken, message: 'Выберите пол' },
								]}
							>
								<Select
									placeholder="Выберите пол"
									style={{ display: 'flex', alignItems: 'center' }}
									defaultValue={
										psychologist && user?.accessToken
											? psychologist?.gender
											: undefined
									}
								>
									<Option className="option" value="male">
										Мужской
									</Option>
									<Option className="option" value="female">
										Женский
									</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Дата рождения</label>
							<Form.Item
								name="birthday"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите дату рождения',
									},
								]}
							>
								{user?.accessToken ? (
									<Input
										className="input--grey input"
										placeholder="Введите дату"
										size="small"
										defaultValue={formattedBirthday}
									/>
								) : (
									<DatePicker placeholder="2023-12-01" />
								)}
							</Form.Item>
						</Col>
					</Row>

					<Typography style={{ fontSize: 18 }} className="text">
						Профессиональная информация
					</Typography>
					<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							<label className="label">Языки</label>
							<Form.Item
								name="languages"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите язык',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите язык"
									defaultValue={
										user?.accessToken ? psychologist?.languages : undefined
									}
								>
									<Option className="option" value="kazakh">
										Казахский
									</Option>
									<Option className="option" value="russian">
										Русский
									</Option>
									<Option className="option" value="english">
										Английский
									</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={6} xl={6}>
							<label className="label">Личная терапия (в годах)</label>
							<Form.Item
								name="selfTherapy"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите личную терапию',
									},
								]}
							>
								{user?.accessToken ? (
									<InputNumber
										className="input--grey input"
										placeholder="Введите дату"
										size="small"
										style={{ width: '100%' }}
										defaultValue={psychologist?.selfTherapy}
									/>
								) : (
									<InputNumber
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
									/>
								)}
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Психологические техники</label>
							<Form.Item
								name="techniqueIds"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите технику!',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите псих-кие техники"
									defaultValue={
										user?.accessToken &&
										psychologist?.techniques.map((technique) => technique.name)
									}
								>
									{techniques && techniques.length !== 0 ? (
										<>
											{techniques.map((technique, index) => (
												<Option
													key={index}
													value={technique.id}
													className="option"
												>
													{technique.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label">Стаж (в годах)</label>
							<Form.Item
								name="experienceYears"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите свой стаж работы!',
									},
								]}
							>
								{user?.accessToken ? (
									<InputNumber
										className="input--grey input"
										placeholder="Введите число"
										size="small"
										style={{ width: '100%' }}
										defaultValue={psychologist?.experienceYears}
									/>
								) : (
									<InputNumber
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
									/>
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label">Оплата за консультацию</label>
							<Form.Item
								name="cost"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите стоимость!',
									},
								]}
							>
								{user?.accessToken ? (
									<InputNumber
										prefix="KZT"
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
										defaultValue={psychologist?.cost}
									/>
								) : (
									<InputNumber
										prefix="KZT"
										placeholder="Введите число"
										className="input--grey input"
										style={{ width: '100%' }}
									/>
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Методы терапии</label>
							<Form.Item
								name="therapyMethodIds"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите методы!',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите методы терапии"
									defaultValue={
										user?.accessToken &&
										psychologist?.therapyMethods.map(
											(therapyMethods) => therapyMethods.name
										)
									}
								>
									{therapyMethods && therapyMethods.length !== 0 ? (
										<>
											{therapyMethods.map((therapyMethods, index) => (
												<Option
													key={index}
													value={therapyMethods.id}
													className="option"
												>
													{therapyMethods.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label label_info">
								<p>Работа с LGBT</p>
								<Alert
									title="Работа с LGBT"
									message="Выбирая в фильтр (Да), вы даете согласие на то, что люди из сообщества ЛГБТ могут обращаться к вам за помощью."
								>
									<img src={infoIcon} width={15} alt="Информация" />
								</Alert>
							</label>
							<Form.Item name="lgbt">
								<Select
									showSearch={false}
									style={{ display: 'flex', alignItems: 'center' }}
									defaultValue={
										user?.accessToken ? psychologist?.lgbt : undefined
									}
								>
									<Option value={false} className="option">
										Нет
									</Option>
									<Option value={true} className="option">
										Да
									</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label">Формат работы</label>
							<Form.Item
								name="format"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите формат приема',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите формат"
									defaultValue={
										user?.accessToken ? psychologist?.format : undefined
									}
								>
									<Option value="online" className="option">
										Онлайн
									</Option>
									<Option value="offline" className="option">
										Оффлайн
									</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Симптомы</label>
							<Form.Item
								name="symptomIds"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите симптомы!',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Выберите псих-кие техники"
									defaultValue={
										user?.accessToken &&
										psychologist?.symptoms.map((symptoms) => symptoms.name)
									}
								>
									{symptoms && symptoms.length !== 0 ? (
										<>
											{symptoms.map((symptoms, index) => (
												<Option
													key={index}
													value={symptoms.id}
													className="option"
												>
													{symptoms.name}
												</Option>
											))}
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label label_info">
								<p>Адрес</p>
								<Alert
									title="Запись на консультацию"
									message="Адрес вы указываете только при выборе консультации в формате офлайн (указывайте адрес, где будете проводить встречи с пациентом)."
								>
									<img src={infoIcon} width={15} alt="Информация" />
								</Alert>
							</label>
							<Form.Item name="address">
								{user?.accessToken ? (
									<>
										{psychologist?.address ? (
											<Input
												placeholder="ул. психолога, д.21"
												className="input--grey input"
												style={{ width: '100%' }}
												defaultValue={psychologist?.address}
											/>
										) : (
											<Input
												placeholder="ул. психолога, д.21"
												className="input--grey input"
												style={{ width: '100%' }}
												defaultValue={'Адрес отсутствует'}
											/>
										)}
									</>
								) : (
									<Input
										placeholder="ул. психолога, д.21"
										className="input--grey input"
										style={{ width: '100%' }}
									/>
								)}
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<label className="label">Вид консультации</label>
							<Form.Item
								name="consultationType"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите вид консультации',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Вид консультации"
									defaultValue={
										user?.accessToken
											? psychologist?.consultationType
											: undefined
									}
								>
									<Option value="solo" className="option">
										Индивидуальная
									</Option>
									<Option value="duo" className="option">
										Семейная
									</Option>
									<Option value="children" className="option">
										Детская
									</Option>
									<Option value="group" className="option">
										Групповая
									</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<label className="label">Специализация</label>
							<Form.Item
								name="education"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите специализацию',
									},
								]}
							>
								{user?.accessToken ? (
									<Input
										placeholder="Клинический психолог, MS. Psychology"
										className="input--grey input"
										style={{ width: '100%' }}
										defaultValue={psychologist?.education}
									/>
								) : (
									<Input
										placeholder="Клинический психолог, MS. Psychology"
										className="input--grey input"
										style={{ width: '100%' }}
									/>
								)}
							</Form.Item>
						</Col>

						<Col span={24}>
							<label className="label">О себе</label>
							<Form.Item
								name="description"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Введите данные о себе',
									},
								]}
							>
								{user?.accessToken ? (
									<Input.TextArea
										placeholder="Напишите о себе"
										className="input--grey input"
										defaultValue={psychologist?.description}
										style={{ height: '100px' }}
									/>
								) : (
									<Input.TextArea
										placeholder="Напишите о себе"
										className="input--grey input"
									/>
								)}
							</Form.Item>
						</Col>

						<Col span={24}>
							<label className="label">Видео</label>
							<Form.Item
								name="video"
								rules={[
									{
										type: 'url',
										message: 'Пожалуйста, введите корректную ссылку на видео',
									},
									{
										required: !user?.accessToken,
										message: 'Введите ссылку на видео',
									},
								]}
							>
								{user?.accessToken ? (
									<>
										{psychologist?.video ? (
											<Input
												placeholder="Вставьте ссылку из youtube"
												className="input--grey input"
												defaultValue={psychologist?.video}
											/>
										) : (
											<Input
												className="input--grey input"
												defaultValue="Видео отсутствует"
											/>
										)}
									</>
								) : (
									<Input
										placeholder="Вставьте ссылку из youtube"
										className="input--grey input"
									/>
								)}
							</Form.Item>
						</Col>
						<Col span={24} style={{ marginLeft: 10 }}>
							<label className="label">
								{user?.accessToken ? (
									<span>Фото (не более 3) </span>
								) : (
									<>
										<span>Фото </span> {fileList.length} <span> из 3</span>
									</>
								)}
							</label>
							<Form.Item
								className="photo-upload-form"
								name="photos"
								rules={[
									{
										required: !user?.accessToken,
										message: 'Выберите хотя бы одну фотографию!',
									},
								]}
							>
								{user?.accessToken ? (
									<>
										<div style={{ display: 'flex' }}>
											{dataPsychologist?.photos.map((photo, index) => (
												<div key={index} style={{ marginRight: 10 }}>
													{photo && photo.photo ? (
														<div className="photo-block">
															<img
																src={`http://localhost:8000/uploads/${photo.photo}`}
																alt={`Техника ${index + 1}`}
																style={{
																	width: '100px',
																	height: '100px',
																}}
															/>
															<Button
																onClick={() =>
																	onDeletePhotoPsychologist(photo.id)
																}
																className="photo-block-btn"
															>
																X
															</Button>
														</div>
													) : (
														<Typography.Text>
															Изображение отсутствует
														</Typography.Text>
													)}
												</div>
											))}
											<div>
												<Upload
													name="photos"
													listType="picture-card"
													fileList={fileList}
													onChange={handleChangeFile}
													beforeUpload={(_, fileList) => {
														handlePostPhotoPsychologist(fileList);
													}}
													onRemove={() => {
														return false;
													}}
												>
													{fileList.length >= 3 ? null : UploadButton}
												</Upload>
											</div>
										</div>
									</>
								) : (
									<>
										<Upload
											name="photos"
											listType="picture-card"
											fileList={fileList}
											onChange={handleChangeFile}
											beforeUpload={() => false}
										>
											{fileList.length >= 3 ? null : UploadButton}
										</Upload>
									</>
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<label className="label">Диплом, сертификаты</label>
							<Form.Item
								name="certificates"
								valuePropName="fileList"
								getValueFromEvent={(e) => {
									if (Array.isArray(e)) {
										return e;
									}
									return e && e.fileList;
								}}
								rules={[
									{
										required: !user?.accessToken,
										message: 'Загрузите диплом или сертификаты!',
									},
								]}
							>
								{user?.accessToken ? (
									<>
										<div style={{ display: 'flex' }}>
											{psychologist?.certificates.map((certificate, index) => (
												<div key={index} style={{ marginRight: 10 }}>
													{certificate && certificate.certificate ? (
														<div className="photo-block">
															<img
																src={`http://localhost:8000/uploads/${certificate.certificate}`}
																alt={`Сертификат ${index + 1}`}
																style={{
																	width: '100px',
																	height: '100px',
																}}
															/>
															<Button
																onClick={() =>
																	deleteCertificatesPsychologist(certificate.id)
																}
																className="photo-block-btn"
															>
																X
															</Button>
														</div>
													) : (
														<Typography.Text>
															Изображение отсутствует
														</Typography.Text>
													)}
												</div>
											))}
											<Upload
												name="certificates"
												multiple={true}
												listType="picture-card"
												fileList={certificateFileList}
												beforeUpload={async (_, fileList) => {
													await handlePostCertificatePsychologist(fileList);
												}}
												onChange={handleCertificateChange}
												accept=".jpg,.jpeg,.png"
											>
												{UploadButton}
											</Upload>
										</div>
									</>
								) : (
									<>
										<UploadInput
											name="certificates"
											multiple={true}
											fileList={certificateFileList}
											beforeUpload={() => false}
											onChange={handleCertificateChange}
											accept=".jpg,.jpeg,.png"
										/>
									</>
								)}
							</Form.Item>
						</Col>
					</Row>

					<Form.Item wrapperCol={{ span: 24 }}>
						{user?.accessToken ? null : (
							<>
								<Button className="button" htmlType="submit">
									Отправить на модерацию
								</Button>
								<AboutModerationModal />
							</>
						)}
					</Form.Item>
				</Form>
			</Layout>
		</div>
	);
};
