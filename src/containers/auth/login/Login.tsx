import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { loginUser } from '../../../features/user/userSlice.ts';
import { RootState } from '../../../store';
import { SubmitAuthData } from '../../../interfaces/SubmitAuthData.ts';
import LoginForm from '../../../components/authForm/LoginForm.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
	role: 'patient' | 'psychologist';
}
function Login({ role }: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loginError } = useAppSelector((state: RootState) => state.users);

	const submitUser = async (userData: SubmitAuthData) => {
		await dispatch(loginUser(userData))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => e);
	};

	return (
		<>
			<LoginForm errors={loginError} submit={submitUser} role={role} />
		</>
	);
}

export default Login;
