import { useEffect, useRef, useState } from 'react';
import {
	FeatureGroup,
	MapContainer,
	Marker,
	Polyline,
	TileLayer,
} from 'react-leaflet';
import LeafletMeta from '../leaflet/helmet';
import Navbar from '../navigation/navbar';
import { defaultIcon } from '../leaflet/marker';
import { useParams } from 'react-router-dom';
import { socket } from '../socket/socketInit';
import NoSleep from 'nosleep.js';

const WatchTrack = () => {
	const mapRef = useRef(0);
	const groupRef = useRef(0);
	const markerRef = useRef(0);
	const polylineRef = useRef(0);

	const [coordinate, setCoordinate] = useState([]);
	const [myCurrentLocation, setMyCurrentLocation] = useState({});

	const { id } = useParams();

	const noSleep = new NoSleep();
	socket.on('watcher-coordinate', (data) => {
		setCoordinate(data);
		setMyCurrentLocation({
			lat: data[data.length - 1][0],
			lng: data[data.length - 1][1],
		});
		mapRef.current.setView([
			data[data.length - 1][0],
			data[data.length - 1][1],
		]);
		markerRef.current.setLatLng([
			data[data.length - 1][0],
			data[data.length - 1][1],
		]);
		
	});
	
	useEffect(() => {
		noSleep.enable();
		socket.emit('join-room', id, 'watcher ');
	}, []);
	return (
		<div>
			<LeafletMeta />
			<Navbar />

			<div className="flex">
				<div className="w-[70%]">
					<MapContainer
						center={[-5, 119]}
						ref={mapRef}
						zoom={17}
						style={{ height: '100vh' }}>
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
				<div>
					<div>halohalo</div>
				</div>
			</div>
		</div>
	);
};

export default WatchTrack;
