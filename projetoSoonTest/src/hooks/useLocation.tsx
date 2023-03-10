import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  useEffect,
} from 'react';

import { LayoutAnimation, Alert, PermissionsAndroid } from 'react-native';

import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { MapsAPI } from '~/config/map';

type LocationContextData = {
  loading: boolean;
  myCoords: Coords;
  coordsCar: Coords;
  showDirection: boolean;
  distance: number;
  duration: number;
  localizationCar: string;
  price: number;
  myLocName: string;
  driverInit: [Coords];
  searchByAddress: (address: string) => Promise<void>;
  cancelRequest(): void;
  getRequestPrice(readyDistance: number): Promise<void>;
  locationPermission(): Promise<void>;
  getCurrentLocation(): Promise<void>;
  transformCoordForAddress?(lat: number, lgn: number, type: string): void;
  fetchTime(distance: number, duration: number): void;
};

type Coords = {
  latitude?: number;
  longitude?: number;
};

type Props = {
  children: React.ReactNode;
};

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

export const LocationProvider = ({ children }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [showDirection, setShowDirection] = useState(false);
  const [myCoords, setMyCoords] = useState({
    latitude: -15.8412817,
    longitude: -48.0594584,
  });
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [driverInit, setDriverInit] = useState([]);
  const [coordsCar, setCoordCar] = useState({});
  const [localizationCar, setLocalizationCar] = useState('');
  const [myLocName, setMyLocName] = useState('');

  useEffect(() => {
    Geocoder.init(MapsAPI, {
      language: 'pt-Br',
    });

    (async () => {
      const permission = await locationPermission();
      if (permission === 'granted') {
        getCurrentLocation();
      }
    })();
  });

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve('granted');
      }
      return reject('Permiss??o n??o concedida');
    });

  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          if (position) {
            const infoAddress = await Geocoder.from(
              position.coords.latitude,
              position.coords.longitude,
            );
            const coords = {
              latitude: infoAddress.results[0].geometry.location.lat,
              longitude: infoAddress.results[0].geometry.location.lng,
            };
            transformCoordForAddress(coords.latitude, coords.longitude, 'user');
            setMyCoords(coords);
            resolve(coords);
          }
        },
        error => {
          reject(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });

  const transformCoordForAddress = useCallback(
    async (lat: number, lgn: number, type: string) => {
      const infoAddress = await Geocoder.from(lat, lgn);
      const addressComponent = infoAddress.results[0].formatted_address;
      const [locFormatted] = addressComponent.split(',');

      type !== 'user'
        ? setLocalizationCar(locFormatted)
        : setMyLocName(locFormatted);
    },
    [],
  );

  const searchByAddress = useCallback(
    async (address: string) => {
      setLoading(true);
      try {
        const infoAddress = await Geocoder.from(address);

        const coords = {
          latitude: infoAddress.results[0].geometry.location.lat,
          longitude: infoAddress.results[0].geometry.location.lng,
        };

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMyCoords(coords);
        const attCoordsCar = await newCoordsCar();
        setCoordCar(attCoordsCar);
        setShowDirection(true);
      } catch (error) {
        Alert.alert(
          'Falha',
          'Endere??o n??o v??lido! Por favor, insira o endere??o corretamente (Rua, Avenida).',
        );
      } finally {
        setLoading(false);
      }
    },
    [transformCoordForAddress],
  );

  const newCoordsCar = () =>
    new Promise<void>((resolve, reject) => {
      const coordsCarPromise = {
        latitude: -15.8414099,
        longitude: -48.04399610000001,
      };

      transformCoordForAddress(
        coordsCarPromise.latitude,
        coordsCarPromise.longitude,
        'car',
      );

      resolve(coordsCarPromise);
    });

  const cancelRequest = useCallback(async () => {
    setLoading(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTimeout(() => {
      setShowDirection(false);
      setDistance(0);
      setDuration(0);
      setPrice(0);
      setCoordCar({});
      setMyCoords(myCoords);
      setLoading(false);
      setLocalizationCar('');
      setDriverInit([]);
    }, 1000);
  }, []);

  const getRequestPrice = (readyDistance: number) => {
    return new Promise((resolve, reject) => {
      let json = {
        error: '',
      };

      json.price = readyDistance * 4;

      setPrice(json.price);
      resolve(json);
    });
  };

  const fetchTime = (distance: number, duration: number) => {
    setDistance(distance);
    setDuration(duration);
  };

  const value = {
    loading,
    myCoords,
    coordsCar,
    showDirection,
    distance,
    duration,
    localizationCar,
    price,
    myLocName,
    driverInit,
    searchByAddress,
    cancelRequest,
    getCurrentLocation,
    getRequestPrice,
    locationPermission,
    fetchTime,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  return context;
};
