import { Empty } from 'antd';
import { Image } from 'antd';
import styles from './PsychologistCard.module.scss';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { useState } from 'react';
import { useAppSelector } from '../../../../store/hooks.ts';
import { userSelect } from '../../../../features/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import Record from '../../../../containers/record/Record.tsx';
import { EnvironmentOutlined, WifiOutlined } from '@ant-design/icons';
import { translateLanguage } from '../../../../helpers/translateLanguageю.ts';

type PsychologistCardProps = {
	psychologist: IPsychologist;
};

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
	const [active, setActive] = useState(false);
	const navigate = useNavigate();
	const user = useAppSelector(userSelect);
	const handleClick = () => {
		if (!user || !user.patient) navigate('/auth/login/patient');
		setActive(true);
	};

	if (!psychologist || Object.keys(psychologist).length === 0) {
		return <Empty description="No psychologist details found" />;
	}

	return (
		<div className={styles.psychologist_profile_container}>
			<div className={styles.psychologist_profile_card}>
				<div className={styles.psychologist_photo_experienceYears}>
					{psychologist.photos && psychologist.photos.length > 0 && (
						<Image.PreviewGroup
							items={psychologist.photos
								.slice(0, 3)
								.map(
									(photo) =>
										`${import.meta.env.VITE_API_URL}/uploads/${photo.photo}`
								)}
						>
							{psychologist.photos[0] && (
								<Image
									src={`${import.meta.env.VITE_API_URL}/uploads/${
										psychologist.photos[0].photo
									}`}
									alt={psychologist.fullName}
									className={styles.img_photo}
								/>
							)}
						</Image.PreviewGroup>
					)}
					<div
						className={styles.experienceYears}
					>{`Опыт ${psychologist.experienceYears} лет`}</div>
				</div>

				<div className={styles.card_content}>
					<p className={styles.card_cost}>
						<strong className={styles.cost}>
							{psychologist.cost.toLocaleString()}тг
						</strong>
						/ сессия
					</p>

					{Array.isArray(psychologist.format) ? (
						<ul className={styles.card_format}>
							{psychologist.format.map((item) => (
								<li className={styles.format} key={item}>
									{item === 'online' ? (
										<span>
											<WifiOutlined className={styles.format_icon} />
											{item}
										</span>
									) : item === 'offline' ? (
										<span>
											<img
												className={styles.format_img}
												src="/routing.svg"
												alt="format"
											/>
											{item}
										</span>
									) : (
										item
									)}
								</li>
							))}
						</ul>
					) : (
						<p className={styles.format}>
							{psychologist.format === 'online' ? (
								<span>
									<WifiOutlined className={styles.format_icon} />
									{psychologist.format}
								</span>
							) : psychologist.format === 'offline' ? (
								<span>
									<img
										className={styles.format_img}
										src="/routing.svg"
										alt="format"
									/>
									{psychologist.format}
								</span>
							) : (
								psychologist.format
							)}
						</p>
					)}

					<div className={styles.card_city_country}>
						<p className={styles.city}>
							<EnvironmentOutlined className={styles.city_icon} />
							{psychologist.city.name}
						</p>
						<p className={styles.country}>{psychologist.city.country}</p>
					</div>

					{Array.isArray(psychologist.languages) ? (
						<ul className={styles.card_languages}>
							{psychologist.languages.map((item) => (
								<li className={styles.languages} key={item}>
									{translateLanguage(item)}
								</li>
							))}
						</ul>
					) : (
						<p className={styles.languages}>{psychologist.languages}</p>
					)}
					{psychologist.lgbt && (
						<p className={styles.lgbt}>Опыт работы с ЛГБТ</p>
					)}

					<button
						onClick={handleClick}
						disabled={user?.role === 'psychologist'}
						className={styles.card_button}
					>
						записаться
					</button>
					<Record
						psychologist={psychologist}
						active={active}
						setActive={setActive}
					/>
				</div>
			</div>
		</div>
	);
};

export default PsychologistCard;
