import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ActivePage.module.scss';
import { activateEmail } from '../../../../features/user/userSlice.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';

export const ActivePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const role = new URLSearchParams(location.search).get('role');
	useEffect(() => {
		dispatch(activateEmail({ id, role }));

		const confirmationTimeout = setTimeout(() => {
			redirectToHome();
		}, 5000);

		return () => clearTimeout(confirmationTimeout);
	}, [id]);

	const redirectToHome = () => {
		navigate('/');
	};

	return (
		<div
			className={styles.container_mail_confirmation}
			style={{ height: '50svh' }}
		>
			<div className={styles.block_mail_confirmation}>
				<h1 className={styles.title}>Поздравляем</h1>
				<p className={styles.text}>Вы успешно прошли верификацию</p>
				<img
					className={styles.image}
					src="/man_with_a_laptop.png"
					alt="man_with_a_laptop"
				/>
			</div>
		</div>
	);
};
