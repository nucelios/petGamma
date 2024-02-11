import styles from '../../patient/personal_account/PatientAccountPage.module.scss';
import { Outlet } from 'react-router-dom';
import SideBar from '../../../components/sideBar/SideBar.tsx';
import { itemsSideBarPsychologists } from '../../../components/header/menuItems.tsx';

const PsychologistAccountPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.sds}>
				<SideBar items={itemsSideBarPsychologists} title={'Личный кабинет'} />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default PsychologistAccountPage;
