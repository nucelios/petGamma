import styles from './Record.module.scss';
import { Tabs, TabsProps } from 'antd';
import 'dayjs/locale/ru';
import { useState } from 'react';
import SelectionBookingTime from '../../components/record/selectionBookingTime/SelectionBookingTime.tsx';
import BookingForm from '../../components/record/bookingForm/BookingForm.tsx';
import { IPsychologist } from '../../interfaces/IPsychologist.ts';
import ConfirmationRecord from '../../components/record/confirmationRecord/ConfirmationRecord.tsx';
import Wrapper from '../../components/ui/Wrapper/Wrapper.tsx';
import { useNavigate } from 'react-router-dom';
import { useGoToRecord } from '../../features/queryHooks/queryHooks.ts';

type Props = {
	active: boolean;
	setActive: (active: boolean) => void;
	psychologist: IPsychologist;
};

const Record = ({ active, setActive, psychologist }: Props) => {
	const navigate = useNavigate();
	const { format, id, cost } = psychologist;
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedFormat, setFormat] = useState<string>('');
	const [recordTime, setRecordTime] = useState<string>('');
	const [slotId, setSlotId] = useState<string>('');
	const [activeTab, setActiveTab] = useState<string>('1');

	const goOnRecord = useGoToRecord(navigate, setLoading);
	const onSummit = () => {
		setLoading(true);
		goOnRecord.mutate({
			slotId,
			format: selectedFormat,
			psychologistId: id,
			datetime: recordTime,
		});
	};
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'BookingForm',
			children: (
				<BookingForm
					format={format}
					setActiveTab={setActiveTab}
					setFormat={setFormat}
				/>
			),
		},
		{
			key: '2',
			label: 'SelectionBookingTime',
			children: (
				<SelectionBookingTime
					psychologistId={id}
					setActiveTab={setActiveTab}
					setRecordTime={setRecordTime}
					setSlotId={setSlotId}
				/>
			),
		},
		{
			key: '3',
			label: 'ConfirmationRecord',
			children: (
				<ConfirmationRecord
					cost={cost}
					setActiveTab={setActiveTab}
					format={selectedFormat}
					recordTime={recordTime}
					onSummit={onSummit}
					loading={loading}
				/>
			),
		},
	];

	return (
		<Wrapper active={active} onClick={() => setActive(false)}>
			<Tabs
				className={styles.tab}
				defaultActiveKey={activeTab}
				activeKey={activeTab}
				tabBarGutter={0}
				tabBarStyle={{ marginBottom: 0, display: 'none' }}
				items={items}
			/>
		</Wrapper>
	);
};

export default Record;
