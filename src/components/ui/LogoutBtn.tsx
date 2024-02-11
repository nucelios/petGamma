import { logoutUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};
const LogoutBtn = ({ children }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const logoutHandler = () => {
		dispatch(logoutUser());
		navigate('/');
		message.success('Вы успешно вышли с учетной записи!');
	};

	return (
		<div
			onClick={logoutHandler}
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: '10px',
			}}
		>
			{children}
			<div>Выйти</div>
		</div>
	);
};

export default LogoutBtn;
