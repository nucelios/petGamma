import { Alert, Button, Form, Input, Layout, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { SubmitAuthData } from '../../interfaces/SubmitAuthData.ts';
import styles from './AuthForm.module.scss';
import { useAppDispatch } from '../../store/hooks.ts';
import { resetErrors } from '../../features/user/userSlice.ts';
import formServerErrorHandler from '../../helpers/formServerErrorHandler.ts';

const { Title } = Typography;

type Props = {
	submit: (submitData: SubmitAuthData) => void;
	role: 'patient' | 'psychologist';
	errors: ServerFormValidationResponse | null;
};

const LoginForm = ({ submit, role, errors }: Props) => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [isChecked, setChecked] = useState(false);
	const [loginErrors, setLoginErrors] =
		useState<ServerFormValidationResponse | null>(null);

	useEffect(() => {
		setLoginErrors(errors);
	}, [errors]);

	useEffect(() => {
		dispatch(resetErrors());
		form.resetFields();
	}, [form, role]);

	const onFinish = (userData: SubmitAuthData) => {
		const user = {
			...userData,
			role: role,
		};
		submit(user);
	};

	return (
		<Layout className={styles.layout} style={{ height: '50svh' }}>
			<Form
				key={role}
				form={form}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="on"
				className={styles.form}
				name="signin"
				layout="vertical"
			>
				<Title level={3} className={styles.title}>
					{role === 'psychologist' ? 'Вход для психолога ' : 'Вход'}
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
						autoComplete="on"
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
						placeholder="Пароль"
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
							<div className={styles.checkbox}>Запомнить меня</div>
						</div>
						<div>
							<NavLink to={'/auth/reset-forgot'} className={styles.link}>
								Забыл пароль?
							</NavLink>
						</div>
					</div>
				</Form.Item>

				<Button
					className={styles.button}
					type="primary"
					htmlType="submit"
					shape="round"
				>
					Войти
				</Button>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<NavLink to={`/auth/register/${role}`} className={styles.typography}>
						Зарегистрироваться
					</NavLink>
				</Form.Item>
			</Form>
		</Layout>
	);
};

export default LoginForm;
