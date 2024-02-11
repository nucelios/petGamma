import breatheGif from '../../../../public/main-page/breathe.gif';
import './BreathBlock.scss';
const BreathBlock = () => {
	return (
		<div className="breath-block">
			<img className="breath-block__gif" src={breatheGif} alt="breath-gif" />
		</div>
	);
};

export default BreathBlock;
