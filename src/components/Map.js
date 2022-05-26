import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TKN;

const Map = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-83.73);
    const [lat, setLat] = useState(42.285);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        //// initialize map only once
        if (map.current){
            for (const incident of props.incidentData) {
                console.log("incident:", incident);
                if(incident.latitude){
                    const el = document.createElement("div");
                    el.className = "marker";
                    new mapboxgl.Marker(el)
                        .setLngLat([incident.longitude,incident.latitude])
                        .setPopup(
                            new mapboxgl.Popup({offset:25}).setHTML(
                                `<h3>${incident.description}</h3><p>${incident.narrative}</p>`
                            )
                        )
                        .addTo(map.current)
                }
                else{
                    //console.log("NO COORDS");
                }              
            }
            return;
        }

        //// if uninitialized, initialize it
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });


        //// add markers to map during initialization time
        for (const feature of props.geoJSData.features) {
            //// Set up a template for what each marker should look like ++ assign a className
            const el = document.createElement('div');
            el.className = 'marker';
            //console.log(`Feature.Geometry.Coordinates: ${feature.geometry.coordinates}`);

            //// make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({offset:25}).setHTML(
                        `<h3>${feature.properties.title}</h3>
                        <p>${feature.properties.description}</p>`
                    )
                )
                .addTo(map.current);
        }
    });

    return(
        <div ref={mapContainer} className="map-container" />
    )
}
export default Map