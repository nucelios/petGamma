import { Input } from 'antd';
import { useState, useEffect } from 'react';
import Alert from '../../../../../ui/Alert/Alert';

interface Props {
	text: string;
	submitComment: (comment: string) => void;
}

const ScrollableText: React.FC<Props> = ({ text, submitComment }) => {
	const [comment, setComment] = useState(text);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (text !== comment) setComment(text);
	}, [text]); // Нельзя ставить comment в зависимости

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				verticalAlign: 'center',
			}}
		>
			<Alert title={'Полный комментарий'} message={text}>
				<Input.TextArea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					onBlur={() => {
						setIsFocused(false);
						submitComment(comment);
					}}
					onFocus={() => setIsFocused(true)}
					onPressEnter={() => {
						setIsFocused(false);
						submitComment(comment);
					}}
					style={{
						resize: 'none',
						height: isFocused ? '100px' : 'auto',
						overflowY: 'auto',
						width: '100%',
						boxSizing: 'border-box',
						wordWrap: 'break-word',
					}}
				/>
			</Alert>
		</div>
	);
};

export default ScrollableText;
