import { useNavigate } from 'react-router-dom';
import magicPenIcon from '../../../../public/main-page/magicpen.svg';
import mainIllustration from '../../../../public/main-page/main illustration 1.svg';
import './AboutContent.scss';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const AboutContent = () => {
	const navigate = useNavigate();
	return (
		<div className="about-content">
			<div className="about-content__text">
				<Title className="title">
					сервис по заботе <br /> о ментальном здоровье
				</Title>
				<Typography className="text">
					здесь помогают любить и понимать себя. <br /> самое бережливое и
					безопасное пространство, <br /> свободное от оценки, критики и
					осуждения
				</Typography>
				<Typography className="button-text">
					<img src={magicPenIcon} alt="magic-pen" className="magic-pen-icon" />
					начните терапию прямо сейчас
				</Typography>
				<Button className="button" onClick={() => navigate('/psychologists/')}>
					подобрать психолога
				</Button>
			</div>
			<div className="about-content__illustration">
				<img
					src={mainIllustration}
					alt="main-illustration"
					className="main-illustration"
				/>
			</div>
		</div>
	);
};

export default AboutContent;
