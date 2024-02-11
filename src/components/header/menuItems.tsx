import { Button, MenuProps } from 'antd';
import React from 'react';
import logo from '../../assets/icon/logo.svg';
import styles from './Header.module.scss';
import search from '../../assets/icon/search-normal.svg';
import favorites from '../../assets/icon/love.svg';
import profile from '../../assets/icon/profile-circle.svg';
import profileBlack from '../../assets/icon/profile.svg';
import LogoutBtn from '../ui/LogoutBtn.tsx';
import record from '../../assets/icon/record.svg';
import history from '../../assets/icon/history.svg';
import heart from '../../assets/icon/heart.svg';
import book from '../../assets/icon/book-saved.svg';
import logout from '../../assets/icon/logout.svg';
import profit from '../../assets/icon/empty-wallet.svg';
import calendar from '../../assets/icon/calendar.svg';

import { NavLink } from 'react-router-dom';

export type MenuItem = Required<MenuProps>['items'][number];

type Options = {
	label?: React.ReactNode;
	key: string;
	isLink?: boolean;
	icon?: React.ReactNode;
	children?: MenuItem[];
	type?: 'group' | 'divider';
	style?: React.CSSProperties;
	className?: string;
	disable?: boolean;
	anchor?: boolean;
};

type GetItem = (options: Options) => MenuItem;

export const getItem: GetItem = ({
	key,
	label,
	isLink = false,
	icon,
	children,
	type,
	style,
	className,
	disable,
	anchor = false,
}) => {
	return {
		label: anchor ? (
			<a href={key}>{label}</a>
		) : isLink ? (
			<NavLink to={key}>{label}</NavLink>
		) : (
			label
		),
		key,
		icon,
		children,
		type,
		style,
		className,
		disable,
	};
};

export const logoItem: MenuProps['items'] = [
	getItem({
		key: '/',
		label: <img src={logo} alt={'logo'} className={styles.logo} />,
		isLink: true,
	}),
];

export const patientItems: MenuProps['items'] = [
	getItem({
		key: '#',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		key: '/patient/favorites',
		label: (
			<img src={favorites} alt={'favorites'} className={styles.customIcon} />
		),
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'l',
		children: [
			getItem({
				label: 'Профиль',
				key: 'patient/profile',
				isLink: true,
				icon: (
					<img className={styles.item_icon} src={profileBlack} alt="profile" />
				),
			}),
			getItem({
				label: 'Мои записи',
				key: 'patient/records',
				isLink: true,
				icon: <img className={styles.item_icon} src={record} alt="record" />,
			}),
			getItem({
				label: 'История посещений',
				key: 'patient/history',
				isLink: true,
				icon: <img className={styles.item_icon} src={history} alt="history" />,
			}),
			getItem({
				label: 'Избранное',
				key: 'patient/favorites',
				isLink: true,
				icon: <img className={styles.item_icon} src={heart} alt="heart" />,
			}),
			getItem({
				label: 'Курсы',
				key: '#',
				isLink: true,
				icon: <img className={styles.item_icon} src={book} alt="book" />,
			}),
			getItem({
				label: (
					<LogoutBtn>
						<img className={styles.item_icon} src={logout} alt="history" />
					</LogoutBtn>
				),
				key: 'logout',
			}),
		],
	}),
];

export const adminItems: MenuProps['items'] = [
	getItem({
		key: '#',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({
				label: 'Психологи',
				key: 'admin/psychologists',
				isLink: true,
				icon: (
					<img className={styles.item_icon} src={profileBlack} alt="profile" />
				),
			}),
			getItem({
				label: 'Посты',
				key: 'admin/posts',
				isLink: true,
				icon: <img className={styles.item_icon} src={history} alt="history" />,
			}),

			getItem({
				label: 'Методы терапии',
				key: 'admin/therapies',
				isLink: true,
				icon: <img className={styles.item_icon} src={record} alt="Therapies" />,
			}),
			getItem({
				label: 'Симтомы',
				key: 'admin/symptoms',
				isLink: true,
				icon: <img className={styles.item_icon} src={record} alt="symptoms" />,
			}),
			getItem({
				label: 'Техники',
				key: 'admin/techniques',
				isLink: true,
				icon: (
					<img className={styles.item_icon} src={record} alt="techniques" />
				),
			}),
			getItem({
				label: (
					<LogoutBtn>
						<img className={styles.item_icon} src={logout} alt="history" />
					</LogoutBtn>
				),
				key: 'logout',
			}),
		],
	}),
];

export const psychologistItems: MenuProps['items'] = [
	getItem({
		key: '#',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({
				label: 'Профиль',
				key: 'psychologist/profile',
				isLink: true,
				icon: (
					<img className={styles.item_icon} src={profileBlack} alt="profile" />
				),
			}),
			getItem({
				label: 'Календарь',
				key: 'psychologist/calendar',
				isLink: true,
				icon: <img className={styles.item_icon} src={calendar} alt="record" />,
			}),
			getItem({
				label: 'Мои Клиенты',
				key: 'psychologist/records',
				isLink: true,
				icon: <img className={styles.item_icon} src={record} alt="record" />,
			}),
			getItem({
				label: 'История записей',
				key: 'psychologist/history',
				isLink: true,
				icon: <img className={styles.item_icon} src={history} alt="history" />,
			}),
			getItem({
				label: 'Доход',
				key: 'psychologist/profit',
				isLink: true,
				icon: <img className={styles.item_icon} src={profit} alt="profit" />,
			}),
			getItem({
				label: (
					<LogoutBtn>
						<img className={styles.item_icon} src={logout} alt="history" />
					</LogoutBtn>
				),
				key: 'logout',
			}),
		],
	}),
];

export const loginAuth: MenuProps['items'] = [
	getItem({
		key: '#',
		label: <img src={search} alt={'logo'} className={styles.customIcon} />,
		isLink: true,
	}),
	getItem({
		label: <img src={profile} alt={'profile'} className={styles.customIcon} />,
		key: 'profile',
		children: [
			getItem({
				label: 'Войти как психолог',
				key: '/auth/login/psychologist',
				isLink: true,
			}),
			getItem({
				label: 'Войти как пациент',
				key: 'auth/login/patient',
				isLink: true,
			}),
		],
	}),
];

export const commonItems: MenuProps['items'] = [
	getItem({
		label: 'о сервисе',
		key: '/#services',
		anchor: true,
	}),
	getItem({
		label: 'психологи',
		key: 'psychologists',
		children: [
			getItem({
				label: 'Каталог психологов',
				key: '/psychologists/',
				isLink: true,
			}),
			getItem({
				label: 'Семейные психологи',
				key: '/psychologists/family',
				isLink: true,
			}),
			getItem({
				label: 'Детские',
				key: '/psychologists/children',
				isLink: true,
			}),
			getItem({
				label: 'Групповая терапия',
				key: '/psychologists/group-therapy',
				isLink: true,
			}),
		],
	}),
	getItem({
		label: 'соло-курсы',
		key: '#',
		isLink: true,
	}),
	getItem({
		label: 'для компаний',
		key: '/business',
		isLink: true,
	}),
	getItem({
		label: 'чувства',
		key: '/feelings',
		isLink: true,
	}),
	getItem({
		label: <Button className={styles.button}>подобрать психолога</Button>,
		key: '/psychologists',
		isLink: true,
	}),
];

export const itemsSideBar: MenuProps['items'] = [
	getItem({
		label: 'Профиль',
		key: 'profile',
		isLink: true,
		icon: <img className={styles.item_icon} src={profileBlack} alt="profile" />,
	}),
	getItem({
		label: 'Мои записи',
		key: 'records',
		isLink: true,
		icon: <img className={styles.item_icon} src={record} alt="record" />,
	}),
	getItem({
		label: 'История посещений',
		key: 'history',
		isLink: true,
		icon: <img className={styles.item_icon} src={history} alt="history" />,
	}),
	getItem({
		label: 'Избранное',
		key: 'favorites',
		isLink: true,
		icon: <img className={styles.item_icon} src={heart} alt="heart" />,
	}),
	getItem({
		label: 'Курсы',
		key: '#',
		isLink: true,
		icon: <img className={styles.item_icon} src={book} alt="book" />,
	}),
];

export const itemsSideBarPsychologists: MenuProps['items'] = [
	getItem({
		label: 'Профиль',
		key: 'profile',
		isLink: true,
		icon: <img className={styles.item_icon} src={profileBlack} alt="profile" />,
	}),
	getItem({
		label: 'Календарь',
		key: 'calendar',
		isLink: true,
		icon: <img className={styles.item_icon} src={calendar} alt="record" />,
	}),
	getItem({
		label: 'Мои Клиенты',
		key: 'records',
		isLink: true,
		icon: <img className={styles.item_icon} src={record} alt="record" />,
	}),
	getItem({
		label: 'История клиентов',
		key: 'history',
		isLink: true,
		icon: <img className={styles.item_icon} src={history} alt="history" />,
	}),
	getItem({
		label: 'Доход',
		key: 'profit',
		isLink: true,
		icon: <img className={styles.item_icon} src={profit} alt="profit" />,
	}),
];

export const itemsSideBarAdmin: MenuProps['items'] = [
	getItem({
		label: 'Психологи',
		key: 'psychologists',
		isLink: true,
		icon: <img className={styles.item_icon} src={profileBlack} alt="profile" />,
	}),
	getItem({
		label: 'Посты',
		key: 'posts',
		isLink: true,
		icon: <img className={styles.item_icon} src={history} alt="history" />,
	}),

	getItem({
		label: 'Методы терапии',
		key: 'therapies',
		isLink: true,
		icon: <img className={styles.item_icon} src={record} alt="Therapies" />,
	}),
	getItem({
		label: 'Симптомы',
		key: 'symptoms',
		isLink: true,
		icon: <img className={styles.item_icon} src={record} alt="symptoms" />,
	}),
	getItem({
		label: 'Техники',
		key: 'techniques',
		isLink: true,
		icon: <img className={styles.item_icon} src={record} alt="techniques" />,
	}),
	getItem({
		label: (
			<LogoutBtn>
				<img className={styles.item_icon} src={logout} alt="history" />
			</LogoutBtn>
		),
		key: 'logout',
	}),
];
