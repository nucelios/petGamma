import { Key, ReactNode } from 'react';
import { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export default function getItem(
	label: ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[],
	type?: 'group',
	onClick?: () => void
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
		onClick,
	};
}
