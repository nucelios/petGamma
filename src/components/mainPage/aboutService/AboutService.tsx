import './AboutService.scss';
import illustration from '../../../../public/main-page/service-illustration.svg';
import { Typography } from 'antd';

const { Title } = Typography;
const AboutService = () => {
	return (
		<div className="about-service">
			<div className="about-service__illustration">
				<img
					src={illustration}
					alt="service-illustration"
					className="service-illustration"
				/>
			</div>
			<div className="about-service__text">
				<Title className="main-title">сервис предлагает</Title>
				<div className="about-service__item">
					<Typography className="title">заботу о себе</Typography>
					<Typography className="text">
						Подберите аккретитованного терапевта учитывая все ваши пожелания и
						важные предпочтения.
					</Typography>
				</div>
				<div className="about-service__item">
					<Typography className="title">сессию в месенджерах</Typography>
					<Typography className="text">
						Если у вас нет возможности озвучить вашу проблему, вы можете описать
						и пройти сессию в месенджере.
					</Typography>
				</div>
				<div className="about-service__item">
					<Typography className="title">умный подбор</Typography>
					<Typography className="text">
						Вы можете назначать удобное время для сессий из календаря психолога,
						отменить и перенести сессию в случае ф-м.
					</Typography>
				</div>
				<div className="about-service__item ">
					<Typography className="title">пакеты сессий</Typography>
					<Typography className="text">
						Можно приобретать 5–10 и более сессий в пакете и проходить
						полноценную терапию.
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default AboutService;
