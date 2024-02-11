import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { registerUser } from '../../../features/user/userSlice.ts';
import { RootState } from '../../../store';
import RegisterForm from '../../../components/authForm/RegisterForm.tsx';
import { SubmitAuthData } from '../../../interfaces/SubmitAuthData.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
	role: 'patient' | 'psychologist';
}
function Register({ role }: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { registerError } = useAppSelector((state: RootState) => state.users);

	const submitUser = async (userData: SubmitAuthData) => {
		await dispatch(registerUser(userData))
			.unwrap()
			.then(() => {
				navigate('/auth/confirmation');
			})
			.catch((e) => e);
	};

	return (
		<>
			<RegisterForm errors={registerError} submit={submitUser} role={role} />
		</>
	);
}

export default Register;
