import { Button, Spin } from 'antd';
import styles from './AddingTimeForm.module.scss';
import AddingTimeHeader from './addingTimeHeader/addingTimeHeader.tsx';
import { ITimeSlot } from '../../../interfaces/ITimeSlot.ts';
import AvailableTimeSlots from './availableTimeSlots/AvailableTimeSlots.tsx';
import AddingTimeBlock from './addingTimeBlock/AddingTimeBlock.tsx';
import UnavailableTimeSlots from './unavailableTimeSlots/UnavailableTimeSlots.tsx';
import Wrapper from '../../ui/Wrapper/Wrapper.tsx';
import { useAddingTimeForm } from '../../../features/queryHooks/queryHooks.ts';

type Props = {
	date: string;
	active: boolean;
	setActive: (active: boolean) => void;
};

const AddingTimeForm = ({ active, setActive, date }: Props) => {
	const { isPending, data = [] } = useAddingTimeForm(active, date);
	const handleOk = () => {
		setActive(false);
	};
	const handleCancel = () => {
		setActive(false);
	};

	const unavailableTimeSlots: ITimeSlot[] = data.filter(
		(timeSlot: ITimeSlot) => timeSlot.available
	);

	const availableTimeSlots = data.filter(
		(timeSlot: ITimeSlot) => !timeSlot.available
	);

	return (
		<>
			<Wrapper active={active} onClick={handleCancel}>
				{isPending ? (
					<Spin style={{ padding: 40 }} size="large" />
				) : (
					<>
						<AddingTimeHeader date={date} />

						<AddingTimeBlock date={date} />

						<AvailableTimeSlots
							data={data}
							availableTimeSlots={availableTimeSlots}
						/>
						<UnavailableTimeSlots unavailableTimeSlots={unavailableTimeSlots} />

						<div className={styles.footer}>
							<Button onClick={handleOk} className={styles.submit_btn}>
								Подтвердить
							</Button>
						</div>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default AddingTimeForm;
