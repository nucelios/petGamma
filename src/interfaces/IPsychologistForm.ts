import { IPsychologistForm } from './IPsychologist';

export interface IMethod {
	id: number;
	name: string;
}

export interface ICity {
	id: number;
	name: string;
	country: string;
}

export interface ICertificate {
	id: number;
	certificate: string;
	psychologistId: number;
}
export interface IPhoto {
	id: number;
	photo: string;
	psychologistId: number;
}

export interface IInitialCertificateState {
	psychologistForm: IPsychologistForm | null;
	error: string | null;
	loading: boolean;
	techniques: IMethod[] | null;
	therapyMethod: IMethod[] | null;
	symptoms: IMethod[] | null;
	cities: ICity[] | null;
}

export interface IPsychologistFormRegister {
	fileList: ICertificates[];
}
export interface ICertificates {
	name: string;
	thumbUrl: string;
}

export interface ITokenPsychologist {
	users: {
		userInfo: {
			accessToken: string;
		};
	};
}
