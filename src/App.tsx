import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/_normalize.scss';
import './assets/styles/_reser.scss';
import Login from './containers/auth/login/Login.tsx';
import Register from './containers/auth/register/Register.tsx';
import PsychologistAccountPage from './containers/psychologist/personal_account/PsychologistAccountPage.tsx';
import PsychologistDetailedProfileContainer from './containers/psychologist/detailed_profile/PsychologistDetailedProfileContainer.tsx';
import PatientAccountPage from './containers/patient/personal_account/PatientAccountPage.tsx';
import { BusinessPage } from './components/businessPage/BusinessPage.tsx';
import { ArticlePageContainer } from './containers/articles/ArticlePageContainer.tsx';
import { ArticleDetailed } from './components/article/articleDetailed/ArticleDetailed.tsx';
import { PsychologistsListContainer } from './containers/psychologists/catalog/PsychologistsListContainer.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomLayout } from './components/layout/Layout.tsx';
import Favorites from './components/patient/patient_account/favorites/Favorites.tsx';
import { useAppSelector } from './store/hooks.ts';
import { ActivePage } from './containers/auth/activeMailPage/ActivePage/ActivePage.tsx';
import { MailConfirmation } from './containers/auth/activeMailPage/MailConfirmation/MailConfirmation.tsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Calendars from './components/psychologist/psychologist_account/calendar/Calendar.tsx';
import PatientProfile from './components/patient/patient_account/profile/PatientProfile.tsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.tsx';
import PsychologistRegister from './containers/register/PsychologistRegister.tsx';
import AdminPage from './containers/adminPage/AdminPage.tsx';
import Psychologists from './components/admin/psychologists/Psychologists.tsx';
import { Posts } from './components/admin/posts/Posts.tsx';
import LoginAdminBuilder from './containers/auth/admin/LoginAdminBuilder.tsx';
import ResetPassword from './containers/auth/resetPassword/ResetPassword.tsx';
import ResetForgot from './containers/auth/resetForgot/ResetForgot.tsx';
import { PageNotFound } from './containers/pageNotFound/PageNotFound.tsx';
import { MainPage } from './containers/mainPage/MainPage.tsx';
import { ConsultationTypePsychologists } from './containers/psychologists/catalog/ConsultationTypePsychologists.tsx';
import { Symptoms } from './components/admin/symptoms/Symptoms.tsx';
import { Technique } from './components/admin/technique/Technique.tsx';
import { Method } from './components/admin/method/Method.tsx';
import { Feelings } from './containers/feelings/Feelings.tsx';
import FullPostInformation from './containers/feelings/FullPostInformation.tsx';
import ClientsTable from './components/psychologist/psychologist_account/clients/ClientsTable/ClientsTable.tsx';
import ClientsHistory from './components/psychologist/psychologist_account/clients/ClientsHistory/ClientsHistory.tsx';
import MyRecords from './components/patient/patient_account/records/myRecords/MyRecords.tsx';
import RecordsHistory from './components/patient/patient_account/records/recordsHistory/RecordsHistory.tsx';
import Profit from './components/psychologist/psychologist_account/Profit/Profit.tsx';
import { Profile } from './components/psychologist/psychologist_account/ProfileContent/ProfileContent.tsx';
import { RootState } from './store';

dayjs.extend(utc);
dayjs.locale('ru');

const queryClient = new QueryClient();
const App = () => {
	const user = useAppSelector((state: RootState) => state.users.userInfo);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<CustomLayout />}>
						<Route
							path="/auth/login/patient"
							element={<Login role="patient" />}
						/>
						<Route
							element={
								<ProtectedRoute
									isAllowed={user ? user.isActivated : true}
									redirectPath={'/auth/confirmation'}
								/>
							}
						>
							<Route path="/" element={<MainPage />} />
							<Route
								path="auth/login/psychologist"
								element={<Login role="psychologist" />}
							/>
							<Route path="/auth/reset-forgot" element={<ResetForgot />} />
							<Route path="/auth/reset-password" element={<ResetPassword />} />

							<Route
								path="/auth/register/patient"
								element={<Register role="patient" />}
							/>

							<Route path="*" element={<PageNotFound />} />
							<Route
								path="/auth/register/psychologist"
								element={<PsychologistRegister />}
							/>
							<Route
								path="/psychologists/"
								element={<PsychologistsListContainer />}
							/>
							<Route
								path="/psychologists/family"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'duo' }}
									/>
								}
							/>
							<Route
								path="/psychologists/children"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'children' }}
									/>
								}
							/>
							<Route
								path="/psychologists/group-therapy"
								element={
									<ConsultationTypePsychologists
										filterValue={{ consultationType: 'group' }}
									/>
								}
							/>
							<Route
								path="/psychologists/:id"
								element={<PsychologistDetailedProfileContainer />}
							/>
							<Route path="/business" element={<BusinessPage />} />
							<Route path="/feelings" element={<Feelings />} />
							<Route path="/feelings/:id" element={<FullPostInformation />} />
							<Route path="/articles" element={<ArticlePageContainer />} />
							<Route
								path="/articles/:id"
								element={<ArticleDetailed id={1} />}
							/>
							<Route path="/patient" element={<PatientAccountPage />}>
								<Route path="profile" element={<PatientProfile />} />
								<Route path="records" element={<MyRecords />} />
								<Route path="history" element={<RecordsHistory />} />
								<Route path="favorites" element={<Favorites />} />
							</Route>

							<Route path="/psychologist" element={<PsychologistAccountPage />}>
								<Route path="profile" element={<Profile />} />
								<Route path="records" element={<ClientsTable />} />
								<Route path="history" element={<ClientsHistory />} />
								<Route path="calendar" element={<Calendars />} />
								<Route path="profit" element={<Profit />} />
							</Route>

							<Route path="/admin">
								<Route index element={<LoginAdminBuilder />} />
								<Route
									element={
										<ProtectedRoute
											isAllowed={user?.role === 'admin'}
											redirectPath={''}
										/>
									}
								>
									<Route element={<AdminPage />}>
										<Route path="psychologists" element={<Psychologists />} />
										<Route path="posts" element={<Posts />} />
										<Route path="symptoms" element={<Symptoms />} />
										<Route path="techniques" element={<Technique />} />
										<Route path="therapies" element={<Method />} />
									</Route>
								</Route>
							</Route>
						</Route>

						<Route path="/auth/activate/:id" element={<ActivePage />} />
						<Route path="/auth/confirmation" element={<MailConfirmation />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
