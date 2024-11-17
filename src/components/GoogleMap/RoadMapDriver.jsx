/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { optimizeRoadMap } from '~/utils/OptimizeRoadMap';
import { LoggedContext } from '../Layout/LoggedLayout';

const RoadMapDriver = ({ position, defaultPosition }) => {
    const context = useContext(LoggedContext);
    const [marker, setMarker] = React.useState();
    const [direction, setDirection] = React.useState([]);
    const [center, setCenter] = React.useState({ lat: 10.848683982455805, lng: 106.63729829934456 });
    useEffect(() => {
        if (position && defaultPosition) {
            generateDirection();
        }
    }, [position]);

    const generateDirection = async () => {
        let arrPos = [{ id: defaultPosition.username, lat: defaultPosition.lat, lng: defaultPosition.lng }];
        position.forEach((data) => {
            arrPos.push({ id: data.username, lat: data.lat, lng: data.lng });
        });
        context.setShowBackDrop(true);
        let { makers, directions } = await optimizeRoadMap(arrPos);
        context.setShowBackDrop(false);
        setDirection(directions);
        setMarker(makers);
    };
    console.log(marker);
    return (
        <div>
            <GoogleMap defaultZoom={16} center={center}>
                {marker &&
                    marker.map((data, index) => (
                        <Marker
                            key={index}
                            position={{ lat: data.lat, lng: data.lng }}
                            label={`${index++} - ${data.id}`}
                        />
                    ))}
                {direction &&
                    direction.map((data, index) => (
                        <DirectionsRenderer
                            key={index}
                            directions={data}
                            options={{
                                markerOptions: { visible: false },
                                polylineOptions: { strokeColor: '#1976d2', strokeOpacity: 1, strokeWeight: 5 },
                            }}
                        />
                    ))}
            </GoogleMap>
        </div>
    );
};

export default withGoogleMap(RoadMapDriver);
