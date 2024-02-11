import { Typography } from 'antd';
import styles from './ArticleDetailed.module.scss';
import { articles } from '../../../mocks/articles';

const { Title, Paragraph } = Typography;

export const ArticleDetailed = ({ id }: { id: number }) => {
	const article = articles.find((article) => article.id === id);

	if (!article) {
		return null;
	}

	return (
		<div className={styles.article_detailed_container}>
			<div>
				<Title level={1} className={styles.article_detailed_title}>
					{article.title}
				</Title>
				<Paragraph className={styles.article_detailed_paragraph}>
					{article.content}
				</Paragraph>
			</div>

			<div className={styles.article_detailed_img}>
				<img alt={article.title} src={article.image} className={styles.img} />
			</div>
		</div>
	);
};
