import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordForm } from '../../../components/authForm/ResetPasswordForm.tsx';
import { useResetPassword } from '../../../features/queryHooks/queryHooks.ts';

const ResetPassword = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');
	const { mutate: resetPasswordMutation } = useResetPassword(token, navigate);

	return <ResetPasswordForm resetPasswordMutation={resetPasswordMutation} />;
};

export default ResetPassword;
