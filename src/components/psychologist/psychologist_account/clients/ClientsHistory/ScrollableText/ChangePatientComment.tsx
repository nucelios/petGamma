import { FC } from 'react';
import { usePostCommentPatient } from '../../../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../../../interfaces/IRecord';
import ScrollableText from './ScrollableText';

interface Props {
	record: IRecord;
}

const ChangePatientComment: FC<Props> = ({ record }) => {
	const { mutate: postComment } = usePostCommentPatient();

	const submitComment = (comment: string) => {
		postComment({ comment, id: record.id });
	};

	return (
		<ScrollableText
			submitComment={submitComment}
			text={record.commentPatient}
		/>
	);
};

export default ChangePatientComment;
