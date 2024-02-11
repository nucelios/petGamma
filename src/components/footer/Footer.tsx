import styles from './Footer.module.scss';
import logo from '../../assets/icon/logo.svg';
import instagram from '../../assets/icon/instagram.svg';
import linkedin from '../../assets/icon/linkedin.svg';
import telegram from '../../assets/icon/telegram.svg';
import whatsapp from '../../assets/icon/whatsapp.svg';
import arrow_circle_right from '../../assets/icon/arrow_circle_right.svg';
import { NavLink } from 'react-router-dom';

export const FooterMenu = () => {
	return (
		<div className={styles.footer_container_mail}>
			<img src={logo} alt={'logo'} className={styles.logo} />
			<div className={styles.footer_container_item_block}>
				<div className={styles.footer_text}>
					<p className={styles.footer_text_item}>
						это платформа по заботе о ментальном здоровье и сервис по подбору
						психолога. здесь помогают справиться с сильными переживаниями,
						тревогой и любить себя. сервис разработан психологами, предлагает
						готовые терапевтические решения от профессиональных психотерапевтов
						для самостоятельного поддержания психо-эмоционального здоровья.
					</p>
				</div>
				<div className={styles.footer_container_item_link}>
					<div className={styles.footer_container_item}>
						<h2 className={styles.footer_item_title}>продукт</h2>
						<a className={styles.footer_item_link} href="/#services">
							о сервисе
						</a>
						<a className={styles.footer_item_link} href="#">
							психологам
						</a>
						<a className={styles.footer_item_link} href="#">
							как это работает?
						</a>
					</div>
					<div className={styles.footer_container_item}>
						<h2 className={styles.footer_item_title}>для тебя</h2>

						<NavLink className={styles.footer_item_link} to={'/psychologists'}>
							психологи
						</NavLink>
						<a className={styles.footer_item_link} href="#">
							соло-курсы
						</a>
						<a className={styles.footer_item_link} href="#">
							мессенджер-сессия
						</a>
					</div>
					<div className={styles.footer_container_item}>
						<h2 className={styles.footer_item_title}>для компаний</h2>
						<a className={styles.footer_item_link} href="#">
							эмоциональное выгорание
						</a>
						<a className={styles.footer_item_link} href="#">
							решение конфликтов
						</a>
						<a className={styles.footer_item_link} href="/#busines">
							корпоративный психолог
						</a>
					</div>
					<div className={styles.footer_container_item}>
						<h2 className={styles.footer_item_title}>для связи</h2>
						<a className={styles.footer_item_link} href="#">
							контакты
						</a>
						<a className={styles.footer_item_link} href="tel:+71234567890">
							+7 123 456 78 90
						</a>
						<a
							className={styles.footer_item_link}
							href="mailto:gamma@gmail.com"
						>
							gamma@gmail.com
						</a>
						<a className={styles.footer_item_link} href="#">
							телефоны доверия
						</a>
					</div>
				</div>
			</div>
			<div className={styles.footer_container_input_social_media}>
				<div className={styles.footer_container_input}>
					<p className={styles.footer_container_input_text}>
						подписаться на рассылки
					</p>
					<div className={styles.input_container}>
						<input type="email" placeholder="email" />
						<img
							src={arrow_circle_right}
							alt={'arrow_circle_right'}
							className={styles.arrow_circle_right}
						/>
					</div>
				</div>
				<div className={styles.footer_container_social_media}>
					<a href="#">
						<img src={whatsapp} alt={'whatsapp'} className={styles.whatsapp} />
					</a>
					<a href="#">
						<img src={telegram} alt={'telegram'} className={styles.telegram} />
					</a>
					<a href="#">
						<img src={linkedin} alt={'linkedin'} className={styles.linkedin} />
					</a>
					<a href="#">
						<img
							src={instagram}
							alt={'instagram'}
							className={styles.instagram}
						/>
					</a>
				</div>
			</div>
			<div className={styles.footer_container_rules}>
				<p className={styles.footer_rules_text}>
					@2024 Gamma. Все права защищены
				</p>
				<NavLink
					className={styles.footer_rules_text}
					to={{
						pathname: '/Confidentiality_policy.pdf',
					}}
					target="_blank"
				>
					Политика конденфициальности
				</NavLink>
				<NavLink
					className={styles.footer_rules_text}
					to={{
						pathname: '/Public_offer.pdf',
					}}
					target="_blank"
				>
					Условия пользования сайтом
				</NavLink>
			</div>
		</div>
	);
};
