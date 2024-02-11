import { Alert, Spin } from 'antd';
import { useGetOneFeeling } from '../../features/queryHooks/queryHooks';
import { useParams } from 'react-router-dom';
import { SingleFeelingsPage } from '../../components/feelingsPage/singlePosts/SingleFeelingsPage';
import validateNumber from '../../helpers/validateNumber';

const FullPostInformation = () => {
	const id = validateNumber(useParams().id);
	const { data: post, isPending, error } = useGetOneFeeling(id ?? 0);

	if (isPending) return <Spin fullscreen />;

	if (error)
		return (
			<Alert message={error.response?.data.message} type="error" closable />
		);

	return <SingleFeelingsPage post={post} />;
};

export default FullPostInformation;
