import { PsychologistsList } from '../../../components/psychologists/psychologistList/PsychologistsList';
import { useState } from 'react';
import { Alert, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../../store/hooks';
import {
	useCityQuery,
	useGetPsychologists,
	useSwitchFavourite,
	useSymptomQuery,
	useTechniqueQuery,
	useTherapyMethodQuery,
} from '../../../features/queryHooks/queryHooks';
import PsychologistFilterForm from '../../../components/filteringForm/FilteringForm';
import {
	IFilteringConsultationType,
	IFilteringValues,
} from '../../../interfaces/IFilteringValues';

export const PsychologistsListContainer = () => {
	const authUser = useAppSelector((state) => state.users.userInfo);

	const [filterValues, setFilterValues] = useState<
		null | IFilteringValues | IFilteringConsultationType
	>(null);

	const {
		data: psychologists,
		error,
		isLoading,
	} = useGetPsychologists(filterValues);
	const psychologistsList = psychologists ?? [];

	const { data: techniquesData } = useTechniqueQuery();
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useTherapyMethodQuery();
	const therapyMethods = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useSymptomQuery();
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useCityQuery();
	const cities = citiesData?.data ?? [];

	const { mutate: switchFavoriteQuery } = useSwitchFavourite();

	const switchFavorite = (id: number): boolean => {
		if (!authUser || !authUser.patient) return false;
		switchFavoriteQuery(id);
		return true;
	};

	const filterHandler = (
		values: IFilteringValues | IFilteringConsultationType
	) => {
		setFilterValues(values);
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
		<div style={{ padding: '20px' }}>
			{error instanceof AxiosError && (
				<Alert
					closable
					description={error?.message || 'An error occurred.'}
					type="error"
					showIcon
				/>
			)}
			<PsychologistFilterForm
				onFilter={filterHandler}
				cities={cities}
				symptoms={symptoms}
				techniques={techniques}
				therapyMethods={therapyMethods}
			/>
			<PsychologistsList
				psychologists={psychologistsList}
				switchFavorite={switchFavorite}
			/>
		</div>
	);
};
