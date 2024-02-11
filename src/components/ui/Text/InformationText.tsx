import styles from './InformationText.module.scss';
import { Typography } from 'antd';
const { Text } = Typography;

const InformationText = ({ text }: { text: string }) => {
	return (
		<Text className={styles.infoText}>
			<span style={{ color: 'red' }}>*</span>
			{text}
		</Text>
	);
};

export default InformationText;
