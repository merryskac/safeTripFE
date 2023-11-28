import { useRef } from "react";
import { Helmet } from "react-helmet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import SetMarkerByPosition from "./setMapCenter";

// eslint-disable-next-line react/prop-types
const LeafletMap = (props) => {
  const myCurrentLocation = props.myCurrentLocation
  const markerRef = useRef(0)
  return ( <div>
    <MapContainer
							center={
								myCurrentLocation.lat
									? [myCurrentLocation.lng, myCurrentLocation.lat]
									: [0, 0]
							}
							zoom={17}
							style={{ height: '500px' }}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker
								ref={markerRef}
								position={[
									myCurrentLocation.lat ? myCurrentLocation.lat : 0,
									myCurrentLocation.lng ? myCurrentLocation.lng : 0,
								]}
							/>
							<SetMarkerByPosition
								lat={myCurrentLocation.lat ? myCurrentLocation.lat : 0}
								lng={myCurrentLocation.lng ? myCurrentLocation.lng : 0}
							/>
						</MapContainer>
  </div> );
}
 
export default LeafletMap;