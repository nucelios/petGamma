import { IPsychologistWithLikes } from '../../interfaces/IPsychologist';
import { IUser } from '../../interfaces/IUser';
import axiosInstance from '../axiosInstance';

const fetchViewedPsychologists = async ({ user }: { user: IUser | null }) => {
	if (user?.accessToken && user.patient !== null) {
		const response = await axiosInstance.get<IPsychologistWithLikes[]>(
			`/patients/viewedPsychologists`
		);
		return response.data;
	} else {
		const viewedPsychologistIds = JSON.parse(
			localStorage.getItem('viewedPsychologists') || '[]'
		);
		if (viewedPsychologistIds.length > 0) {
			const idsParam = viewedPsychologistIds.join(',');
			const response = await axiosInstance.get<IPsychologistWithLikes[]>(
				`/psychologists/getByIds/${idsParam}`
			);
			return response.data;
		} else {
			return [];
		}
	}
};

export default fetchViewedPsychologists;
