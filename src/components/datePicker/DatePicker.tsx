import { Calendar, Select } from 'antd';
import './DatePicker.scss';

type Props = {
	onPanelChange: (value: string) => void;
};

const DatePicker = ({ onPanelChange }: Props) => {
	return (
		<Calendar
			className={'wrapper'}
			fullscreen={false}
			onSelect={(value) => {
				onPanelChange(value.format('YYYY-MM-DD'));
			}}
			headerRender={({ value, onChange }) => {
				const start = 0;
				const end = 12;
				const monthOptions = [];

				let current = value.clone();
				const months = [];
				for (let i = 0; i < 12; i++) {
					current = current.month(i);
					months.push(current.format('MMMM'));
				}

				for (let i = start; i < end; i++) {
					monthOptions.push(
						<Select.Option key={i} value={i} className={'select'}>
							{months[i]}
						</Select.Option>
					);
				}

				const month = value.month();
				return (
					<div className={'header'}>
						<Select
							className={'select'}
							bordered={false}
							value={month}
							onChange={(newMonth) => {
								const now = value.clone().month(newMonth);
								onChange(now);
							}}
						>
							{monthOptions}
						</Select>
					</div>
				);
			}}
		/>
	);
};

export default DatePicker;
