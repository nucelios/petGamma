import { Layout, Form, Input, Button, Typography, Alert } from 'antd';
import { useEffect, useState } from 'react';
import styles from './AuthForm.module.scss';
import { NavLink } from 'react-router-dom';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { SubmitAuthData } from '../../interfaces/SubmitAuthData.ts';
import formServerErrorHandler from '../../helpers/formServerErrorHandler.ts';

const { Title } = Typography;

type Props = {
	submit: (submitData: SubmitAuthData) => void;
	role: 'patient' | 'psychologist';
	errors: ServerFormValidationResponse | null;
};

const RegisterForm = ({ submit, role, errors }: Props) => {
	const [isChecked, setChecked] = useState(false);

	const [loginErrors, setLoginErrors] =
		useState<ServerFormValidationResponse | null>(null);

	useEffect(() => {
		setLoginErrors(errors);
	}, [errors]);

	const handleNavLinkClick = () => {
		setLoginErrors(null);
	};

	const onFinish = (userData: SubmitAuthData) => {
		const user = {
			...userData,
			role: role,
		};

		submit(user);
	};

	return (
		<Layout className={styles.layout}>
			<Form
				initialValues={{ remember: !isChecked }}
				onFinish={onFinish}
				autoComplete="off"
				className={styles.form}
				name="signin"
				layout="vertical"
			>
				<Title level={3} className={styles.title}>
					Регистрация
				</Title>
				{loginErrors && (
					<Alert
						className={styles.error}
						message={loginErrors?.message}
						type="error"
						closable
					/>
				)}
				<label htmlFor="name" className={styles.label}>
					Имя
				</label>
				<Form.Item
					name="name"
					className={styles.formItem}
					hasFeedback
					rules={[{ required: true, message: 'Пожалуйста, введите своё имя.' }]}
				>
					<Input
						id="name"
						className={styles.input}
						placeholder="Наиль"
						size="small"
					/>
				</Form.Item>

				<label htmlFor="name" className={styles.label}>
					Почта
				</label>
				<Form.Item
					name="email"
					hasFeedback
					className={styles.formItem}
					rules={[
						{
							required: true,
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
					help={formServerErrorHandler(errors, 'email')}
				>
					<Input
						className={styles.input}
						placeholder="example@gmail.com"
						size="small"
					/>
				</Form.Item>

				<label htmlFor="name" className={styles.label}>
					Пароль
				</label>
				<Form.Item
					name="password"
					className={styles.formItem}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите пароль.',
						},
						{
							min: 6,
							message: 'Пароль должен состоять минимум из 6 символов.',
						},
					]}
				>
					<Input.Password
						className={styles.input}
						placeholder="Минимум 6 символов"
						autoComplete="on"
						size="small"
					/>
				</Form.Item>

				<label className={styles.label}>Повторите пароль</label>
				<Form.Item
					name="confirm"
					className={styles.formItem}
					dependencies={['password']}
					hasFeedback
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Пожалуйста, подтвердите свой пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The new password that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password
						placeholder="Повторите пароль"
						className={styles.input}
						autoComplete="on"
						size="small"
					/>
				</Form.Item>

				<Form.Item
					className={styles.formItem}
					name="remember"
					valuePropName="checked"
				>
					<div className={styles.footer}>
						<div className={styles.formGroup}>
							<input
								checked={isChecked}
								onChange={(e) => setChecked(e.target.checked)}
								type="checkbox"
								id="rememberCheckbox"
							/>
							<label htmlFor="rememberCheckbox" />
							<NavLink
								className={styles.checkbox}
								to={{
									pathname: '/Confidentiality_policy.pdf',
								}}
								target="_blank"
							>
								Я согласен с политикой конфиденциальности
							</NavLink>
						</div>
						<div>
							<NavLink
								onClick={handleNavLinkClick}
								to={'/auth/recovery'}
								className={styles.link}
							>
								Забыл пароль?
							</NavLink>
						</div>
					</div>
				</Form.Item>

				<Button
					disabled={!isChecked}
					className={styles.button}
					type="primary"
					htmlType="submit"
					shape="round"
				>
					Зарегистрироваться
				</Button>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<NavLink
						onClick={handleNavLinkClick}
						to={'/auth/login/patient'}
						className={styles.typography}
					>
						Войти
					</NavLink>
				</Form.Item>
			</Form>
		</Layout>
	);
};

export default RegisterForm;
