import { MenuProps } from 'antd';
import { Key } from 'react';
import getItem from '../getItem';

describe('getItem', () => {
	test('creates MenuItem with provided parameters', () => {
		const label = 'Item Label';
		const key: Key = 'itemKey';
		const icon = <span>Icon</span>;
		const children: Required<MenuProps>['items'][number][] = [
			{
				key: 'childKey',
				label: 'Child Label',
			},
		];
		const type = 'group';
		const onClick = jest.fn();

		const result = getItem(label, key, icon, children, type, onClick);

		expect(result).toEqual({
			key,
			icon,
			children,
			label,
			type,
			onClick,
		});
	});

	test('creates MenuItem with default values when optional parameters are not provided', () => {
		const label = 'Item Label';
		const key: Key = 'itemKey';

		const result = getItem(label, key);

		expect(result).toEqual({
			key,
			label,
		});
	});
});
