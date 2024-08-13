import { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';

import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Coordinate } from 'ol/coordinate';

const OpenLayersMap = () => {
    const mapDivRef = useRef<HTMLDivElement>(null);

    const [olMap, setOlMap] = useState<Map>();

    const [clickedCoordinate, setClickedCoordinate] = useState<Coordinate>();

    useEffect(() => {
        const map = new Map({
            target: mapDivRef.current as HTMLDivElement,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        map.on('click', (e) => {
            setClickedCoordinate(e.coordinate);
        });

        setOlMap(map);

        return () => map.setTarget(undefined);
    }, []);

    return (
        <>
            <div ref={mapDivRef} className='map' />
            {clickedCoordinate && (
                <span className='coordinates-container'>
                    You clicked at: {clickedCoordinate[0]} /{' '}
                    {clickedCoordinate[1]}
                </span>
            )}
        </>
    );
};

export default OpenLayersMap;
