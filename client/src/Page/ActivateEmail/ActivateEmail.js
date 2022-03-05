import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivateEmail = () => {
	const { activation } = useParams();
	console.log(activation);
	const [err, setErr] = useState('');
	const [success, setSuccess] = useState('');
	useEffect(() => {
		if (activation) {
			const activationEmail = async () => {
				try {
					const res = await axios.post(
						'http://localhost:5000/user/activation',
						{ activation }
					);
					setSuccess(res.data.message);
				} catch (error) {
					error.response.data.message && setErr(error.response.data.message);
				}
			};
			activationEmail();
		}
	}, [activation]);
	return (
		<div>
			<div>{err}</div>
			<div>{success}</div>
		</div>
	);
};

export default ActivateEmail;
