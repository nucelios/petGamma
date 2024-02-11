import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import './SingleFeelingsPage.scss';
import { IPost } from '../../../interfaces/IPost';
import { FC } from 'react';
import Empty from '../../ui/Empty/Empty';
import convertDate from '../../../helpers/convertDate';

interface Props {
	post: IPost | undefined;
}

export const SingleFeelingsPage: FC<Props> = ({ post }) => {
	const imageRootUrl: string = import.meta.env.VITE_API_URL;

	if (!post) return <Empty />;

	const postText: string = post.description.replace(/<[^>]*>|&nbsp;/g, '');
	const timeForRead: number = Math.ceil(postText.length / 1200);
	const publicationDate: string = post.publicationDate
		? convertDate(post.publicationDate)
		: 'Пост не опубликован';

	return (
		<>
			<div className="single-post-page">
				<div className="single-post-page__header">
					<h1 className="single-post-page__title">{post.title}</h1>
					<div className="single-post-page__meta">
						<p className="single-post-page__date">{publicationDate}</p>
						<p className="single-post-page__time-for-read">{`${timeForRead} мин`}</p>
					</div>
				</div>
				<div className="single-post-page__body">
					<img
						src={`${imageRootUrl}/uploads/${post.image}`}
						alt={post.title}
						className="single-post-page__image"
					/>
					<div className="single-post-page__text">
						<FroalaEditorView model={post.description} />
					</div>
				</div>
			</div>
		</>
	);
};
