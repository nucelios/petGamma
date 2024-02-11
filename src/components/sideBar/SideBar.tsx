import { Menu, MenuProps } from 'antd';
import styles from './SideBar.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
	items: MenuProps['items'];
	title: string;
}

const SideBar = ({ items, title }: Props) => {
	const [activeTab, setActiveTab] = useState<string>('');
	const location = useLocation();

	useEffect(() => {
		const pathArray = window.location.pathname.split('/');
		const lastPath = pathArray[pathArray.length - 1];
		setActiveTab(lastPath);
	}, [location]);

	return (
		<>
			<div style={{ height: '100%' }}>
				<h1 className={styles.title}>{title}</h1>
				<div className="menu-container">
					<Menu
						mode={'vertical'}
						className={styles.menu}
						selectedKeys={[activeTab]}
						items={items}
					/>
				</div>
			</div>
		</>
	);
};

export default SideBar;
