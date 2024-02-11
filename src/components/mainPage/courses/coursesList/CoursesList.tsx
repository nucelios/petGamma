import './CoursesList.scss';
import { courses } from '../../../../mocks/courses';
import { Button } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export const CoursesList: React.FC = () => {
	return (
		<div className="courses-container">
			<div className="courses-container__header">
				<Title className="title">соло-курсы</Title>
				<Link to={'/'} className="pagination-btn next">
					&gt;
				</Link>
			</div>

			<div className="courses-list">
				{courses.map((course) => (
					<div key={course.id} className="courses-list__card">
						<Title className="courses-list__title">{course.title}</Title>
						<Typography className="courses-list__text">
							{course.description}
						</Typography>
						<Button className="courses-list__record-button">записаться</Button>
					</div>
				))}
			</div>
		</div>
	);
};
