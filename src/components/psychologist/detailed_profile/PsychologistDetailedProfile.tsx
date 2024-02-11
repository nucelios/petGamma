import React from 'react';
import PsychologistCard from '../../../components/psychologist/detailed_profile/PsychologistCard/PsychologistCard';
import styles from './PsychologistDetailedProfile.module.scss';
import PsychologistProfileContent from '../../../components/psychologist/detailed_profile/PsychologistProfileContent/PsychologistProfileContent';
import { IPsychologist } from '../../../interfaces/IPsychologist';

type PsychologistDetailedProfileProps = {
	psychologist: IPsychologist | undefined;
	switchFavorite?: (id: number) => boolean;
};

const PsychologistDetailedProfile: React.FC<
	PsychologistDetailedProfileProps
> = ({ psychologist, switchFavorite }) => {
	return (
		<div className={styles.detailed_profile_content}>
			{psychologist ? (
				<>
					<div className={styles.item_content}>
						<div className={styles.purple_circle}>
							<img src="/purple_circle.svg" alt="purple_circle" />
						</div>
						<PsychologistProfileContent
							psychologist={psychologist}
							switchFavorite={switchFavorite}
						/>
					</div>
					<div>
						<PsychologistCard psychologist={psychologist} />
					</div>
				</>
			) : (
				<div>No psychologist found for the given ID.</div>
			)}
		</div>
	);
};

export default PsychologistDetailedProfile;
