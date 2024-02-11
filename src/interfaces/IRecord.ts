export interface IRecord {
	id: number;
	address: string | null;
	patientId: number;
	psychologistId: number;
	psychologistName: string;
	cityId: number;
	format: 'online' | 'offline';
	cost: number;
	duration?: number;
	broadcast: string;
	status: 'active' | 'canceled' | 'inactive';
	datetime: string;
	patientName: string;
	commentPatient: string;
	commentPsychologist: string;
}
