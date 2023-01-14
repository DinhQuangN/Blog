import React from 'react';
import { IComment } from '../../utils/TypeScript';
import EditorLiteCustom from '../CheckEditor/EditorLiteCustom';

interface IProps {
	callback: (body: string) => void;
	edit?: IComment;
	setEdit?: (edit?: IComment) => void;
}

const Input: React.FC<IProps> = ({ callback, edit, setEdit }) => {
	const [body, setBody] = React.useState('');
	const divRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (edit) setBody(edit.content);
	}, [edit]);

	const handleSubmit = () => {
		const div = divRef.current;
		const text = div?.innerText as string;
		if (!text.trim()) {
			if (setEdit) return setEdit(undefined);
			return;
		}

		callback(body);

		setBody('');
	};

	return (
		<div>
			<EditorLiteCustom body={body} setBody={setBody} />

			<div
				ref={divRef}
				dangerouslySetInnerHTML={{
					__html: body
				}}
				style={{ display: 'none' }}
			/>

			<button className=" block px-4 mt-2" onClick={handleSubmit}>
				{edit ? 'Update' : 'Send'}
			</button>
		</div>
	);
};

export default Input;
