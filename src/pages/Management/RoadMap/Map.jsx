import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';

const Map = () => {
    return (
        <div>
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{ lat: 10.848683982455805, lng: 106.63729829934456 }}
            ></GoogleMap>
        </div>
    );
};

export default withScriptjs(withGoogleMap(Map));
