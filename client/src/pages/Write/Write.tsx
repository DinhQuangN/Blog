import React from 'react';
import EditorCustom from '../../components/CheckEditor/EditorCustom';
import Post from '../../components/Posts/Post';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { imageUpload } from '../../utils/ImageUpload';
import { postAPI } from '../../utils/Request';
import { FormSubmit, ICategory, InputChange } from '../../utils/TypeScript';

interface initialState {
	image: string;
	title: string;
	tags: string[];
	category: string;
	describe: string;
}

const Write: React.FC = () => {
	const [data, setData] = React.useState<initialState>({
		image: '',
		title: '',
		tags: [],
		category: '',
		describe: ''
	});
	const [tag, setTag] = React.useState<string>('');
	const { category } = useAppSelector(state => state);
	const { auth } = useAppSelector(state => state);
	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		e.preventDefault();
		if (e.key === 'Enter') {
			let v = [...data.tags, tag];
			setData({ ...data, tags: v });
			setTag('');
		}
	};
	const removeTag = (index: number): void => {
		let v = data.tags.filter((_, i) => i !== index);
		setData({ ...data, tags: v });
	};
	const handleImage = async (e: InputChange) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (files) {
			const file = files[0];
			const image = await imageUpload(file);
			setData({ ...data, image: image.url });
		}
	};
	const handleSubmit = async (e: FormSubmit) => {
		e.preventDefault();
		await postAPI('createBlog', data, auth.data?.access_token);
		window.location.href = '/';
	};
	console.log(data);
	return (
		<div className="flex">
			<div className="mt-[70px]">
				<Post data={data} />
			</div>
			<div className="pt-[50px]">
				{data.image ? (
					<img
						src={data.image}
						alt=""
						className="ml-[50px] w-[70vh] h-[250px] rounded-[10px] object-cover"
					/>
				) : null}
				<form action="" className="relative" onSubmit={handleSubmit}>
					<div className="ml-[50px] flex  justify-start mt-5 ">
						<label
							htmlFor="fileInput"
							className="flex items-center gap-5 cursor-pointer border border-[#ccc] border-solid px-3 py-2 rounded-md"
						>
							<span>Choose Image</span>
							<i className="bx bx-plus w-[25px] h-[25px] text-[20px] border border-solid rounded-[50%] text-[rgb(129,125,125)] flex items-center justify-center cursor-pointer"></i>
						</label>
						<input
							type="file"
							id="fileInput"
							className="hidden"
							onChange={handleImage}
						/>
					</div>
					<div className="ml-[50px] flex-col flex mt-5">
						<label htmlFor="">Title</label>
						<input
							type="text"
							name="title"
							value={data.title}
							onChange={e => setData({ ...data, title: e.target.value })}
							className="mt-2 text-[18px] border border-solid border-[#ccc] p-3 w-[50vw] placeholder:text-[rgb(189,185,185)] placeholder:font-normal focus:outline-none rounded-lg"
						/>
					</div>
					<div className="ml-[50px] flex flex-col mt-5 w-[50vw] flex-wrap-reverse">
						<label htmlFor="">Tags</label>
						<div className="mt-2 text-base border border-solid border-[#ccc] p-[5px] rounded-[5px] flex flex-1">
							{data.tags.map((item, index) => (
								<div
									className="p-[5px] border border-solid border-[#ccc] m-[5px] flex items-center rounded-[3px] bg-[#f2f2f2] inline-block!"
									key={index}
								>
									<span>{item}</span>
									<i
										className="text-base ml-[5px] bx bx-x cursor-pointer"
										onClick={() => removeTag(index)}
									></i>
								</div>
							))}

							<input
								type="text"
								className="focus:outline-none my-1 ml-4"
								name="tag"
								value={tag}
								onChange={e => setTag(e.target.value)}
								placeholder="Enter tags"
								onKeyUp={handleKeyUp}
							/>
						</div>
					</div>
					<div className="ml-[50px] mt-5 w-[50vw] ">
						<label htmlFor="">Category</label>
						<select
							id=""
							className="flex items-center mt-2 border border-solid border-[#ccc] p-2 rounded-[5px] focus:outline-none"
							name="category"
							onChange={e => setData({ ...data, category: e.target.value })}
						>
							<option value="">Select articles belonging to: </option>
							{category.data?.map((item: ICategory, index: number) => (
								<option value={item._id} key={index}>
									{item.name}
								</option>
							))}
						</select>
					</div>
					<div className="ml-[50px]  mt-5 w-[50vw]">
						<label htmlFor="" className="mb-2">
							Describe
						</label>
						{/* <EditorCustom body={textDescribe} setBody={setTextDescribe} /> */}
						<EditorCustom body={data} setBody={setData} />
					</div>
					<button
						type="submit"
						className="ml-[50px] mt-5 p-3 bg-green-700 text-white shadow-md rounded-md cursor-pointer"
					>
						Publish
					</button>
				</form>
			</div>
		</div>
	);
};

export default Write;
