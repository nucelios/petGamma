import { Space } from 'antd';
import styles from './ArticlePage.module.scss';
import { ArticleCard } from '../articleCard/ArticleCard';
import { articles } from '../../../mocks/articles';

export const ArticlesList: React.FC = () => {
	return (
		<div className={styles.article_container}>
			<Space className={styles.article_list}>
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</Space>
		</div>
	);
};
