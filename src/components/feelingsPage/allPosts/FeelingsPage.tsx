import { useEffect, FC } from 'react';
import { Pagination } from 'antd';
import { IPost } from '../../../interfaces/IPost';
import './FeelingsPage.scss';
import PostCard from './postCard/PostCard';
import Empty from '../../ui/Empty/Empty';
import { useLocation, useNavigate } from 'react-router-dom';
import validateNumber from '../../../helpers/validateNumber';

interface IProps {
	posts: IPost[];
}

export const FeelingsPage: FC<IProps> = ({ posts }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const pageInQuery = new URLSearchParams(location.search).get('page');
	const currentPage = validateNumber(pageInQuery) ?? 1;

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	const postsPerPage = 6;
	const postsOnPage = posts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	const handlePageChange = (page: number) => {
		navigate(`${location.pathname}?page=${page}`);
	};

	if (!postsOnPage.length) return <Empty />;

	return (
		<div className="feelings-page">
			<div className="feelings-page__header">
				<h1 className="feelings-page__title">«чувства»</h1>
				<div className="feelings-page__description">
					<p className="feelings-page__description-title">
						наша жизнь это про то, что мы испытываем каждую минуту.
					</p>
					<p className="feelings-page__description-text">
						eжедневно человек не замечая, испытывает целую гамму чувств.
						cовершает действия - чтобы испытать какие-то чувства, достигает
						целей, побеждает, старается, закрывает первичные потребности с одной
						целью - испытать чувства. чувства - это и есть жизнь. физически
						человек ощущает их телом.
					</p>
				</div>
			</div>
			<div className="posts">
				<ul className="posts__list">
					{postsOnPage.map((post: IPost) => {
						return (
							<li key={post.id} className="posts__item">
								<PostCard post={post} linkPath={`/feelings/${post.id}`} />
							</li>
						);
					})}
				</ul>
				<div className="posts__pagination">
					<Pagination
						current={currentPage}
						pageSize={postsPerPage}
						total={posts.length}
						onChange={handlePageChange}
						size={window.innerWidth > 500 ? 'default' : 'small'}
						showLessItems
					/>
				</div>
			</div>
		</div>
	);
};
