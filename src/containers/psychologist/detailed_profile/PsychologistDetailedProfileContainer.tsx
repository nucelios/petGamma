import { useParams } from 'react-router-dom';
import {
	useGetPsychologist,
	useSwitchFavourite,
} from '../../../features/queryHooks/queryHooks';
import PsychologistDetailedProfile from '../../../components/psychologist/detailed_profile/PsychologistDetailedProfile';
import { useAppSelector } from '../../../store/hooks';
import { Spin } from 'antd';
import styles from '../../../components/patient/patient_account/records/Record.module.scss';

const PsychologistDetailedProfileContainer = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetPsychologist(id!);

	const authUser = useAppSelector((state) => state.users.userInfo);
	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	if (isLoading) {
		return <Spin className={styles.spinner} size="large" />;
	}

	return (
		<PsychologistDetailedProfile
			psychologist={data?.data}
			switchFavorite={switchFavorite}
		/>
	);
};

export default PsychologistDetailedProfileContainer;
