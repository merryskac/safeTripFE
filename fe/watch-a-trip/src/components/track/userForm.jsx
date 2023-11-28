import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { api } from '../axios/api';

const UserForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [userData, setUserData] = useState({});

	const formSubmit = (e) => {
		e.preventDefault();

		const input = api.post('/users', formData).then((data) => {
			if (data.statusText === 'OK') {
				console.log(data);
				navigate(`/track/detail/${data.data.user._id}`,{
					state: {
						data: data.data
					}
				})
			}
		});

		// navigate('/track/:id');
	};
	return (
		<div>
			<h2 className="text-sky-700 text-2xl font-bold">Input data kamu</h2>
			<p>Kami memastikan datamu aman</p>
			<form action="" className="w-full" onSubmit={(e) => formSubmit(e)}>
				<input
					type="text"
					placeholder="Nama kamu"
					className="md:w-[70%] m-2 p-2 border-2 rounded"
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Mau ke mana?"
					className="md:w-[70%] m-2 p-2 border-2 rounded"
					onChange={(e) =>
						setFormData({ ...formData, destination: e.target.value })
					}
				/>
				<textarea
					name="phonenumbers"
					id=""
					cols="30"
					rows="10"
					className="w-[70%] mt-2 -mb-1 mx-2 p-2 border-2 rounded"
					placeholder="Masukkan nomor hp orang terdekat anda (format 08******)"
					onChange={(e) => {
						const phone = e.target.value.split(' ');
						setFormData({ ...formData, contacts: phone });
					}}></textarea>
				<p className="mx-2 text-xs">*Pisahkan tiap hp dengan spasi.</p>
				<p className="mx-2 text-xs">
					**Nomor hp yang tertera akan dikirimi link yang bisa memantau
					perjalananmu.
				</p>
				<button
					className="bg-sky-500 p-3 rounded text-white mt-3"
					type="submit">
					Mulai track
				</button>
			</form>
		</div>
	);
};

export default UserForm;
