import styles from './BusinessPage.module.scss';
import heart_man from '../../assets/icon/heart_man.svg';
import person from '../../assets/icon/person.svg';
import heart_and_hand from '../../assets/icon/heart_and_hand.svg';
import flower from '../../assets/icon/flower.svg';
import cloud from '../../assets/icon/cloud.svg';
import { useState } from 'react';
import { Button, Modal } from 'antd';

export const BusinessPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.business_page_container_main}>
			<div className={styles.business_page_text_main_container}>
				<div>
					<h1 className={styles.business_page_text_title}>
						Независимая поддержка ваших сотрудников
					</h1>
					<p className={styles.business_page_text_item}>
						идивидуальный подбор программы поддержки сотрудников вашей компании
					</p>
				</div>
				<div>
					<img
						className={styles.business_page_img}
						src="/man_with_laptop_1.png"
						alt="man_with_laptop_1"
					/>
				</div>
			</div>
			<div className={styles.business_page_container_input}>
				<div className={styles.business_page_container_input_item}>
					<div>
						<p className={styles.business_page_input_text}>
							Корпоративный e-mail
						</p>
						<input
							className={styles.business_page_input_corporate_email}
							type="text"
							name="corporateEmail"
						/>
					</div>
					<div>
						<p className={styles.business_page_input_text}>Сотрудники</p>
						<input
							className={styles.business_page_input_employees}
							type="text"
							name="employees"
						/>
					</div>
					<div>
						<p className={styles.business_page_input_text}>Телефон</p>
						<input
							className={styles.business_page_input_phone}
							type="text"
							name="phone"
						/>
					</div>
					<div>
						<p className={styles.business_page_input_text}>Контактное лицо</p>
						<input
							className={styles.business_page_input_contact_person}
							type="text"
							name="contactPerson"
						/>
					</div>
					<div>
						<p className={styles.business_page_input_text}>Компания</p>
						<input
							className={styles.business_page_input_company}
							type="text"
							name="company"
						/>
					</div>
					<Button className={styles.business_page_input_button_laptop}>
						Оставить заявку
					</Button>
				</div>
				<Button
					type="primary"
					onClick={showModal}
					className={styles.business_page_input_button_mobail}
				>
					Оставить заявку
				</Button>

				<Modal
					title="Данные для записи"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Отправить"
					className={styles.business_page_modal}
				>
					<div className={styles.business_page_container_input}>
						<div>
							<p className={styles.business_page_input_text}>
								Корпоративный e-mail
							</p>
							<input
								className={styles.business_page_input}
								type="text"
								name="corporateEmail"
							/>
						</div>
						<div>
							<p className={styles.business_page_input_text}>Сотрудники</p>
							<input
								className={styles.business_page_input}
								type="text"
								name="employees"
							/>
						</div>
						<div>
							<p className={styles.business_page_input_text}>Телефон</p>
							<input
								className={styles.business_page_input}
								type="text"
								name="phone"
							/>
						</div>
						<div>
							<p className={styles.business_page_input_text}>Контактное лицо</p>
							<input
								className={styles.business_page_input}
								type="text"
								name="contactPerson"
							/>
						</div>
						<div>
							<p className={styles.business_page_input_text}>Компания</p>
							<input
								className={styles.business_page_input}
								type="text"
								name="company"
							/>
						</div>
					</div>
				</Modal>
			</div>
			<div className={styles.business_page_corporate_psychologist_container}>
				<div className={styles.business_page_corporate_psychologist}>
					<h2 className={styles.business_page_title}>
						зачем бизнесу корпоративный психолог?
					</h2>
					<div
						className={
							styles.business_page_corporate_psychologist_image_mobail_container
						}
					>
						<img
							className={
								styles.business_page_corporate_psychologist_image_mobail
							}
							src="/heart_and_hand.png"
							alt="heart_and_hand"
						/>
					</div>

					<div className={styles.business_page_corporate_psychologist_text}>
						<p
							className={styles.business_page_corporate_psychologist_text_item}
						>
							Согласно опросу издания Huffpost, проведённому среди психологов,
							чаще всего люди на сеансах обсуждают вопросы взаимоотношений,
							тревожность и баланс между личной жизнью и работой. Отсутствие
							баланса, а также неумение правильно выстроить его часто приводят к
							профессиональному выгоранию.
						</p>
						<p
							className={styles.business_page_corporate_psychologist_text_item}
						>
							По результатам международного исследования Института Гэллапа 23%
							сотрудников регулярно испытывают симптомы выгорания, а 44% — время
							от времени.
						</p>
					</div>
				</div>
				<img
					className={styles.business_page_corporate_psychologist_image_laptop}
					src="/heart_and_hand.png"
					alt="heart_and_hand"
				/>
			</div>
			<div className={styles.business_page_container_text_mental_health}>
				<h3 className={styles.business_page_text_mental_health}>
					забота о ментальном здоровье сотрудников способна повысить
					продуктивность на 39% и снизить количество больничных
				</h3>
			</div>
			<div className={styles.business_page_container_psychologists_help}>
				<h2 className={styles.business_page_title}>психологи помогают</h2>
				<div className={styles.business_page_container_psychologists_help_item}>
					<div className={styles.business_page_item}>
						<img
							className={styles.business_page_container_psychologists_image}
							src={heart_man}
							alt={'heart_man'}
						/>
						<h4 className={styles.business_page_container_psychologists_title}>
							снизить уровень напряжённости в коллективе
						</h4>
						<p className={styles.business_page_container_psychologists_text}>
							корпоративный психолог может помочь решить конфликты и выявить их
							причины на сессиях
						</p>
					</div>
					<div className={styles.business_page_item}>
						<img
							className={styles.business_page_container_psychologists_image}
							src={person}
							alt={'person'}
						/>
						<h4 className={styles.business_page_container_psychologists_title}>
							понять, почему сотрудники увольняются
						</h4>
						<p className={styles.business_page_container_psychologists_text}>
							эмпатичные терапевты бережливо помогут понять себя и причины
						</p>
					</div>
					<div className={styles.business_page_item}>
						<img
							className={styles.business_page_container_psychologists_image}
							src={flower}
							alt={'flower'}
						/>
						<h4 className={styles.business_page_container_psychologists_title}>
							определить причины низкой лояльности команды
						</h4>
						<p className={styles.business_page_container_psychologists_text}>
							специалисты сервиса могут помочь выявить основные причины
							недовольства
						</p>
					</div>

					<div className={styles.business_page_item}>
						<img
							className={styles.business_page_container_psychologists_image}
							src={heart_and_hand}
							alt={'heart_and_hand'}
						/>
						<h4 className={styles.business_page_container_psychologists_title}>
							предотвратить подавленную тревогу или агрессию
						</h4>
						<p className={styles.business_page_container_psychologists_text}>
							поддержка терапевта помогает справиться с тревожностью и другими
							сильными эмоциями
						</p>
					</div>
					<div className={styles.business_page_item}>
						<img
							className={styles.business_page_container_psychologists_image}
							src={cloud}
							alt={'cloud'}
						/>
						<h4 className={styles.business_page_container_psychologists_title}>
							справиться с неопределённостью в турбулентные времена сотрудникам
						</h4>
						<p className={styles.business_page_container_psychologists_text}>
							в периоды неопределённости сотрудникам нужна ментальная поддержка,
							чтобы снизить стресс
						</p>
					</div>
				</div>
			</div>
			<div className={styles.business_page_work}>
				<h2 className={styles.business_page_title}>как мы работаем?</h2>
				<div className={styles.business_page_item_work_container}>
					<div className={styles.business_page_item_work_hover_one}>
						<div className={styles.business_page_work_title_container}>
							<h4 className={styles.business_page_work_title}>шаг 1</h4>
							<p className={styles.business_page_work_under_the_title}>
								Вы оставляете заявку на сайте
							</p>
						</div>

						<h5 className={styles.business_page_work_text}>
							Нам нужны только ваши контакты, название и размер компании. Мы
							ответим в тот же день.
						</h5>
					</div>
					<div className={styles.business_page_item_work_hover_two}>
						<div className={styles.business_page_work_title_container}>
							<h4 className={styles.business_page_work_title}>шаг 2</h4>
							<p className={styles.business_page_work_under_the_title}>
								Мы предлагаем варианты работы
							</p>
						</div>

						<h5 className={styles.business_page_work_text}>
							Учитываем вашу ситуацию. Можно ограничить бюджет сессии и выбрать,
							сколько сессий оплачивать.
						</h5>
					</div>
					<div className={styles.business_page_item_work_hover_three}>
						<div className={styles.business_page_work_title_container}>
							<h4 className={styles.business_page_work_title}>шаг 3</h4>
							<p className={styles.business_page_work_under_the_title}>
								Сотрудники выбирают терапевта
							</p>
						</div>

						<h5 className={styles.business_page_work_text}>
							В каталоге будут только те специалисты, которые подходят вам по
							бюджету и другим характеристикам. Каждый сотрудник сможет выбрать
							терапевта под свой запрос. психолог разбирается в задаче.
							специалисту надо понять, этичен ли запрос и способен ли он помочь.
						</h5>
					</div>
					<div className={styles.business_page_item_work_hover_four}>
						<div className={styles.business_page_work_title_container}>
							<h4 className={styles.business_page_work_title}>шаг 4</h4>
							<p className={styles.business_page_work_under_the_title}>
								Начинаем терапию
							</p>
						</div>

						<h5 className={styles.business_page_work_text}>
							психолог диагностирует ситуацию, чтобы понять проблему. психолог
							предлагает свое видение ситуации и варианты ее урегулирования.
						</h5>
					</div>
				</div>
			</div>
			<div className={styles.business_page_frequent_requests}>
				<h2 className={styles.business_page_title}>частые запросы </h2>
				<div className={styles.business_page_frequent_requests_container}>
					<div
						className={styles.business_page_frequent_requests_container_text}
					>
						<h4 className={styles.business_page_frequent_requests_title}>
							эмоциональное выгорание
						</h4>
						<p className={styles.business_page_frequent_requests_text}>
							корпоративный психолог поможет в нужный момент предиктивным
							методом справиться с выгоранием сотрудникам.
						</p>
						<h4 className={styles.business_page_frequent_requests_title}>
							решение конфликтов
						</h4>
						<p className={styles.business_page_frequent_requests_text}>
							часто сотрудникам необходимы медиаторы, специалисты, которые
							помогают решить конфликты и улучшить общий эмоциоанльный фон и
							взаимоотношения между командами
						</p>
						<h4 className={styles.business_page_frequent_requests_title}>
							корпоративный психолог
						</h4>
						<p className={styles.business_page_frequent_requests_text}>
							сотрудники могут выбирать психолога под свой запрос пользуясь
							фильтрами. это гарантия заботы о ментальном здоровье коллектива
						</p>
						<h4 className={styles.business_page_frequent_requests_title}>
							работа с целеполаганием и эффективностью
						</h4>
						<p className={styles.business_page_frequent_requests_text}>
							психологи сервиса могут помочь с карьерными целями, сотрудникам с
							опытом работы, и помогут с проф.ориентацией сотрудникам в начале
							карьеры. это может повлиять на общую текучесть кадров.
						</p>
						<Button
							type="primary"
							onClick={showModal}
							className={styles.business_page_frequent_requests_button}
						>
							оставить заявку
						</Button>
					</div>
					<div>
						<img
							className={styles.business_page_img__frequent}
							src="/man_with_laptop_2.png"
							alt="man_with_laptop_2"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
