import { Typography } from 'antd';
import styles from './PsychologistsList.module.scss';
import { PsychologistCard } from '../psychologistCard/PsychologistCard';
import { IPsychologistWithLikes } from '../../../interfaces/IPsychologist';
import Empty from '../../ui/Empty/Empty.tsx';

type Props = {
	psychologists: IPsychologistWithLikes[];
	switchFavorite: (id: number) => boolean;
};

export const PsychologistsList = ({ psychologists, switchFavorite }: Props) => {
	return (
		<div className={styles.container}>
			{psychologists.length > 0 ? (
				<>
					<Typography className={styles.count}>
						{psychologists.length} психологов
					</Typography>
					<div className={styles.list}>
						{psychologists.map((psychologist) => (
							<PsychologistCard
								psychologist={psychologist}
								switchFavorite={switchFavorite}
								key={psychologist.id}
							/>
						))}
					</div>
				</>
			) : (
				<Empty />
			)}
		</div>
	);
};
