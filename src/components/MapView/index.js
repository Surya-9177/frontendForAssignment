
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Cookies from 'js-cookie'
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

const MapView = (props) => {
  const [mapData, setMapData] = useState([]);
  const {id} = useParams()
  useEffect(() => {
    const getMapData = async () => {
        let token = Cookies.get('jwt_token');
        const url = `http://localhost:3000/map/${id}`;
        const opt = {
            method: 'GET',
            headers: {
                    Authorization: `Bearer ${token}`,
                }
        }
        const response = await fetch(url, opt);
        const data = await response.json()
        if (response.ok){
            setMapData(data)
        }
        console.log('hiiiii')
    }
    getMapData()
  }, []);

  const renderMapView = () => {
    const position = [mapData.lattitude, mapData.longitude];
    const customIcon = new L.Icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
    console.log(mapData);
    console.log(typeof(mapData.longitude));

    if (!mapData || !mapData.lattitude || !mapData.longitude) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Map View</h2>
            <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  {mapData.location}
                </Popup>
              </Marker>
            </MapContainer>
        </div>
    );
};

  return (
    <div>{renderMapView()}</div>
  );
};

export default MapView;

