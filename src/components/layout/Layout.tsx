import { FC, useEffect } from 'react';
import { Layout, Layout as AntLayout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Header } from '../header/Header.tsx';
import { FooterMenu } from '../footer/Footer.tsx';
import './Layout.scss';
import { userSelect } from '../../features/user/userSlice.ts';
const { Content, Footer } = AntLayout;

export const CustomLayout: FC = () => {
	const location = useLocation();
	const logged = useAppSelector((state) => state.users.logged);
	const user = useAppSelector(userSelect);

	useEffect(() => {
		window.scrollTo(0, 0);

		const hash = location.hash.substring(1);
		if (hash) {
			const targetElement = document.getElementById(hash);
			if (targetElement) {
				setTimeout(() => {
					targetElement.scrollIntoView();
				}, 100);
			}
		}
	}, [location]);
	return (
		<Layout className={'container'}>
			<AntLayout.Header className={'layout_header'}>
				<Header isAuthenticated={logged} user={user} />
			</AntLayout.Header>
			<Content className={'main'}>
				<Outlet />
			</Content>
			<Footer className={'layout_footer'}>
				<FooterMenu />
			</Footer>
		</Layout>
	);
};
