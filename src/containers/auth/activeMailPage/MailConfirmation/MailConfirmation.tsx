import { Typography } from 'antd';
import styles from './ActiveMailPage.module.scss';
import { useAppSelector } from '../../../../store/hooks.ts';
import { RootState } from '../../../../store/index.ts';

const { Title, Paragraph } = Typography;

export const MailConfirmation: React.FC = () => {
	const email = useAppSelector(
		(state: RootState) => state.users.userInfo?.email
	);

	return (
		<div
			className={styles.container_mail_confirmation}
			style={{ height: '50svh' }}
		>
			<div className={styles.block_mail_confirmation}>
				<Title className={styles.title_mail_confirmation} level={2}>
					Подтверждение почты
				</Title>
				<Paragraph className={styles.open_mail_confirmation} key="1">
					Перейдите по ссылке из почты
				</Paragraph>
				<Paragraph className={styles.text_mail_confirmation} key="2">
					Мы отправили ссылку для входа на {email}
				</Paragraph>
				<img src="/Mail-rafiki_1.png" alt="Mail-rafiki" key="3" />
				<Paragraph className={styles.support_mail_confirmation} key="4">
					Если письмо не пришло, свяжитесь с нами через почту {''}
					<a href="mailto:support@gmail.com">support@gmail.com</a>
				</Paragraph>
			</div>
		</div>
	);
};
