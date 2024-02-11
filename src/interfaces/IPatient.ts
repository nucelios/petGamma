import { IPsychologist } from './IPsychologist';

export interface IPatient {
	id: number;
	name: string;
	favorites: IPsychologist[];
}
