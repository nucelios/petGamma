import { Col, Row } from 'antd';
import './ServicesCards.scss';
import lockIcon from '../../../../public/main-page/frame.svg';
import capIcon from '../../../../public/main-page/teacher.svg';
import ghostIcon from '../../../../public/main-page/ghost.svg';
import clipboardIcon from '../../../../public/main-page/clipboard-tick.svg';
import { Typography } from 'antd';

const { Title } = Typography;
const ServicesCards = () => {
	return (
		<Row id="services" className="services-cards">
			<Col
				xs={10}
				sm={10}
				md={5}
				lg={5}
				xl={5}
				className="services-cards__card"
			>
				<img src={lockIcon} alt="lock-icon" className="icon" />
				<Title className="title">безопасность и конфиденциальность</Title>
				<Typography className="text">
					это безопасное пространство. сервис позаботился о конфиденциальности
					данных
				</Typography>
			</Col>
			<Col
				xs={10}
				sm={10}
				md={5}
				lg={5}
				xl={5}
				className="services-cards__card"
			>
				<img src={capIcon} alt="cap-icon" className="icon" />
				<Title className="title">только сертифицированные специалисты</Title>
				<Typography className="text">
					проверенные и аккредитованные специалсты с личной терапией
				</Typography>
			</Col>
			<Col
				xs={10}
				sm={10}
				md={5}
				lg={5}
				xl={5}
				className="services-cards__card"
			>
				<img src={ghostIcon} alt="ghost-icon" className="icon" />
				<Title className="title">доступный и бережливый сервис</Title>
				<Typography className="text">
					эмпатичные терапевты бережливо помогут понять себя, свои чувства
				</Typography>
			</Col>
			<Col
				xs={10}
				sm={10}
				md={5}
				lg={5}
				xl={5}
				className="services-cards__card"
			>
				<img src={clipboardIcon} alt="clipboard-icon" className="icon" />
				<Title className="title">помощь в трудные минуты</Title>
				<Typography className="text">
					поддержка терапевта прожить эмоции в моменты кризиса
				</Typography>
			</Col>
		</Row>
	);
};

export default ServicesCards;
