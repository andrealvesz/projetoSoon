import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MapInterface } from './map.interface';

// Styles
import { MapArea, styles } from './styles';

type Props = MapInterface;

export const Map: React.FC<Props> = ({ latitude, longitude }) => {
  const [location, setLocation] = useState({
    center: {
      latitude,
      longitude,
    },
    zoom: 16,
    pitch: 0,
    altitude: 0,
    heading: 0,
  });

  return (
    <MapArea>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapa}
        showsUserLocation
        followsUserLocation
        camera={location}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </MapArea>
  );
};
