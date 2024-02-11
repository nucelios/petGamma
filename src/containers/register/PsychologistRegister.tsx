import { PsychologistForm } from '../../components/psychologistForm/form/PsychologistForm.tsx';
import {
	useCityQuery,
	usePostPsychologist,
	useSymptomQuery,
	useTechniqueQuery,
	useTherapyMethodQuery,
} from '../../features/queryHooks/queryHooks.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks.ts';

function PsychologistRegister() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data: techniquesData } = useTechniqueQuery();
	const techniques = techniquesData?.data ?? [];

	const { data: therapyMethodsData } = useTherapyMethodQuery();
	const therapyMethod = therapyMethodsData?.data ?? [];

	const { data: symptomsData } = useSymptomQuery();
	const symptoms = symptomsData?.data ?? [];

	const { data: citiesData } = useCityQuery();
	const cities = citiesData?.data ?? [];

	const { mutate: postPsychologist } = usePostPsychologist(navigate, dispatch);

	const handleRegister = async (data: FormData) => {
		postPsychologist(data);
	};

	return (
		<div
			style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
		>
			<PsychologistForm
				techniques={techniques}
				cities={cities}
				symptoms={symptoms}
				therapyMethods={therapyMethod}
				submit={handleRegister}
			/>
		</div>
	);
}

export default PsychologistRegister;
