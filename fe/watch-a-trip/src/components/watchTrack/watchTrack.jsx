import { useEffect, useRef, useState } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from "react-leaflet";
import LeafletMeta from "../leaflet/helmet";
import Navbar from "../navigation/navbar";
import { defaultIcon } from "../leaflet/marker";
import { useParams } from "react-router-dom";
import { socketFunction } from "../socket/socketInit";
import NoSleep from "nosleep.js";
import { useSocket } from "../socket/socketProvider";

const WatchTrack = () => {
  const mapRef = useRef(0);
  const groupRef = useRef(0);
  const markerRef = useRef(0);
  const polylineRef = useRef(0);

  const [coordinate, setCoordinate] = useState([]);
  const [myCurrentLocation, setMyCurrentLocation] = useState({});

  const { id } = useParams();

  const socket = useSocket();
  // const socket = socketFunction(id)

  const noSleep = new NoSleep();

  const coordinateSet = (data) => {
    console.log(data);
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
  };

  const socketWatcher = () => {
    socket.emit("watcher-join", `abc`, id);
    socket.emit("join-room", id, "watcher ", socket.id);
  };

  useEffect(() => {
    if (socket == null) return;
    socket.on("watcher-coordinate", (data) => {
      console.log(data);
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

    socket.on("connect", () => {
      socket.emit("watcher-join", `abc`, id);
      socket.emit("join-room", id, "watcher ", socket.id);
    });

    return () => {
      // socket.off('watcher-coordinate');
      socket.off("connect");
    };
  }, [socket]);

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
            style={{ height: "100vh" }}
          >
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
                pathOptions={{ color: "lime" }}
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
