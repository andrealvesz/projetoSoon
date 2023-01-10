import React, { useState, useRef, useEffect } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions } from 'react-native';

// import { MapInterface } from './map.interface';
import { MapsAPI } from '~/config/map';

import Pin from '~/assets/icons/ic_Pin.svg';
import Car from '~/assets/icons/car.svg';

// Styles
import { MapArea, styles } from './styles';
import { useLocation } from '~/hooks/useLocation';

// type Props = MapInterface;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapView>(null);
  const {
    myCoords,
    setDistance,
    setDuration,
    coordsCar,
    getRequestPrice,
    showDirection,
    getCurrentLocation,
  } = useLocation();

  const [location, setLocation] = useState({
    center: myCoords,
    zoom: 16,
    pitch: 0,
    altitude: 0,
    heading: 0,
  });

  useEffect(() => {
    if (showDirection) {
      const interval = setInterval(() => {
        getLiveLocation();
      }, 4000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    setLocation({
      center: myCoords,
      zoom: 16,
      pitch: 0,
      altitude: 0,
      heading: 0,
    });
  }, [myCoords]);

  const handleDirectionsReady = ready => {
    // setDriver(ready.coordinates);
    mapRef.current.fitToCoordinates(ready.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20,
      },
    });
    getRequestPrice(ready.distance);
    setDistance(ready.distance);
    setDuration(ready.duration);
  };

  // const handleMapChange = async () => {
  //   const cam = await mapRef.current?.getCamera();
  //   cam.altitude = 0;
  //   setLocation(cam);
  // };

  const updateState = data => setLocation(state => ({ ...state, ...data }));

  const getLiveLocation = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    console.log('get live location after 4 second', latitude, longitude);
    // return;
    animate(latitude, longitude);
    updateState({
      heading: 0,
      curLoc: { latitude, longitude },
      coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (markerRef.current) {
      markerRef.current.animateCamera(newCoordinate, 7000);
    }
  };

  return (
    <MapArea>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapa}
        showsUserLocation
        followsUserLocation
        camera={location}
        // onRegionChangeComplete={handleMapChange}
        // followsUserLocation
        // showsUserLocation
      >
        {myCoords && (
          <Marker coordinate={myCoords}>
            <Pin />
          </Marker>
        )}

        {coordsCar && coordsCar.latitude && (
          <Marker coordinate={coordsCar}>
            <Car />
          </Marker>
        )}

        {showDirection && (
          <MapViewDirections
            origin={myCoords}
            destination={coordsCar}
            apikey={MapsAPI}
            strokeWidth={7}
            strokeColor="#3A5DFB"
            onReady={handleDirectionsReady}
          />
        )}
      </MapView>
    </MapArea>
  );
};

export default Map;
