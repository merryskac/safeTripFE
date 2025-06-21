import Navbar from '../navigation/navbar';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Helmet } from 'react-helmet';
import UserForm from './userForm';
// import { noSleep } from '../axios/nosleep/nosleep';

const Track = () => {
	const [myCurrentLocation, setMyCurrentLocation] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({});
	const [reverseGeo, setReverseGeo] = useState(null);
	const markerRef = useRef(0);
	const mapRef = useRef(0);
	let errorTimer;

	sessionStorage.clear()

	const getLocation = new Promise((resolve, reject) => {
		{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position, error) => {
					if (error) {
						reject(error);
					}
					setMyCurrentLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setLoading(false);
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				});

				errorTimer = setTimeout(() => {
					setLoading(false);
					!myCurrentLocation.lat &&
						setError({ ...error, geo: 'Failed to fetch map.' });
				}, 10000);
				myCurrentLocation && clearTimeout(errorTimer);
			} else {
				reject('Cannot get data.');
			}
		}
	});

	const getCoordAndLoc = () => {
		getLocation.then(
			(data) => {
				mapRef.current.setView([data.lat, data.lng]);
				console.log(data);
				fetch(
					`https://us1.locationiq.com/v1/reverse?key=pk.4dd09f0d7cfb928a5e9d242ebbcfe7d9&lat=${data.lat}&lon=${data.lng}&format=json&_gl=1*zfjwhb*_ga*MTg3MDA2ODUzNi4xNzAwMTk1Njkw*_ga_TRV5GF9KFC*MTcwMDE5NTY5MC4xLjEuMTcwMDE5NTc5MS4wLjAuMA..`
				)
					.then((data) => data.json())
					.then((data) => {
						setReverseGeo(data);
						setError({ ...error, geo: null });
						console.log(data);
					});
			},
			(error) => {
				console.log(error);
			}
		);
	};

	useEffect(() => {
		getCoordAndLoc();
	}, []);

	return (
		<div className='font-["poppins"]'>
			<Helmet>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
					crossOrigin=""
				/>
				<script
					src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
					integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
					crossOrigin=""></script>
			</Helmet>

			<Navbar />

			<div className="w-full p-7 mb-10">
				<div className="px-5 xl:flex">
					<div className="xl:w-[50%] sm:mb-8 mt-4">
						<h2 className="text-sky-700 text-2xl font-bold">
							Pastikan titik lokasi anda sesuai
						</h2>
						<p className="mb-4">Untuk melihat akurasi sistem GPS anda</p>
						{error.geo && <p className="text-red-500">{error.geo}</p>}
						{loading && (
							<p className="text-sky-600 text-sm">
								Loading... <br />
								Mendapatkan lokasi anda
							</p>
						)}
						{
							<MapContainer
								center={
									myCurrentLocation.lat
										? [myCurrentLocation.lng, myCurrentLocation.lat]
										: [-5, 119]
								}
								ref={mapRef}
								zoom={17}
								style={{ height: '500px' }}>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<Marker
									// icon={'marker-icon-2x.png'}
									ref={markerRef}
									position={[
										myCurrentLocation.lat ? myCurrentLocation.lat : 0,
										myCurrentLocation.lng ? myCurrentLocation.lng : 0,
									]}
								/>
							</MapContainer>
						}
						<button
							className="bg-sky-400 p-3 rounded-md my-3 text-white"
							onClick={getCoordAndLoc}>
							Refresh lokasi
						</button>
						{myCurrentLocation.lat && (
							<p>
								Lokasi anda: {myCurrentLocation.lat}, {myCurrentLocation.lng}
							</p>
						)}
						{reverseGeo && <p>{reverseGeo.display_name}</p>}
					</div>
					<div className="xl:px-7 flex-none xl:w-[50%]">
						<hr className="xl:invisible md:visible mb-2" />
						<UserForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Track;
