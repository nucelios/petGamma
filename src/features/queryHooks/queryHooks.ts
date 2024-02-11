import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import fetchViewedPsychologists from '../../api/apiHandlers/fetchViewedPsychologists';
import axiosInstance from '../../api/axiosInstance';
import {
	IFilteringConsultationType,
	IFilteringValues,
} from '../../interfaces/IFilteringValues.ts';
import { IPatient } from '../../interfaces/IPatient';
import { IPost } from '../../interfaces/IPost.ts';
import {
	IPsychologist,
	IPsychologistRegisterData,
	IPsychologistWithLikes,
} from '../../interfaces/IPsychologist';
import { ICity } from '../../interfaces/IPsychologistForm';
import { IRecord } from '../../interfaces/IRecord.ts';
import { IRecordPost } from '../../interfaces/IRecordpost';
import { ISymptom } from '../../interfaces/ISymptom';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ITimeSlot, ITimeSlotDate } from '../../interfaces/ITimeSlot';
import { ITransferRecord } from '../../interfaces/ITransferRecord.ts';
import { IPasswordForgot, IPasswordReset, IUser } from '../../interfaces/IUser';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { saveUser } from '../user/userSlice.ts';
import { IRecordConfirmation } from '../../interfaces/IRecordConfirmation.ts';
import { IProfit } from '../../interfaces/IProfit.ts';

export const useTechniqueQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ITechnique[]>('techniques');
		},
		queryKey: ['GetTechniques'],
	});
};
export const useTherapyMethodQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ITherapyMethod[]>(`methods`);
		},
		queryKey: ['GetTherapyMethod'],
	});
};
export const useSymptomQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ISymptom[]>(`symptoms`);
		},
		queryKey: ['GetSymptoms'],
	});
};
export const useCityQuery = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<ICity[]>(`cities`);
		},
		queryKey: ['GetCities'],
	});
};
export const usePostPsychologist = (
	navigate: NavigateFunction,
	dispatch: Dispatch
) => {
	return useMutation({
		mutationFn: (data: FormData) => {
			return axiosInstance.post<IPsychologistRegisterData>(
				'/auth/register/psychologist',
				data
			);
		},
		onSuccess: async (data) => {
			dispatch(saveUser(data.data));
			message.success('Вы успешно отправили анкету!');
			navigate('/auth/confirmation');
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const serverMessage = error.response.data.message;
				message.error(serverMessage || 'Произошла ошибка при отправке анкеты.');
			} else {
				message.error('Произошла неизвестная ошибка.');
			}
		},
	});
};

export const useEditPsychologist = (id: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: FormData) => {
			return axiosInstance.put('/psychologists/edit', data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['getOnePsychologist', id],
			});
			window.location.reload();
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const serverMessage = error.response.data.message;
				message.error(serverMessage || 'Произошла ошибка при отправке анкеты.');
			} else {
				message.error('Произошла неизвестная ошибка.');
			}
		},
	});
};

export const useViewedPsychologists = (user: IUser | null) => {
	return useQuery({
		queryKey: ['GetViewedPsychologists'],
		queryFn: () => fetchViewedPsychologists({ user }),
	});
};

export const useGetPsychologist = (id: string) => {
	return useQuery({
		queryKey: ['GetPsychologist'],
		queryFn: () => {
			return axiosInstance.get<IPsychologist>(`/psychologists/${id}`);
		},
	});
};

export const useGetOnePsychologist = (id: number) => {
	return useQuery({
		queryKey: ['getOnePsychologist'],
		queryFn: async () => {
			const response = await axiosInstance.get<IPsychologist>(
				`/psychologists/${id}`
			);

			return response.data;
		},
	});
};

export const useGetPsychologists = (
	filterValues: IFilteringValues | null | IFilteringConsultationType
) => {
	return useQuery({
		queryFn: async () => {
			const { data } = await axiosInstance.post<IPsychologistWithLikes[]>(
				`/psychologists/filter`,
				filterValues
			);
			return data;
		},
		queryKey: ['GetPsychologists', filterValues],
		enabled: !!filterValues,
	});
};

export const useAddNewTimes = (
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: ITimeSlotDate) => {
			return axiosInstance.post<ITimeSlot>('/appointments', data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['reposData'] });
		},
		onError: () => {
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
		},
	});
};

export const useGoToRecord = (
	navigate: NavigateFunction,
	setLoading: (value: React.SetStateAction<boolean>) => void
) => {
	return useMutation({
		mutationFn: (data: IRecordPost) => {
			return axiosInstance.post('/records/create', data);
		},
		onSuccess: () => {
			message.success('Вы успешно записались на прием к психологу!');
			navigate('/patient/records');
			setLoading(false);
		},
	});
};

export const useAddingTimeForm = (active: boolean, date: string) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['reposData'],
		enabled: active,
		queryFn: async () => {
			const response = await axiosInstance.get(`/appointments?date=${date}`);

			return response.data;
		},
	});
};

export const useDeleteTime = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => {
			return axiosInstance.delete(`/appointments/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['reposData'] });
		},
	});
};

export const useGetFavourites = (authUser: IUser | null) => {
	return useQuery({
		queryFn: async () => {
			const { data } = await axiosInstance.get<IPatient>(
				`/patients/${authUser?.patient?.id ?? 0}`
			);
			return data;
		},
		queryKey: ['GetFavourites'],
		enabled: !!(authUser && authUser.patient),
		staleTime: 0,
	});
};

export const useSwitchFavourite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (psychologistId: number) => {
			const data = { psychologistId };
			return await axiosInstance.post(`/patients/favorites`, data);
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['GetFavourites'] });
			await queryClient.refetchQueries({ queryKey: ['GetFavourites'] });
		},
	});
};

export const useSaveVievedPsychologist = (
	psychologist: IPsychologistWithLikes
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (psychologistId: number) => {
			const response = await axiosInstance.post(
				`patients/viewedPsychologists/${psychologistId}`,
				psychologist
			);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['GetViewedPsychologists'] });
		},
	});
};

export const useGetActualRecordsPatient = () => {
	return useQuery<IRecord[]>({
		queryKey: ['GetActualRecordPatient'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/patients/actual`);
			return response.data;
		},
	});
};

export const useDeleteRecord = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/records/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetActualRecordPatient'],
			});
		},
	});
};

export const useGetUpcomingRecordings = (psychologistId: number) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['getAppointmentsDay'],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/nearest/${psychologistId}`
			);
			return response.data;
		},
	});
};

export const useAppointmentsSelectDayQuery = (
	psychologistId: number,
	date: string,
	enabled?: boolean
) => {
	return useQuery<ITimeSlot[]>({
		queryKey: ['getAppointmentsDay', date],
		enabled: enabled,
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/appointments/${psychologistId}?date=${date}`
			);
			return response.data;
		},
	});
};

export const useRecordTransferQuery = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: ITransferRecord) => {
			return await axiosInstance.put(`/records`, data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetActualRecordPatient'],
			});
		},
	});
};

export const useRecordConfirmation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: IRecordConfirmation) => {
			return await axiosInstance.put(`/records/presence`, data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetActualRecordPatient'],
			});
		},
	});
};

export const useGetRecordsHistoryPatient = () => {
	return useQuery<IRecord[]>({
		queryKey: ['GetRecordsHistoryPatient'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/patients/history`);
			return response.data;
		},
	});
};

export const useGetRecordsActualPsychologists = (
	date: string,
	status: boolean
) => {
	return useQuery<IRecord[]>({
		queryKey: ['useGetRecordsActualPsychologists', date, status],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/psychologists/records/actual`,
				{
					params: { status: status, date: date },
				}
			);
			return response.data;
		},
	});
};

export const usePostEditUserName = () => {
	return useMutation({
		mutationFn: async (data: { name: string; userId: number | undefined }) => {
			const response = await axiosInstance.put(
				`patients/edit/${data.userId}`,
				data
			);

			return response.data;
		},
	});
};

export const useGetAllPosts = () => {
	return useQuery({
		queryKey: ['useGetAllPosts'],
		queryFn: async () => {
			const response = await axiosInstance.get<IPost[]>(`/posts`);
			return response.data;
		},
	});
};

export const usePostOnePosts = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: FormData) => {
			const response = await axiosInstance.post<IPost>('posts/create', data);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllPosts'],
			});
		},
	});
};

export const usePostEditText = () => {
	return useMutation({
		mutationFn: async (formData: FormData) => {
			const postData = {
				title: formData.get('title'),
				description: formData.get('description'),
			};

			const response = await axiosInstance.put(
				`posts/${formData.get('id')}/edit`,
				postData
			);

			return response.data;
		},
	});
};

export const usePostEditPhoto = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await axiosInstance.put<IPost>(
				`posts/${data.get('id')}/change-image`,
				data
			);
		},
	});
};

export const usePublishPost = () => {
	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.post(`posts/publish/${id}`);
			return response.data;
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/posts/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllPosts'],
			});
		},
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: IPasswordForgot) => {
			const response = await axiosInstance.post(`auth/reset-forgot`, data);
			return response.data;
		},
		onSuccess: () => {
			message.success(
				'Вам отправлена ссылка на почту для восстановления пароля!'
			);
		},
	});
};

export const useResetPassword = (
	token: string | null,
	navigate: NavigateFunction
) => {
	return useMutation({
		mutationFn: async (data: IPasswordReset) => {
			const response = await axiosInstance.post(`auth/reset-password`, data, {
				params: { token },
			});
			return response.data;
		},
		onSuccess: () => {
			navigate('/');
			message.success('Восстановление пароля завершено!\n');
		},
	});
};

export const useGetPsychologistsAdminTrue = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(`psychologists?isPublish=true`);
		},
		queryKey: ['GETADMINPSYCHOTRUE'],
	});
};

export const useGetPsychologistsAdminFalse = () => {
	return useQuery({
		queryFn: () => {
			return axiosInstance.get<IPsychologist[]>(
				`psychologists?isPublish=false`
			);
		},
		queryKey: ['GETADMINPSYCHOFALSE'],
	});
};

export const usePsychoPublishAdmin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.post(`psychologists/publish/${id}`);

			return response.data;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOTRUE'] }),
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOFALSE'] }),
			]);
		},
	});
};

export const usePsychoDeleteAdmin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axiosInstance.delete(`psychologists/${id}`);

			return response.data;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOTRUE'] }),
				queryClient.invalidateQueries({ queryKey: ['GETADMINPSYCHOFALSE'] }),
			]);
		},
	});
};

export const useGetAllSymptoms = () => {
	return useQuery({
		queryKey: ['useGetAllSymptoms'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/symptoms`);
			return response.data;
		},
	});
};

export const usePostOneSymptom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { name: string }) => {
			const response = await axiosInstance.post('symptoms/create', data);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllSymptoms'],
			});
		},
	});
};

export const useEditSymptom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			name: string;
			symptomId: number | undefined;
		}) => {
			const response = await axiosInstance.put(
				`symptoms/edit/${data.symptomId}`,
				data
			);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllSymptoms'],
			});
		},
	});
};

export const useDeleteSymptom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/symptoms/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllSymptoms'],
			});
		},
	});
};

export const useGetAllTechnique = () => {
	return useQuery({
		queryKey: ['useGetAllTechnique'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/techniques`);
			return response.data;
		},
	});
};

export const usePostOneTechnique = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { name: string }) => {
			const response = await axiosInstance.post('techniques/create', data);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllTechnique'],
			});
		},
	});
};

export const useEditTechnique = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			name: string;
			techniqueId: number | undefined;
		}) => {
			const response = await axiosInstance.put(
				`techniques/edit/${data.techniqueId}`,
				data
			);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllTechnique'],
			});
		},
	});
};

export const useDeleteTechnique = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/techniques/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllTechnique'],
			});
		},
	});
};

export const useGetAllMethod = () => {
	return useQuery({
		queryKey: ['useGetAllMethod'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/methods`);
			return response.data;
		},
	});
};

export const usePostOneMethod = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { name: string }) => {
			const response = await axiosInstance.post('methods/create', data);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllMethod'],
			});
		},
	});
};

export const useEditMethod = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			name: string;
			methodId: number | undefined;
		}) => {
			const response = await axiosInstance.put(
				`methods/edit/${data.methodId}`,
				data
			);
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllMethod'],
			});
		},
	});
};

export const useDeleteMethod = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => {
			return axiosInstance.delete(`/methods/${id}`);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetAllMethod'],
			});
		},
	});
};

export const usePostPhotoPsychologist = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await axiosInstance.post(`photos/create`, data);
		},
	});
};

export const useDeletePhotoPsychologist = () => {
	return useMutation({
		mutationFn: async (id: number) => {
			return await axiosInstance.delete(`photos/${id}`);
		},
	});
};

export const usePostCertificatesPsychologist = () => {
	return useMutation({
		mutationFn: async (data: FormData) => {
			return await axiosInstance.post(`certificates/create`, data);
		},
	});
};

export const useDeleteCertificatesPsychologist = () => {
	return useMutation({
		mutationFn: async (id: number) => {
			return await axiosInstance.delete(`certificates/${id}`);
		},
	});
};

export const useEditEmail = () => {
	return useMutation({
		mutationFn: async (data: {
			email: string;
			сurrentPassword: string;
			password: string;
		}) => {
			return await axiosInstance.put('auth/edit', data);
		},
	});
};

export const useGetAllFeelings = () => {
	return useQuery({
		queryKey: ['useGetAllFeelings'],
		queryFn: async () => {
			const response = await axiosInstance.get(`/posts`);
			return response.data;
		},
	});
};

export const useGetOneFeeling = (id: number) => {
	return useQuery<IPost, AxiosError<ServerFormValidationResponse>>({
		queryFn: async () => {
			const response = await axiosInstance.get<IPost>(`/posts/${id}`);
			return response.data;
		},
		queryKey: ['useGetOneFeeling', id],
	});
};

export const usePostCommentPatient = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ comment, id }: { comment: string; id: number }) => {
			return axiosInstance.post(`records/comment/patient/${id}`, { comment });
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['GetRecordsHistoryPatient'],
			});
		},
	});
};

export const usePostCommentPsychologist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ comment, id }: { comment: string; id: number }) => {
			return axiosInstance.post(`records/comment/psychologist/${id}`, {
				comment,
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['useGetRecordsActualPsychologists'],
			});
		},
	});
};

export const useGetOnePsychologistProfit = (id: number) => {
	return useQuery({
		queryKey: ['useGetOnePsychologistProfit', id],
		queryFn: async () => {
			const response = await axiosInstance.get<IProfit[]>(
				`/psychologists/analytics/profit/${id}`
			);
			return response.data;
		},
	});
};
export const useGetPsychologistProfit = () => {
	return useQuery({
		queryKey: ['useGetPsychologistProfit'],
		queryFn: async () => {
			const response = await axiosInstance.get<IProfit[]>(
				`/psychologists/analytics/profit/`
			);
			return response.data;
		},
	});
};
