import Map from './Map';
import RoadMapDriver from './RoadMapDriver';

function GoogleMap({ position, setPosition, type = '', defaultPosition }) {
    return (
        <>
            {!type && (
                <Map
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%`, margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    position={position}
                    setPosition={setPosition}
                />
            )}
            {type === 'road-map' && (
                <RoadMapDriver
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%`, margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    position={position}
                    defaultPosition={defaultPosition}
                />
            )}
        </>
    );
}

export default GoogleMap;
