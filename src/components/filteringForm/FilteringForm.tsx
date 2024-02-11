import { Form, Select, Button, Slider } from 'antd';
import { IFilteringValues } from '../../interfaces/IFilteringValues';
import { ICity } from '../../interfaces/IPsychologistForm';
import { ITechnique } from '../../interfaces/ITechnique';
import { ITherapyMethod } from '../../interfaces/ITherapyMethod';
import { ISymptom } from '../../interfaces/ISymptom';
import { useEffect, useState } from 'react';
import './FilterForm.scss';
import filterSvg from '../../assets/icon/filter.svg';
const { Option } = Select;

interface IFilteringValuesAnt extends Omit<IFilteringValues, 'age'> {
	age?: keyof typeof ageMappings;
}

const initialValues: IFilteringValuesAnt = {
	gender: undefined,
	lgbt: undefined,
	age: undefined,
	languages: undefined,
	format: undefined,
	cost: undefined,
	consultationType: undefined,
	cityId: undefined,
	techniqueIds: undefined,
	therapyMethodIds: undefined,
	symptomIds: undefined,
};

const ageMappings = {
	'18-30': {
		name: '18 - 30',
		value: [18, 30],
	},
	'30-40': {
		name: '30 - 40',
		value: [30, 40],
	},
	'40-60': {
		name: '40 - 60',
		value: [40, 60],
	},
	'60+': {
		name: '60+',
		value: 60,
	},
};

type Props = {
	onFilter: (values: IFilteringValues) => void;
	cities: ICity[] | null;
	techniques: ITechnique[] | null;
	therapyMethods: ITherapyMethod[] | null;
	symptoms: ISymptom[] | null;
};

const PsychologistFilterForm = ({
	onFilter,
	cities,
	symptoms,
	techniques,
	therapyMethods,
}: Props) => {
	const [form] = Form.useForm();
	const [cost, setCost] = useState<number[]>([0, 50000]);
	const [activeFilter, setActiveFilter] = useState(false);

	useEffect(() => {
		const savedFormValues = localStorage.getItem('psychologistFilterForm');
		try {
			if (savedFormValues) {
				const parsedFormValues = JSON.parse(savedFormValues);
				parsedFormValues.cost && setCost(parsedFormValues.cost);
				form.setFieldsValue(parsedFormValues);
			}
		} catch (error) {
			setCost([0, 50000]);
			localStorage.removeItem('psychologistFilterForm');
		}

		form.submit();
	}, [form]);

	const onValuesChange = (_: unknown, values: IFilteringValuesAnt) => {
		localStorage.setItem('psychologistFilterForm', JSON.stringify(values));
	};
	const onFinish = ({ age, ...restValues }: IFilteringValuesAnt) => {
		const filteredValues: IFilteringValues = {
			...restValues,
			age: age ? ageMappings[age].value : undefined,
		};
		onFilter(filteredValues);
	};

	const handleClearFilters = () => {
		form.resetFields();
		localStorage.removeItem('psychologistFilterForm');
		onFilter({});
		setCost([0, 50000]);
	};

	return (
		<div className="filter">
			<div className={'mobile'}>
				<Button
					className="btn"
					onClick={() => setActiveFilter((prev) => !prev)}
				>
					<span>Фильтры</span>
					<img src={filterSvg} alt="filter" />
				</Button>
				<Button className="mobile-reset" onClick={handleClearFilters}>
					сбросить все
				</Button>
			</div>
			<Form
				form={form}
				name="psychologistFilter"
				onFinish={onFinish}
				className={`form ${activeFilter && 'active'}`}
				initialValues={initialValues}
				onValuesChange={onValuesChange}
			>
				<Form.Item name="format">
					<Select allowClear placeholder={'Формат приёма'}>
						<Option value="online">Онлайн</Option>
						<Option value="offline">Оффлайн</Option>
					</Select>
				</Form.Item>
				<Form.Item name="consultationType">
					<Select allowClear placeholder={'Вид консультации'}>
						<Option value="solo">Один человек</Option>
						<Option value="duo">Вдвоем</Option>
					</Select>
				</Form.Item>
				<Form.Item name="therapyMethodIds">
					<Select
						mode="multiple"
						placeholder={'Методы терапии'}
						style={{ minWidth: '160px', maxWidth: '360px', height: 30 }}
					>
						{therapyMethods && therapyMethods.length !== 0 ? (
							<>
								{therapyMethods.map((method) => (
									<Option key={method.id} value={method.id}>
										{method.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>
				<Form.Item name="techniqueIds">
					<Select
						mode="multiple"
						placeholder={'Психологические техники'}
						style={{ minWidth: '225px', maxWidth: '360px', height: 30 }}
					>
						{techniques && techniques.length !== 0 ? (
							<>
								{techniques.map((technique) => (
									<Option key={technique.id} value={technique.id}>
										{technique.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>
				<Form.Item name="symptomIds">
					<Select
						mode="multiple"
						placeholder={'Симптомы'}
						style={{ maxWidth: '360px', minWidth: '120px', height: 30 }}
					>
						{symptoms && symptoms.length !== 0 && (
							<>
								{symptoms.map((symptom) => (
									<Option key={symptom.id} value={symptom.id}>
										{symptom.name}
									</Option>
								))}
							</>
						)}
					</Select>
				</Form.Item>
				<Form.Item name="languages">
					<Select
						dropdownStyle={{ width: 120 }}
						placeholder={'Язык'}
						allowClear
					>
						<Option value="kazakh">Казахский</Option>
						<Option value="russian">Русский</Option>
						<Option value="english">Английский</Option>
					</Select>
				</Form.Item>
				<Form.Item name="cityId">
					<Select
						dropdownStyle={{ width: 120 }}
						placeholder={'Город'}
						allowClear
					>
						{cities && cities.length !== 0 ? (
							<>
								{cities.map((city) => (
									<Option key={city.id} value={city.id}>
										{city.name}
									</Option>
								))}
							</>
						) : (
							<></>
						)}
					</Select>
				</Form.Item>
				<Form.Item name="age">
					<Select placeholder={'Возраст психолога'} allowClear>
						{Object.entries(ageMappings).map(([key, { name }]) => (
							<Option key={key} value={key}>
								{name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="gender">
					<Select dropdownStyle={{ width: 120 }} placeholder={'Пол'} allowClear>
						<Option value="male">Мужской</Option>
						<Option value="female">Женский</Option>
					</Select>
				</Form.Item>
				<Form.Item name="lgbt">
					<Select placeholder={'Опыт работы с lgbt'} allowClear>
						<Option value={false}>Нет</Option>
						<Option value={true}>Да</Option>
					</Select>
				</Form.Item>
				<div className={'cost'}>
					<span>{cost[0].toLocaleString()} ₸</span>
					<Form.Item className={'costSlider'} name="cost">
						<Slider
							style={{ width: 120 }}
							value={cost}
							range
							max={50000}
							onChange={(value) => {
								form.setFieldsValue({ cost: value });
								setCost(value);
							}}
						/>
					</Form.Item>
					<span>{cost[1].toLocaleString()} ₸</span>
				</div>
				<Form.Item>
					<Button className={'btn-ok'} type="primary" htmlType="submit">
						применить
					</Button>
				</Form.Item>
				<Form.Item className="active">
					<Button className="reset" onClick={handleClearFilters}>
						сбросить все
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default PsychologistFilterForm;
