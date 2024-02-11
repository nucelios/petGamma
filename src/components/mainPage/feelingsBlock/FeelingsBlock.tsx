import { Col, Row, Typography } from 'antd';
import './FeelingsBlock.scss';
import { feelings } from '../../../constants/feelings';
const { Title } = Typography;

const FeelingsBlock = () => {
	return (
		<div className="feelings-block">
			<div className="feelings-block__text">
				<Title className="title">что вы чувствуете сейчас?</Title>
				<Typography className="text">
					наша жизнь это про то, что мы испытываем каждую минуту.
					<br />
					ежедневно человек не замечая, испытывает целую гамму чувств. совершает
					действия - чтобы испытать какие-то чувства, достигает целей,
					побеждает, старается, закрывает первичные потребности с одной целью -
					испытать чувства. чувства - это и есть жизнь. физически человек
					ощущает их телом.
					<br />а что вы ощущаете сейчас? что вы чувствуете? откройте карточки.
				</Typography>
			</div>
			<div className="feelings">
				<Row gutter={16} className="feelings__row">
					<Col className="feelings__item">{feelings[0]}</Col>
					<Col className="feelings__item">{feelings[1]}</Col>
					<Col className="feelings__item">{feelings[2]}</Col>
					<Col className="feelings__item">{feelings[3]}</Col>
					<Col className="feelings__item">{feelings[4]}</Col>
				</Row>
				<Row gutter={16} className="feelings__row">
					<Col className="feelings__item">{feelings[5]}</Col>
					<Col className="feelings__item">{feelings[6]}</Col>
					<Col className="feelings__item">{feelings[7]}</Col>
					<Col className="feelings__item">{feelings[8]}</Col>
				</Row>
				<Row gutter={16} className="feelings__row">
					<Col className="feelings__item">{feelings[9]}</Col>
					<Col className="feelings__item">{feelings[10]}</Col>
					<Col className="feelings__item">{feelings[11]}</Col>
					<Col className="feelings__item">{feelings[12]}</Col>
				</Row>
				<Row gutter={16} className="feelings__row">
					<Col className="feelings__item">{feelings[13]}</Col>
					<Col className="feelings__item">{feelings[14]}</Col>
					<Col className="feelings__item">{feelings[15]}</Col>
					<Col className="feelings__item">{feelings[16]}</Col>
				</Row>
				<Row gutter={16} className="feelings__row">
					<Col className="feelings__item">{feelings[17]}</Col>
					<Col className="feelings__item">{feelings[18]}</Col>
					<Col className="feelings__item">{feelings[19]}</Col>
					<Col className="feelings__item">{feelings[20]}</Col>
				</Row>
				<Row className="feelings__row">
					<Col className="feelings__item">{feelings[21]}</Col>
				</Row>
			</div>
		</div>
	);
};

export default FeelingsBlock;
