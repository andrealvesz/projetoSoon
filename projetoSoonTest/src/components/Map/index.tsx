import React, { useState, useRef, useEffect } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Alert, Dimensions } from 'react-native';

import { MapsAPI } from '~/config/map';
import { useLocation } from '~/hooks/useLocation';

import Pin from '~/assets/icons/ic_Pin.svg';
import Car from '~/assets/icons/car.svg';

// Styles
import { MapArea, styles } from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<Marker>(null);
  const {
    myCoords,
    coordsCar,
    getRequestPrice,
    showDirection,
    fetchTime,
    driverInit,
    cancelRequest,
  } = useLocation();

  const [location, setLocation] = useState({
    curLoc: myCoords,
    carLoc: {},
    coordinate: new AnimatedRegion({
      latitude: myCoords.latitude,
      longitude: myCoords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0,
  });
  const { curLoc, carLoc, heading } = location;
  const [driver, setDriver] = useState(driverInit);

  let driverClone: any;

  useEffect(() => {
    if (driver.length > 0 && showDirection) {
      const interval = setInterval(() => {
        getLiveLocation();
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [driver, showDirection]);

  useEffect(() => {
    updateState({
      curLoc: myCoords,
    });
  }, [myCoords]);

  const handleDirectionsReady = ready => {
    mapRef.current.fitToCoordinates(ready.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20,
      },
    });
    setDriver(ready.coordinates);
    fetchTime(ready.distance, ready.duration);
    getRequestPrice(ready.distance);
  };

  const updateState = data => setLocation(state => ({ ...state, ...data }));

  const getCurrentLocCar = () =>
    new Promise<void>((resolve, reject) => {
      let overCurrentCar = {
        latitude: 0,
        longitude: 0,
      };
      driverClone = driverClone ? driverClone : [...driver];
      let found = driverClone?.shift();
      if (found) resolve(found);

      overCurrentCar.over = true;
      resolve(overCurrentCar);
    });

  const getLiveLocation = async () => {
    const { latitude, longitude, over } = await getCurrentLocCar();

    if (over) {
      Alert.alert('', 'O Guincho já se encontra no local', [
        {
          text: 'OK',
          onPress: () => {
            updateState({
              curLoc: myCoords,
            });
            setDriver([]);
            cancelRequest();
          },
        },
      ]);
    }
    // return;
    animate(latitude, longitude);
    updateState({
      heading,
      carLoc: { latitude, longitude },
      coordinate: new AnimatedRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
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
        region={{
          ...curLoc,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {myCoords && (
          <Marker coordinate={myCoords}>
            <Pin />
          </Marker>
        )}

        {Object.values(coordsCar).length > 0 && (
          <Marker.Animated
            ref={markerRef}
            coordinate={Object.values(carLoc).length > 0 ? carLoc : coordsCar}
          >
            <Car />
          </Marker.Animated>
        )}

        {Object.values(coordsCar).length > 0 && (
          <MapViewDirections
            origin={coordsCar}
            destination={curLoc}
            apikey={MapsAPI}
            strokeWidth={7}
            strokeColor="#3A5DFB"
            onReady={handleDirectionsReady}
            optimizeWaypoints
          />
        )}
      </MapView>
    </MapArea>
  );
};

export default Map;
