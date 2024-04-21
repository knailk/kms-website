import React, { useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

const Map = ({ position, setPosition }) => {
    const [maker, setMaker] = React.useState();
    const [center, setCenter] = React.useState({ lat: 10.848683982455805, lng: 106.63729829934456 });
    useEffect(() => {
        if (position && position.address && position.lat && position.lng) {
            setMaker({ lat: position.lat, lng: position.lng });
            setCenter({ lat: position.lat, lng: position.lng });
        }
    }, [position]);

    const handleMapClick = (e) => {
        getGeocode({ latLng: { lat: e.latLng.lat(), lng: e.latLng.lng() } }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setPosition({ address: results[0].formatted_address, lat, lng });
        });
    };

    return (
        <div>
            <GoogleMap defaultZoom={16} center={center} onClick={handleMapClick}>
                {maker && <Marker position={maker} />}
            </GoogleMap>
        </div>
    );
};

export default withGoogleMap(Map);
