import { FC } from 'react';
import { usePostCommentPsychologist } from '../../../../../../features/queryHooks/queryHooks';
import { IRecord } from '../../../../../../interfaces/IRecord';
import ScrollableText from './ScrollableText';

interface Props {
	record: IRecord;
}

const ChangePsychologistComment: FC<Props> = ({ record }) => {
	const { mutate: postComment } = usePostCommentPsychologist();

	const submitComment = (comment: string) => {
		postComment({ comment, id: record.id });
	};

	return (
		<ScrollableText
			submitComment={submitComment}
			text={record.commentPsychologist}
		/>
	);
};

export default ChangePsychologistComment;
