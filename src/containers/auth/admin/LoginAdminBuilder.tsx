import { useNavigate } from 'react-router-dom';
import LoginAdminForm from '../../../components/authForm/LoginAdminForm.tsx';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { RootState } from '../../../store';
import { IUserAdminLogin } from '../../../interfaces/IUser.ts';
import { loginAdmin, resetErrors } from '../../../features/user/userSlice.ts';
import { useEffect } from 'react';

const LoginAdminBuilder = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loginError } = useAppSelector((state: RootState) => state.users);

	useEffect(() => {
		dispatch(resetErrors());
	}, [dispatch]);

	const submitUser = async (userData: IUserAdminLogin) => {
		await dispatch(loginAdmin(userData))
			.unwrap()
			.then(() => {
				navigate('/admin/psychologists');
			})
			.catch((e) => e);
	};

	return (
		<>
			<LoginAdminForm submit={submitUser} serverFormErrors={loginError} />
		</>
	);
};

export default LoginAdminBuilder;
