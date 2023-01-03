import React from 'react';

import { Container, MapView } from './styles';

import Map from '~/components/Map';
import Modal from '~/components/Modal';

const Main = () => {
  return (
    <Container>
      <MapView>
        <Map latitude={-15.843071} longitude={-48.0275374} />
        {/* <Modal /> */}
      </MapView>
    </Container>
  );
};

export default Main;
