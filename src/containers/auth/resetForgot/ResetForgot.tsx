import { useForgotPassword } from '../../../features/queryHooks/queryHooks.ts';
import ResetForgotForm from '../../../components/authForm/ResetForgotForm.tsx';

const ResetForgot = () => {
	const { mutate: postForgotPassword, error } = useForgotPassword();

	return (
		<ResetForgotForm postForgotPassword={postForgotPassword} error={error} />
	);
};

export default ResetForgot;
