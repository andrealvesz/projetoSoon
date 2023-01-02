import React from 'react';

import { Container, MapView } from './styles';

import { Map } from '~/components/Map';

const Main = () => {
  return (
    <Container>
      <MapView>
        <Map latitude={-15.843071} longitude={-48.0275374} />
      </MapView>
    </Container>
  );
};

export default Main;
