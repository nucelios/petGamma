import SideBar from '../../../components/sideBar/SideBar.tsx';
import { Outlet } from 'react-router-dom';
import styles from './PatientAccountPage.module.scss';
import { itemsSideBar } from '../../../components/header/menuItems.tsx';

const PatientAccountPage = () => {
	return (
		<div className={styles.container}>
			<SideBar items={itemsSideBar} title={'Личный кабинет'} />
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default PatientAccountPage;
