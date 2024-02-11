import { message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import './ViewedPsychologistCard.scss';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../store';
import { IPsychologistWithLikes } from '../../../../interfaces/IPsychologist';
import { useAppSelector } from '../../../../store/hooks';
import updateStorageViewedPsychologists from '../../../../helpers/updateStorageViewedPsychologists';
import { useSaveVievedPsychologist } from '../../../../features/queryHooks/queryHooks';

interface Props {
	psychologist: IPsychologistWithLikes;
	switchFavorite?: (id: number) => boolean;
}

export const ViewedPsychologistCard = ({
	psychologist,
	switchFavorite,
}: Props) => {
	const authUser = useAppSelector((state: RootState) => state.users.userInfo);
	const navigate = useNavigate();

	const onClickReadMore = () => {
		navigate(`/psychologists/${psychologist.id}`);
		if (authUser?.accessToken && authUser.patient !== null) {
			saveViewedPsychologist(psychologist.id);
		} else {
			updateStorageViewedPsychologists(psychologist.id);
		}
	};

	const { mutate: saveViewedPsychologist } =
		useSaveVievedPsychologist(psychologist);

	const changeHeart = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();

		if (switchFavorite === undefined) return;

		const isSwitched = switchFavorite(psychologist.id);
		if (!isSwitched) return;

		if (!psychologist.isFavorite)
			message.success('Психолог был успешно Добавлен в список избранных.');
		else message.success('Психолог был успешно удален из списка избранных.');

		psychologist.isFavorite = !psychologist.isFavorite;
	};

	return (
		<div className="psychologist-card-wrapper">
			{authUser?.role === 'patient' && switchFavorite && (
				<div className="heart-container">
					{psychologist.isFavorite ? (
						<span className="heart">
							<HeartFilled style={{ color: 'red' }} onClick={changeHeart} />
						</span>
					) : (
						<span className="heart">
							<HeartOutlined onClick={changeHeart} />
						</span>
					)}
				</div>
			)}
			<div
				className="psychologist-card-wrapper__card"
				onClick={onClickReadMore}
			>
				<img
					alt={psychologist.fullName}
					src={`${import.meta.env.VITE_API_URL}/uploads/${
						psychologist.photos[0].photo
					}`}
					className="card-img"
				/>
				<div className="description">
					<p className="description__name">{psychologist.fullName}</p>
					<p className="description__education">
						{psychologist.education && psychologist.education.length > 60
							? `${psychologist.education.slice(0, 50)}...`
							: psychologist.education}
					</p>
					<div className="container-city-country">
						<p className="description__city">{psychologist.city.name} </p>
						<p className="description__country">{psychologist.city.country}</p>
					</div>

					{psychologist.therapyMethods &&
						psychologist.therapyMethods.length > 0 && (
							<div className="container-therapyMethod">
								{psychologist.therapyMethods
									.slice(0, 2)
									.map((therapyMethod, id) => (
										<p key={id} className="therapy-method">
											{therapyMethod.name}
										</p>
									))}
							</div>
						)}

					<p className="description__cost">{`${psychologist.cost.toLocaleString()} т`}</p>
				</div>
			</div>
		</div>
	);
};
