import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { Alert, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../../store/hooks';
import {
	useGetPsychologists,
	useSwitchFavourite,
} from '../../../features/queryHooks/queryHooks';
import {
	IConsultationTypeValue,
	IFilteringValues,
} from '../../../interfaces/IFilteringValues';

type Props = {
	filterValue: IConsultationTypeValue | IFilteringValues;
};
export const ConsultationTypePsychologists = ({ filterValue }: Props) => {
	const authUser = useAppSelector((state) => state.users.userInfo);

	const {
		data: psychologistsList = [],
		error,
		isLoading,
	} = useGetPsychologists(filterValue);

	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	if (isLoading) {
		return (
			<Spin
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '83svh',
				}}
				size="large"
			/>
		);
	}

	return (
		<>
			{error instanceof AxiosError && (
				<Alert
					closable
					description={error?.message || 'An error occurred.'}
					type="error"
					showIcon
				/>
			)}

			<PsychologistsList
				psychologists={psychologistsList}
				switchFavorite={switchFavorite}
			/>
		</>
	);
};
