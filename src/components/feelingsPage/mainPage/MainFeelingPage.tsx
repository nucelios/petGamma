import { Spin, Typography } from 'antd';
import { useGetAllPosts } from '../../../features/queryHooks/queryHooks';
import './MainFeelingPage.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../../interfaces/IPost';
import dayjs from 'dayjs';

export const MainFeelingPage = () => {
	const { data: allPosts = [], isPending } = useGetAllPosts();

	const publishedPosts = allPosts.filter(
		(post: IPost) => post.isPublish === true
	);

	const sortedPosts = publishedPosts.sort((a: IPost, b: IPost) => b.id - a.id);

	const lastFourPosts = sortedPosts.slice(0, 4);

	return (
		<div>
			{isPending ? (
				<Spin />
			) : allPosts && allPosts.length > 0 ? (
				<>
					<div className="mainPage-block">
						<Typography className="mainPage-block-title">«чувства»</Typography>
						<Link to="/feelings" className="mainPage-block-btn">
							&gt;
						</Link>
					</div>
					<div className="posts-list">
						{lastFourPosts.map((post: IPost) => (
							<Link
								to={`/feelings/${post.id}`}
								key={post.id}
								className="mainPage-block-item"
							>
								<div className="mainPage-block-item-text">
									<img
										src={`${import.meta.env.VITE_API_URL}/uploads/${
											post.image
										}`}
										alt={post.title}
										className="mainPage-block-item-text-image"
									/>
									<p className="mainPage-block-item-text-title">{post.title}</p>
									<p className="mainPage-block-item-text-date">
										{dayjs(post.publicationDate).format('DD MMMM YYYY года')}
									</p>
								</div>
							</Link>
						))}
					</div>
				</>
			) : null}
		</div>
	);
};
