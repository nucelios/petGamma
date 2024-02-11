import styles from './Alert.module.scss';
import info_svg from '../../../../public/info-circle.svg';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';
type Props = {
	message: string;
	title: string;
	children?: ReactNode;
};

const Alert = ({ title, message, children }: Props) => {
	return (
		<Tooltip
			overlay={
				<>
					<div className={styles.popup}>
						<div className={styles.header}>
							<img src={info_svg} alt="info" />
							<h1>{title}</h1>
						</div>
						<h3>{message}</h3>
					</div>
				</>
			}
			trigger={['hover']}
		>
			{children}
		</Tooltip>
	);
};

export default Alert;
