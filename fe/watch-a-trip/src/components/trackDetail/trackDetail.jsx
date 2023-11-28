import { useEffect, useRef, useState } from 'react';
import {
	MapContainer,
	Marker,
	TileLayer,
	Polyline,
	FeatureGroup,
} from 'react-leaflet';
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { defaultIcon } from '../leaflet/marker';
import Navbar from '../navigation/navbar';
import { getLocation } from '../track/getCoords';
import NoSleep from 'nosleep.js';
import LeafletMeta from '../leaflet/helmet';
import { socket } from '../socket/socketInit';
import { api } from '../axios/api';

const TrackDetail = () => {
	const mapRef = useRef(0);
	const [myCurrentLocation, setMyCurrentLocation] = useState({});
	const markerRef = useRef(0);
	const polylineRef = useRef(0);
	const groupRef = useRef(0);
	const [coordinate, setCoordinate] = useState([]);
	const noSleep = new NoSleep();
	const navigate = useNavigate();
	const { id } = useParams();
	const { state } = useLocation();

	socket.emit('client-coordinate', coordinate, id);

	const getCoords = () => {
		getLocation().then((data) => {
			setCoordinate((coor) => {
				if (coor.length < 1) {
					return [...coor, [data.lat, data.lng]];
				}
				if (
					coor.length > 0 &&
					data.lat === coor[coor.length - 1][0] &&
					data.lng === coor[coor.length - 1][1]
				) {
					return [...coor];
				} else {
					return [...coor, [data.lat, data.lng]];
				}
			});
			data.lat && setMyCurrentLocation({ lat: data.lat, lng: data.lng });
			mapRef.current.setView([data.lat, data.lng]);
			markerRef.current.setLatLng([data.lat, data.lng]);
		});
	};

	useEffect(() => {
		if (!state) {
			navigate('/notCredible');
		}
		console.log(state);
		const checkUserValid = api
			.post('/users/checkToken', { token: state.data.userToken.token })
			.then((data) => {
				console.log(data);
				if (!data.data.id) {
					navigate('/notCredible');
				}
			});

		socket.emit('join-room', id, 'tracker');
		getCoords();
		noSleep.enable();
		setInterval(() => {
			getCoords();
		}, 3000);
	}, []);

	return (
		<div>
			<LeafletMeta />
			<div className="z-20 position-absolute">
				<Navbar />
			</div>
			<div className="md:flex">
				<div className="md:w-[80%]">
					<MapContainer
						center={
							myCurrentLocation.lat
								? [myCurrentLocation.lng, myCurrentLocation.lat]
								: [-5, 119]
						}
						ref={mapRef}
						zoom={17}
						style={{ height: '85vh' }}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<FeatureGroup ref={groupRef}>
							<Marker
								icon={defaultIcon}
								ref={markerRef}
								position={[
									myCurrentLocation.lat ? myCurrentLocation.lat : 0,
									myCurrentLocation.lng ? myCurrentLocation.lng : 0,
								]}
							/>
							<Polyline
								ref={polylineRef}
								pathOptions={{ color: 'lime' }}
								positions={coordinate}
							/>
						</FeatureGroup>
					</MapContainer>
				</div>
				<div className='w-[100%] md:w-[30%]'>
					<div className='p-3'>
						<h1 className='font-bold text-xl text-sky-600'>{state.data.user.name}</h1>
						<p>ke {state.data.user.destination}</p>
						<hr className='w-full'/>
						<h2 className='font-bold pt-2'>In track</h2>
						<div className='p-1'>
							<p className='bg-sky-200 my-1 p-2'>halo</p>
							<p className='bg-sky-200 my-1 p-2'>halo</p>
							<p className='bg-sky-200 my-1 p-2'>halo</p>
						</div>
					</div>
				</div>
			</div>
			{/* <img src="/marker-icon-2x.png" alt="" /> */}
		</div>
	);
};

export default TrackDetail;
