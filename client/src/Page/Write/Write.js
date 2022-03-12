import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Write.scss';

const Write = () => {
	const [formData, setFormData] = useState({
		title: '',
		desc: '',
		img: '',
		tags: '',
		categories: ''
	});
	const { title, desc, img, tags, categories } = formData;
	const token = useSelector(state => state.token);
	const name = useSelector(state => state.auth.user.name);
	const cat = useSelector(state => state.category);

	const uploadImage = async e => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setFormData({ ...formData, img: base64 });
	};
	const convertBase64 = file => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = error => {
				reject(error);
			};
		});
	};
	const handleOnclickPublish = async e => {
		e.preventDefault();
		try {
			await axios.post(
				'http://localhost:5000/post',
				{
					title,
					desc,
					img,
					tags,
					categories,
					name
				},
				{ headers: { Authorization: token } }
			);
			window.location.href = '/';
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<div className="write">
			<img src={formData.img} alt="" className="writeImg" />
			<form action="" className="writeForm">
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="writeIcon bx bx-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: 'none' }}
						onChange={e => {
							uploadImage(e);
						}}
					/>
					<input
						type="text"
						className="writeInput"
						placeholder="Title"
						value={title}
						onChange={value =>
							setFormData({ ...formData, title: value.target.value })
						}
						autoFocus={true}
					/>
				</div>
				<div className="writeFormGroup">
					<input
						type="text"
						placeholder="Tags"
						autoFocus={true}
						className="writeInput"
						onChange={value =>
							setFormData({
								...formData,
								tags: value.target.value.split(', ')
							})
						}
					/>
				</div>
				<select
					className="writeFormGroup writeSelect"
					defaultValue={'Categories'}
					onChange={e =>
						setFormData({ ...formData, categories: e.target.value })
					}
				>
					<option value="Categories" disabled>
						Categories
					</option>
					{cat?.map((item, index) => (
						<option key={index}>{item.name}</option>
					))}
				</select>
				<div className="writeFormGroup">
					<textarea
						name=""
						id=""
						cols="30"
						rows="10"
						className="writeInput writeText"
						placeholder="Tell your story..."
						autoFocus={true}
						value={desc}
						onChange={value =>
							setFormData({ ...formData, desc: value.target.value })
						}
					></textarea>
				</div>
				<button
					className="writeSubmit"
					type="submit"
					onClick={handleOnclickPublish}
				>
					Publish
				</button>
			</form>
		</div>
	);
};

export default Write;
