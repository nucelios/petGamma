import './PostCard.scss';
import { Link } from 'react-router-dom';
import { IPost } from '../../../../interfaces/IPost';
import { FC } from 'react';
import convertDate from '../../../../helpers/convertDate';

interface IProps {
	post: IPost;
	linkPath: string;
}

const PostCard: FC<IProps> = ({ post, linkPath }) => {
	const imageRootUrl: string = import.meta.env.VITE_API_URL;
	const publicationDate: string = post.publicationDate
		? convertDate(post.publicationDate)
		: 'Пост не опубликован';

	return (
		<Link to={linkPath} className="post-card">
			<div className="post-card__inner">
				<img
					src={`${imageRootUrl}/uploads/${post.image}`}
					alt={post.title}
					className="post-card__image"
				/>
				<h3 className="post-card__title">{post.title}</h3>
				<p className="post-card__date">{publicationDate}</p>
				<p className="post-card__description">
					{post.description.replace(/<[^>]*>|&nbsp;/g, '')}
				</p>
			</div>
		</Link>
	);
};

export default PostCard;
