export const checkImage = (file: File) => {
	const types = ['image/png', 'image/jpeg', 'image/jpg'];
	let err = '';
	if (!file) return (err = 'File does not exist.');
	if (file.size > 2048 * 2048)
		// 1mb
		err = 'The largest image size is 2mb';

	if (!types.includes(file.type)) err = 'The image type is png / jpeg';

	return err;
};
export const imageUpload = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', 'tswkmsgv');
	formData.append('cloud_name', 'dinhquang');

	const res = await fetch(
		'https://api.cloudinary.com/v1_1/dinhquang/image/upload',
		{
			method: 'POST',
			body: formData
		}
	);

	const data = await res.json();
	return { public_id: data.public_id, url: data.secure_url };
};
