import React from 'react';
import { Card } from 'antd';
import styles from './ArticleCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { IArticle } from '../../../interfaces/IArticle';

const { Meta } = Card;

interface ArticleCardProps {
	article: IArticle;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
	const navigate = useNavigate();
	const { title, content, image } = article;
	const maxContentLength = 150;
	const truncatedContent =
		content.length > maxContentLength
			? `${content.slice(0, maxContentLength)}...`
			: content;

	return (
		<Card
			className={styles.article_card}
			onClick={() => navigate(`/articles/${article.id}`)}
			cover={
				<div className={styles.article_img}>
					<img alt={title} src={image} className={styles.img} />
				</div>
			}
		>
			<Meta title={title} description={truncatedContent} />
		</Card>
	);
};
