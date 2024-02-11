import { Spin } from 'antd';
import { FeelingsPage } from '../../components/feelingsPage/allPosts/FeelingsPage';
import { useGetAllPosts } from '../../features/queryHooks/queryHooks';

export const Feelings = () => {
	const { data: posts = [], isPending } = useGetAllPosts();

	if (isPending) return <Spin fullscreen />;

	return <FeelingsPage posts={posts} />;
};
