export const uploadService = {
	uploadImg,
};

function uploadImg(file) {
	const CLOUD_NAME = 'daslultxe';
	const UPLOAD_PRESET = 'doreme';
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

	const formData = new FormData();
	formData.append('upload_preset', UPLOAD_PRESET);
	formData.append('file', file);

	return fetch(UPLOAD_URL, {
		method: 'POST',
		body: formData,
	})
		.then(res => res.json())
		.then(res => {
			return res.url;
		})
		.catch(err => console.log(err, ' error! did not upload to cloudinary'));
}
