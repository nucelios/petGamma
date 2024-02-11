import { NavLink } from 'react-router-dom';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
	return (
		<>
			<div className={styles['container-404']}>
				<img
					className={styles['img-404']}
					src="https://silverweb.by/wp-content/uploads/2023/08/404.png"
					alt="404-Cat"
				/>
				<h1 className={styles['header-404']}>Ой! Страница не найдена</h1>
				<p className={styles['text-404']}>
					По данному адресу ничего не найдено.
				</p>
				<NavLink className={styles['link-404']} to={'/'}>
					Вернуться на главную
				</NavLink>
			</div>
		</>
	);
};
