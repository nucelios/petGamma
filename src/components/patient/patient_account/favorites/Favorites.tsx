import { Row, Col, Spin } from 'antd';
import styles from './Favorites.module.scss';
import { useAppSelector } from '../../../../store/hooks';
import {
	useGetFavourites,
	useSwitchFavourite,
} from '../../../../features/queryHooks/queryHooks';
import { PsychologistCard } from '../../../psychologists/psychologistCard/PsychologistCard';
import Empty from '../../../ui/Empty/Empty';

const Favorites = () => {
	const authUser = useAppSelector((state) => state.users.userInfo);

	const { data: patient, isLoading } = useGetFavourites(authUser);
	const psychologists = patient?.favorites || [];

	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	if (isLoading) {
		return <Spin className={styles.spin} size="large" />;
	}

	return (
		<div>
			{psychologists?.length ? (
				<div className={styles.list}>
					{psychologists.map((psychologist) => (
						<PsychologistCard
							key={psychologist.id}
							psychologist={psychologist}
							switchFavorite={switchFavorite}
						/>
					))}
				</div>
			) : (
				<Row justify="center">
					<Col>
						<Empty />
					</Col>
				</Row>
			)}
		</div>
	);
};

export default Favorites;
