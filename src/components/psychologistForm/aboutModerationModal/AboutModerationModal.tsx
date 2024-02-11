import imgContent from '../../../assets/icon/Group 40.svg';

import { useState } from 'react';
import { Typography } from 'antd';
import UIWrapper from '../../ui/Wrapper/Wrapper';
import './AboutModerationModal.scss';

const { Link } = Typography;

const AboutModerationModal = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const children = (
		<div className="about-moderation-modal">
			<p className="modal-title">Модерация</p>
			<p className="modal-text">
				Этап когда ваш профиль проходит проверку на подлинность и
				профессиональность (до 24 часов)
			</p>
			<img src={imgContent} alt="upload-icon" className="modal-img" />
		</div>
	);

	return (
		<>
			<Link underline onClick={showModal} className="link">
				Что такое модерация?
			</Link>
			<UIWrapper
				active={isModalVisible}
				onClick={handleCancel}
				children={children}
			/>
		</>
	);
};

export default AboutModerationModal;
