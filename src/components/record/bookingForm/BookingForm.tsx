import { Button, Select } from 'antd';
import styles from './BookingForm.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../store/hooks.ts';
import { userSelect } from '../../../features/user/userSlice.ts';
import { useEffect, useState } from 'react';

type Props = {
	setActiveTab: (key: string) => void;
	format: string[];
	setFormat: (format: string) => void;
};
const BookingForm = ({ setActiveTab, format, setFormat }: Props) => {
	const [selectedFormat, setSelectedFormat] = useState(format[0]);
	const user = useAppSelector(userSelect);
	const patient = user?.patient ? user.patient.name : null;

	useEffect(() => {
		setFormat(selectedFormat);
	}, [selectedFormat, setFormat]);

	const handleFormatChange = (value: string) => {
		setSelectedFormat(value);
	};

	const options = format.map((value) => ({ value, label: value }));

	return (
		<>
			<h1 className={styles.bookingHeader}>Данные для записи</h1>

			<div className={styles.bookingFullName}>
				<p>ФИО</p>
				<h2>{patient}</h2>
			</div>

			<div className={styles.bookingFormat}>
				<p>Формат</p>
				<Select
					defaultValue={selectedFormat}
					value={selectedFormat}
					onChange={handleFormatChange}
					className={styles.bookingSelect}
					suffixIcon={<DownOutlined style={{ color: '#2e2e2e' }} />}
					dropdownStyle={{
						background: '#f5f5f5',
						margin: '10px',
					}}
					bordered={false}
					options={options}
				/>
			</div>

			<Button className={styles.btn} onClick={() => setActiveTab('2')}>
				Далее
			</Button>
		</>
	);
};

export default BookingForm;
