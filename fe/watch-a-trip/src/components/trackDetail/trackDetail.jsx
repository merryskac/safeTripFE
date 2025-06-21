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
import { socketFunction } from '../socket/socketInit';
import { api } from '../axios/api';
import { useSocket } from '../socket/socketProvider';

const TrackDetail = () => {
	const { id } = useParams();
	// const socket = socketFunction(id)
	const mapRef = useRef(0);
	const [myCurrentLocation, setMyCurrentLocation] = useState({});
	const markerRef = useRef(0);
	const polylineRef = useRef(0);
	const groupRef = useRef(0);
	const navigate = useNavigate();
	const { state } = useLocation();
	const [watcher, setWatcher] = useState([]);
	let sessionStorageCoordinate;
	const socket = useSocket();

	const getCoords = () => {
		getLocation().then((data) => {
			sessionStorageCoordinate = JSON.parse(
				sessionStorage.getItem('coordinate')
			);

			data.lat && setMyCurrentLocation({ lat: data.lat, lng: data.lng });
			mapRef.current.setView([data.lat, data.lng]);
			markerRef.current.setLatLng([data.lat, data.lng]);

			if (!sessionStorageCoordinate) {
				sessionStorage.setItem(
					'coordinate',
					JSON.stringify([[data.lat, data.lng]])
				);

				socket.emit(
					'client-coordinate',
					JSON.parse(sessionStorage.getItem('coordinate')),
					id
				);
			} else if (
				data.lat !==
					sessionStorageCoordinate[sessionStorageCoordinate.length - 1][0] ||
				data.lng !==
					sessionStorageCoordinate[sessionStorageCoordinate.length - 1][1]
			) {
				console.log('emmitting');
				sessionStorage.setItem(
					'coordinate',
					JSON.stringify([
						...JSON.parse(sessionStorage.getItem('coordinate')),
						[data.lat, data.lng],
					])
				);
				socket.emit(
					'client-coordinate',
					JSON.parse(sessionStorage.getItem('coordinate')),
					id
				);
			}
		});
	};

	const watcherSet = (watcherId, watcherName) => {
		socket.emit(
			'client-coordinate',
			JSON.parse(sessionStorage.getItem('coordinate')),
			id
		);
		setWatcher([...watcher, { id: watcherId, name: watcherName }]);
	};

	const watcherDisconnectSet = (id) => {
		setWatcher(watcher.filter((watch) => watch.id !== id));
	};

	useEffect(() => {
		if (socket == null) return;
		console.log('running');

		socket.emit('join-room', id, 'tracker');

		socket.on('watcher-joining', watcherSet);

		socket.on('watcher-disconnect', watcherDisconnectSet);

		if (!state) {
			navigate('/notCredible');
		}
		// getCoords();
		setInterval(() => {
			getCoords();
		}, 5000);
		return () => {
			socket.off('watcher-joining');
			socket.off('watcher-disconnect');
		};
	}, [socket]);

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
								positions={
									JSON.parse(sessionStorage.getItem('coordinate')) ||
									myCurrentLocation
								}
							/>
						</FeatureGroup>
					</MapContainer>
				</div>
				<div className="w-[100%] md:w-[30%]">
					<div className="p-3">
						<h1 className="font-bold text-xl text-sky-600">
							{state.data.user.name}
						</h1>
						<p>ke {state.data.user.destination}</p>
						<hr className="w-full" />
						<h2 className="font-bold pt-2">In track</h2>
						<div className="p-1">
							{watcher.map((watch) => {
								// console.log(watch)
								return (
									<div className="bg-sky-200 my-1 p-2" key={watch.id}>
										<p className="text-lg">{watch.name}</p>
										<p className="text-xs">{watch.id}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			{/* <img src="/marker-icon-2x.png" alt="" /> */}
		</div>
	);
};

export default TrackDetail;
