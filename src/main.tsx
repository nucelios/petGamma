import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ConfigProvider
				locale={ruRU}
				theme={{
					token: {
						colorPrimary: '#9F67FD',
						borderRadius: 8,
					},
					components: {
						Button: {
							colorPrimary: '#9F67FD',
							algorithm: true,
						},
						Input: {
							colorPrimary: '#9F67FD',
							algorithm: true,
						},

						Table: {
							headerBg: '#FFF',
							headerColor: '#9F9F9F',
							fontFamily: 'Montserrat',
							fontWeightStrong: 400,
							borderRadius: 20,
							colorBgContainer: '#FFF',
						},

						Slider: {
							colorBgBase: 'transparent',
						},
						Tooltip: {
							colorBgBase: '#9F9F9F !important',
						},
					},
				}}
			>
				<App />
			</ConfigProvider>
		</PersistGate>
	</Provider>
);
