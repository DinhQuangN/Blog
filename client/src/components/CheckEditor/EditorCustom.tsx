import React from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imageUpload } from '../../utils/ImageUpload';

interface initialState {
	image: string;
	title: string;
	tags: string[];
	category: string;
	describe: string;
}
let container = [
	[{ font: [] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction
	[{ align: [] }],

	['clean', 'link', 'image', 'video']
];
interface IProps {
	setBody: React.Dispatch<React.SetStateAction<initialState>>;
	body: initialState;
}
const EditorCustom: React.FC<IProps> = ({ body, setBody }) => {
	const modules = {
		toolbar: { container }
	};
	const quillRef = React.useRef<Quill>(null);
	const handleChangeImage = React.useCallback(() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.click();
		input.onchange = async () => {
			const files = input.files;
			if (!files) return;
			const file = files[0];
			const photo = await imageUpload(file);
			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index;
			if (range !== undefined) {
				quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
			}
		};
	}, []);
	React.useEffect(() => {
		const quill = quillRef.current;
		if (!quill) return;
		let toolbar = quill.getEditor().getModule('toolbar');
		toolbar.addHandler('image', handleChangeImage);
	}, [handleChangeImage]);
	return (
		<Quill
			theme="snow"
			modules={modules}
			placeholder="Write somethings"
			value={body.describe}
			onChange={e => setBody({ ...body, describe: e })}
			className="mt-2 rounded-md"
			ref={quillRef}
			style={{ backgroundColor: '#fff' }}
		/>
	);
};

export default EditorCustom;
