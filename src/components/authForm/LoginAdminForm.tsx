import { Alert, Button, Form, Input, Layout, Typography } from 'antd';
import { useState } from 'react';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import styles from './AuthForm.module.scss';
import { IUserAdminLogin } from '../../interfaces/IUser.ts';
import formServerErrorHandler from '../../helpers/formServerErrorHandler.ts';

const { Title } = Typography;

type Props = {
	submit: (submitData: IUserAdminLogin) => void;
	serverFormErrors: ServerFormValidationResponse | null;
};

const LoginAdminForm = ({ submit, serverFormErrors }: Props) => {
	const [isChecked, setChecked] = useState(false);
	const [form] = Form.useForm();

	const formSubmitHandler = (userInputs: IUserAdminLogin) => {
		submit(userInputs);
	};

	return (
		<Layout className={styles.layout} style={{ height: '50svh' }}>
			<Form
				form={form}
				initialValues={{ remember: true }}
				onFinish={formSubmitHandler}
				autoComplete="on"
				className={styles.form}
				name="signin"
				layout="vertical"
			>
				<Title level={3} className={styles.title}>
					Вход
				</Title>
				{serverFormErrors && (
					<Alert
						className={styles.error}
						message={serverFormErrors?.message}
						type="error"
						closable
					/>
				)}

				<label htmlFor="name" className={styles.label}>
					Имя пользователя
				</label>
				<Form.Item
					name="username"
					hasFeedback
					className={styles.formItem}
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите имя пользователя.',
						},
						{
							type: 'string',
							message: 'Имя пользователя должно быть текстовым',
						},
					]}
					validateStatus={
						serverFormErrors?.errors?.find((error) => error.type === 'username')
							? 'error'
							: undefined
					}
					help={formServerErrorHandler(serverFormErrors, 'username')}
				>
					<Input
						className={styles.input}
						placeholder="Имя пользователя"
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
					validateStatus={
						serverFormErrors?.errors?.find((error) => error.type === 'username')
							? 'error'
							: undefined
					}
					help={formServerErrorHandler(serverFormErrors, 'password')}
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
			</Form>
		</Layout>
	);
};

export default LoginAdminForm;
