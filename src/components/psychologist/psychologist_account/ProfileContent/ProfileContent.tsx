import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { RootState } from '../../../../store';
import {
	Layout,
	Row,
	Col,
	Typography,
	Form,
	Button,
	Input,
	Select,
	InputNumber,
} from 'antd';
import Alert from '../../../ui/Alert/Alert.tsx';
import infoIcon from '../../../../assets/icon/info-circle.svg';
import InformationText from '../../../ui/Text/InformationText.tsx';
import './ProfileContent.scss';
import { PsychologistForm } from '../../../psychologistForm/form/PsychologistForm.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useTechniqueQuery,
	useTherapyMethodQuery,
	useSymptomQuery,
	useCityQuery,
	usePostPsychologist,
	useGetOnePsychologist,
} from '../../../../features/queryHooks/queryHooks.ts';

const { Option } = Select;

export const Profile = () => {
	const user = useAppSelector((state: RootState) => state.users.userInfo);
	const [editing, setEditing] = useState(false);

	const { data: psychologist } = useGetOnePsychologist(
		Number(user?.psychologist?.id)
	);

	const handleEditClick = () => {
		setEditing(true);
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data: techniquesData } = useTechniqueQuery();
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useTherapyMethodQuery();
	const therapyMethod = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useSymptomQuery();
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useCityQuery();
	const cities = citiesData?.data ?? [];

	const { mutate: postPsychologist } = usePostPsychologist(navigate, dispatch);

	const handleRegister = async (data: FormData) => {
		postPsychologist(data);
	};

	function formatDateString(dateString: Date | string | undefined): string {
		if (!dateString) return '';

		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	const formattedBirthday = formatDateString(psychologist?.birthday);

	return (
		<>
			{psychologist ? (
				<>
					<div>
						<Layout className="layout">
							{editing ? (
								<PsychologistForm
									techniques={techniques}
									cities={cities}
									symptoms={symptoms}
									therapyMethods={therapyMethod}
									submit={handleRegister}
								/>
							) : (
								<Form name="register-form" className="form">
									<Button className="form-edit-btn" onClick={handleEditClick}>
										Редактировать
									</Button>
									<InformationText text=" Вся ниже указанная информация будет отображаться в вашей анкете психолога, кроме номера телефона и почты. Адрес, только при выборе работы оффлайн." />
									<Row gutter={16}>
										<Col xs={24} sm={24} md={12} lg={12} xl={12}>
											<label className="label">Почта</label>
											<Form.Item className="form-item" name="email" hasFeedback>
												<Input
													className="input--grey input"
													size="small"
													defaultValue={user?.email}
													readOnly
												/>
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={12} lg={6} xl={6}>
											<label className="label">Пароль</label>
											<Form.Item name="password" hasFeedback>
												<Input.Password
													className="input--grey input"
													autoComplete="on"
													size="small"
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={6} xl={6}>
											<label className="label">Повторите пароль</label>
											<Form.Item
												name="confirm"
												dependencies={['password']}
												hasFeedback
											>
												<Input.Password
													className="input--grey input"
													autoComplete="on"
													size="small"
													readOnly
												/>
											</Form.Item>
										</Col>
									</Row>

									<Typography style={{ fontSize: 18 }} className="text">
										Личная информация
									</Typography>
									<Row
										gutter={16}
										style={{ display: 'flex', alignItems: 'center' }}
									>
										<Col xs={24} sm={12} md={12} lg={12} xl={12}>
											<label className="label">ФИО</label>
											<Form.Item name="fullName">
												<Input
													className="input--grey input"
													size="small"
													defaultValue={`${psychologist?.fullName}`}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={6} xl={6}>
											<label className="label">Город</label>
											<Form.Item name="cityId">
												<Input
													className="input--grey input"
													size="small"
													defaultValue={`${psychologist?.city.name}`}
													readOnly
												/>
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={12} lg={6} xl={6}>
											<label className="label">Пол</label>
											<Form.Item name="gender">
												<Select
													placeholder="Выберите пол"
													style={{ display: 'flex', alignItems: 'center' }}
													defaultValue={psychologist?.gender}
													disabled
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
											<Form.Item name="birthday">
												<Input
													className="input--grey input"
													size="small"
													defaultValue={formattedBirthday}
													readOnly
												/>
											</Form.Item>
										</Col>
									</Row>

									<Typography style={{ fontSize: 18 }} className="text">
										Профессиональная информация
									</Typography>
									<Row
										gutter={16}
										style={{ display: 'flex', alignItems: 'center' }}
									>
										<Col xs={24} sm={12} md={12} lg={6} xl={6}>
											<label className="label">Языки</label>
											<Form.Item name="languages">
												<Select
													mode="multiple"
													placeholder="Выберите язык"
													defaultValue={
														user?.accessToken
															? psychologist?.languages
															: undefined
													}
													disabled
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
											<Form.Item name="selfTherapy">
												<Input
													className="input--grey input"
													size="small"
													defaultValue={psychologist?.selfTherapy}
													readOnly
												/>
											</Form.Item>
										</Col>
										<Col xs={24} sm={12} md={12} lg={12} xl={12}>
											<label className="label">Психологические техники</label>
											<Form.Item name="techniqueIds">
												{user?.psychologist?.techniques &&
												user?.psychologist?.techniques.length > 0 ? (
													<Select
														mode="multiple"
														showSearch={false}
														defaultValue={psychologist?.techniques.map(
															(technique) => technique.name
														)}
														disabled
													>
														{psychologist?.techniques.map(
															(technique, index) => (
																<Select.Option
																	key={index}
																	value={technique.name}
																>
																	{technique.name}
																</Select.Option>
															)
														)}
													</Select>
												) : (
													<Input
														className="input--grey input"
														size="small"
														defaultValue="Техники отсутствуют"
														readOnly
													/>
												)}
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={6}>
											<label className="label">Стаж (в годах)</label>
											<Form.Item name="experienceYears">
												<InputNumber
													className="input--grey input"
													style={{ width: '100%' }}
													defaultValue={psychologist?.experienceYears}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={6}>
											<label className="label">Оплата за консультацию</label>
											<Form.Item name="cost">
												<InputNumber
													prefix="KZT"
													className="input--grey input"
													style={{ width: '100%' }}
													defaultValue={psychologist?.cost}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={12}>
											<label className="label">Методы терапии</label>
											<Form.Item name="therapyMethodIds">
												{psychologist?.therapyMethods &&
												psychologist?.therapyMethods.length > 0 ? (
													<Select
														mode="multiple"
														showSearch={false}
														defaultValue={psychologist?.therapyMethods.map(
															(method) => method.name
														)}
														disabled
													>
														{psychologist?.therapyMethods.map(
															(method, index) => (
																<Select.Option key={index} value={method.name}>
																	{method.name}
																</Select.Option>
															)
														)}
													</Select>
												) : (
													<Typography.Text>Методы отсутствуют</Typography.Text>
												)}
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
												<Input
													className="input--grey input"
													size="small"
													defaultValue={psychologist?.lgbt ? 'Да' : 'Нет'}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={6}>
											<label className="label">Формат работы</label>
											<Form.Item name="format">
												<Select
													mode="multiple"
													placeholder="Выберите формат"
													defaultValue={psychologist?.format}
													disabled
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
											<Form.Item name="symptomIds">
												{psychologist?.symptoms &&
												psychologist?.symptoms.length > 0 ? (
													<Select
														mode="multiple"
														showSearch={false}
														defaultValue={psychologist?.symptoms.map(
															(symptom) => symptom.name
														)}
														disabled
													>
														{psychologist?.symptoms.map((symptom, index) => (
															<Select.Option key={index} value={symptom.name}>
																{symptom.name}
															</Select.Option>
														))}
													</Select>
												) : (
													<Typography.Text>
														Симптомы отсутствуют
													</Typography.Text>
												)}
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
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={6}>
											<label className="label">Вид консультации</label>
											<Form.Item name="consultationType">
												<Select
													mode="multiple"
													placeholder="Вид консультации"
													defaultValue={
														user?.accessToken
															? psychologist?.consultationType
															: undefined
													}
													disabled
												>
													<Option value="solo" className="option">
														Один человек
													</Option>
													<Option value="duo" className="option">
														Вдвоем
													</Option>
												</Select>
											</Form.Item>
										</Col>

										<Col xs={24} sm={12} md={12} lg={12} xl={12}>
											<label className="label">Специализация</label>
											<Form.Item name="education">
												<Input
													className="input--grey input"
													defaultValue={psychologist?.education}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col span={24}>
											<label className="label">О себе</label>
											<Form.Item name="description">
												<Input.TextArea
													className="input--grey input text-area"
													defaultValue={psychologist?.description}
													readOnly
												/>
											</Form.Item>
										</Col>

										<Col span={24}>
											<label className="label">Видео</label>
											<Form.Item name="video">
												<Input
													className="input--grey input"
													defaultValue={
														psychologist?.video
															? psychologist?.video
															: 'Видео отсутствует'
													}
													readOnly
												/>
											</Form.Item>
										</Col>
										<Col span={24} style={{ marginLeft: 2 }}>
											<label className="label">Фото</label>
											<Form.Item className="photo-upload-form" name="photos">
												<div style={{ display: 'flex' }}>
													{psychologist?.photos.map((photo, index) => (
														<div key={index} style={{ marginRight: 10 }}>
															{photo && photo.photo ? (
																<img
																	src={`${
																		import.meta.env.VITE_API_URL
																	}/uploads/${photo.photo}`}
																	alt={`Техника ${index + 1}`}
																	style={{
																		width: '100px',
																		height: '100px',
																	}}
																/>
															) : (
																<Typography.Text>
																	Изображение отсутствует
																</Typography.Text>
															)}
														</div>
													))}
												</div>
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
											>
												<div style={{ display: 'flex' }}>
													{psychologist?.certificates.map(
														(certificate, index) => (
															<div key={index} style={{ marginRight: 10 }}>
																{certificate && certificate.certificate ? (
																	<img
																		src={`${
																			import.meta.env.VITE_API_URL
																		}/uploads/${certificate.certificate}`}
																		alt={`Техника ${index + 1}`}
																		style={{
																			width: '100px',
																			height: '100px',
																		}}
																	/>
																) : (
																	<Typography.Text>
																		Сертификат отсутствует
																	</Typography.Text>
																)}
															</div>
														)
													)}
												</div>
											</Form.Item>
										</Col>
									</Row>
								</Form>
							)}
						</Layout>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};
