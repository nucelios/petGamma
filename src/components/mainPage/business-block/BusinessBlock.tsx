import './BusinessBlock.scss';
import { Button, Typography } from 'antd';
import illustration from '../../../../public/main-page/business-illustration.svg';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const BusinessBlock = () => {
	const navigate = useNavigate();
	return (
		<div id="busines" className="business-block">
			<div className="business-block__text">
				<Title className="main-title">корпоративный психолог</Title>
				<div className="business-block__item">
					<Typography className="title">забота о сотрудниках</Typography>
					<Typography className="text">
						В период высокой информационной загруженности и фонового стресса —
						поможет повысить эффективность, а также станет отличным дополнением
						к бенефитам компании.
					</Typography>
				</div>
				<div className="business-block__item">
					<Typography className="title">решение конфликтов</Typography>
					<Typography className="text">
						Сотрудники смогут отслеживать эмоциональное выгорание и
						предотвратить его своевременно, поможет владельцам отследить общую
						динамику работы, эффективность сотрудников, причины выгорания,
						помогут решить конфликты в коллективе и выстроить стратегии
						внутренней коммуникации
					</Typography>
				</div>
				<div className="business-block__item">
					<Typography className="title">эмоциональное выгорание</Typography>
					<Typography className="text">
						Помощь владельцам и руководителям компаниям заботиться о сотрудниках
					</Typography>
				</div>
				<Button
					onClick={() => navigate('/business')}
					className="business-block__button"
				>
					оставить заявку
				</Button>
			</div>
			<div className="business-block__illustration">
				<img
					src={illustration}
					alt="business-illustration"
					className="business-illustration"
				/>
			</div>
		</div>
	);
};

export default BusinessBlock;
