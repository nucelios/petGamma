import { IPatient } from './IPatient.ts';
import { IPsychologist } from './IPsychologist.ts';

export interface IUser {
	id: number;
	email: string;
	phone: string;
	username: string;
	patient?: IPatient;
	psychologist?: IPsychologist;
	accessToken: string;
	role: string;
	isActivated: boolean;
}

export interface IUserAdminLogin extends Pick<IUser, 'username'> {
	password: string;
}

export interface IPasswordForgot {
	email: string;
}

export interface IPasswordReset {
	password: string;
	confirm: string;
}
