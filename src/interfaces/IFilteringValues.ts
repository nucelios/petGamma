export interface IFilteringValues {
	gender?: 'male' | 'female';
	age?: number | number[];
	languages?: 'kazakh' | 'russian' | 'english';
	format?: 'online' | 'offline';
	cost?: number[];
	consultationType?: IFilteringConsultationType;
	lgbt?: boolean;
	cityId?: number;
	symptomIds?: number[];
	therapyMethodIds?: number[];
	techniqueIds?: number[];
}

export type IFilteringConsultationType = 'solo' | 'duo' | 'children' | 'group';

export interface IConsultationTypeValue {
	consultationType?: IFilteringConsultationType;
}
