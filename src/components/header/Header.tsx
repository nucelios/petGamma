import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Menu as AntMenu } from 'antd';
import {
	loginAuth,
	patientItems,
	psychologistItems,
	adminItems,
	logoItem,
	commonItems,
} from './menuItems.tsx';
import as from '../../assets/icon/vector.svg';
import { IUser } from '../../interfaces/IUser.ts';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
interface ToolbarProps {
	isAuthenticated: boolean;
	user: IUser | null;
}

export const Header: React.FC<ToolbarProps> = ({ isAuthenticated, user }) => {
	const [activeTab, setActiveTab] = useState<string>('');
	const location = useLocation();
	useEffect(() => {
		const pathArray = location.pathname.substring(1);
		setActiveTab(pathArray);
	}, [location]);

	let menuItems;

	if (isAuthenticated && user) {
		if (user.role === 'psychologist') {
			menuItems = psychologistItems;
		} else if (user.role === 'patient') {
			menuItems = patientItems;
		} else if (user.role === 'admin') {
			menuItems = adminItems;
		}
	} else {
		menuItems = loginAuth;
	}

	return (
		<>
			<img src={as} alt="Header Image" className={styles.img} />
			<div className={styles.menuContainerWide}>
				<AntMenu
					mode="horizontal"
					items={logoItem}
					className={styles.logoMenu}
				/>
				<AntMenu
					className={`${styles.menuCommon}`}
					overflowedIndicator={<RxHamburgerMenu className={styles.burger} />}
					mode="horizontal"
					items={commonItems}
				/>
			</div>
			<AntMenu
				mode="horizontal"
				selectedKeys={[activeTab]}
				items={menuItems}
				className={styles.menu}
			/>
		</>
	);
};
