import { Space, Typography } from 'antd';
import { IPsychologistWithLikes } from '../../../../interfaces/IPsychologist';
import { ViewedPsychologistCard } from '../card/ViewedPsychologistCard';
import './ViewedPsychologists.scss';
type Props = {
	viewedPsychologists: IPsychologistWithLikes[] | undefined;
	switchFavorite: ((id: number) => boolean) | undefined;
};
const ViewedPsychologists = ({
	viewedPsychologists,
	switchFavorite,
}: Props) => {
	return (
		<div className="viewed-psychologists">
			{viewedPsychologists && viewedPsychologists.length > 0 ? (
				<div className="viewed-psychologists__content">
					<Typography className="viewed-psychologists__title">
						ранее просмотренное
					</Typography>
					<Space className="viewed-psychologists__list">
						{viewedPsychologists.map((psychologist) => (
							<ViewedPsychologistCard
								psychologist={psychologist}
								key={psychologist.id}
								switchFavorite={switchFavorite}
							/>
						))}
					</Space>
				</div>
			) : null}
		</div>
	);
};

export default ViewedPsychologists;
