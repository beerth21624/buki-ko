import React, { useState } from 'react';
import Layout from '../../component/layout/Layout';
import ReactMapGL from 'react-map-gl';
import { API_MAPBOX } from '../../config';

const MapBox = () => {
  const [viewport, setViewport] = useState({
    latitude: 13.7649136,
    longitude: 100.5360959,
    zoom: 6,
  });

  return (
    <Layout>
      <ReactMapGL
        // {...viewport}
        transitionDuration="200"
        mapboxAccessToken={API_MAPBOX}
        initialViewState={{ ...viewport }}
        style={{ width: '80vw', height: '100%' }}
        mapStyle="mapbox://styles/beerth43/cl0kkhxbn000214qxszxo5rrv"
        onViewportChange={(viewport) => setViewport(viewport)}
      ></ReactMapGL>
    </Layout>
  );
};

export default MapBox;
