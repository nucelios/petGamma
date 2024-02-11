import { Button, Form, Input, Layout, Typography } from 'antd';
import styles from './AuthForm.module.scss';
import { IPasswordReset } from '../../interfaces/IUser';

const { Title } = Typography;

type Props = {
	resetPasswordMutation: (value: IPasswordReset) => void;
};
export const ResetPasswordForm = ({ resetPasswordMutation }: Props) => {
	const [form] = Form.useForm();

	const onFinish = (values: IPasswordReset) => {
		resetPasswordMutation(values);
		form.resetFields();
	};

	return (
		<Layout className={styles.layout} style={{ height: '50svh' }}>
			<Form
				form={form}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="on"
				className={styles.form}
				name="signin"
				layout="vertical"
			>
				<Title level={3} className={styles.title_reset_password}>
					Восстановление пароля
				</Title>

				<label htmlFor="name" className={styles.label}>
					Новый пароль
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

				<Button
					className={styles.button}
					type="primary"
					htmlType="submit"
					shape="round"
				>
					Отправить
				</Button>
			</Form>
		</Layout>
	);
};
