import { Empty, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './PsychologistProfileContent.module.scss';
import { IPsychologist } from '../../../../interfaces/IPsychologist';
import { ISymptom } from '../../../../interfaces/ISymptom';
import { ITechnique } from '../../../../interfaces/ITechnique';
import { ITherapyMethod } from '../../../../interfaces/ITherapyMethod';
import YouTube, { YouTubeProps } from 'react-youtube';
import youtubeVideoId from 'youtube-video-id';
import { Image } from 'antd';
import { useAppSelector } from '../../../../store/hooks';
import { useState } from 'react';

type PsychologistProfileContentProps = {
	psychologist: IPsychologist;
	switchFavorite?: (id: number) => boolean;
};

const PsychologistProfileContent = ({
	psychologist,
	switchFavorite,
}: PsychologistProfileContentProps) => {
	const authUser = useAppSelector((state) => state.users.userInfo);
	const [showVideo, setShowVideo] = useState(false);

	if (!psychologist || Object.keys(psychologist).length === 0) {
		return <Empty description="No psychologist details found" />;
	}

	const opts: YouTubeProps['opts'] = {
		width: '100%',
		height: '400px',
		playerVars: {
			autoplay: 1,
		},
	};

	const videoId = psychologist.video
		? youtubeVideoId(psychologist.video)
		: null;

	const changeHeart = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();

		if (switchFavorite === undefined) return;

		const isSwitched = switchFavorite(psychologist.id);
		if (!isSwitched) return;

		if (!psychologist.isFavorite)
			message.success('Психолог был успешно Добавлен в список избранных.');
		else message.success('Психолог был успешно удален из списка избранных.');

		psychologist.isFavorite = !psychologist.isFavorite;
	};

	const handleImageClick = () => {
		setShowVideo(!showVideo);
	};

	return (
		<div className={styles.psychologist_profile_content}>
			{authUser?.role === 'patient' && switchFavorite && (
				<div className={styles.heartContainer}>
					{psychologist.isFavorite ? (
						<span className={styles.heart}>
							<HeartFilled style={{ color: 'red' }} onClick={changeHeart} />
						</span>
					) : (
						<span className={styles.heart}>
							<HeartOutlined onClick={changeHeart} />
						</span>
					)}
				</div>
			)}
			<h2 className={styles.title}>{psychologist.fullName}</h2>
			<p className={styles.education}>{psychologist.education}</p>
			<h5 className={styles.about_me}>о себе</h5>
			<p className={styles.description}>{psychologist.description}</p>
			{psychologist.therapyMethods &&
				psychologist.therapyMethods.length > 0 && (
					<>
						<h5 className={styles.title_therapyMethod}>методы терапии</h5>
						<ul className={styles.container_therapyMethod}>
							{psychologist.therapyMethods.map(
								(therapyMethod: ITherapyMethod, id: number) => (
									<li key={id} className={styles.therapyMethod}>
										{therapyMethod.name}
									</li>
								)
							)}
						</ul>
					</>
				)}
			{psychologist.techniques && psychologist.techniques.length > 0 && (
				<>
					<h5 className={styles.title_techniques}>психологические техники</h5>
					<ul className={styles.container_techniques}>
						{psychologist.techniques.map(
							(technique: ITechnique, id: number) => (
								<li key={id} className={styles.techniques}>
									{technique.name}
								</li>
							)
						)}
					</ul>
				</>
			)}

			{psychologist.symptoms && psychologist.symptoms.length > 0 && (
				<>
					<h5 className={styles.title_symptoms}>cимптомы</h5>
					<ul className={styles.container_symptoms}>
						{psychologist.symptoms.map((symptom: ISymptom, id: number) => (
							<p key={id} className={styles.symptoms}>
								{symptom.name}
							</p>
						))}
					</ul>
				</>
			)}
			{videoId ? (
				<>
					<h5 className={styles.title_video}>видео визитка</h5>
					<div
						style={{
							borderRadius: '20px',
							overflow: 'hidden',
							position: 'relative',
						}}
					>
						<YouTube videoId={showVideo ? videoId : ''} opts={opts} />
						{!showVideo && (
							<>
								<div
									onClick={handleImageClick}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										cursor: 'pointer',
									}}
								>
									<img
										src="/Video_preview.png"
										alt="Video_preview"
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
										}}
									/>
								</div>
							</>
						)}
					</div>
				</>
			) : (
				<p className={styles.no_video}></p>
			)}

			<h5 className={styles.title_certificates}>диплом/сертификаты</h5>
			{psychologist.certificates && psychologist.certificates.length > 0 && (
				<div className={styles.certificates_container}>
					<Image.PreviewGroup>
						{psychologist.certificates.map((certificate, id) => (
							<Image
								key={id}
								alt={psychologist.fullName}
								src={`${import.meta.env.VITE_API_URL}/uploads/${
									certificate.certificate
								}`}
								className={styles.img_certificate}
							/>
						))}
					</Image.PreviewGroup>
				</div>
			)}
		</div>
	);
};

export default PsychologistProfileContent;
