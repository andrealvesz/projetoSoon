import React from 'react';

import * as S from './styles';

import Map from '~/components/Map';
import Modal from '~/components/Modal';

const Main = () => {
  return (
    <S.Container>
      <S.MapView>
        <Map latitude={-15.843071} longitude={-48.0275374} />
      </S.MapView>
      <S.ModalView>
        <Modal />
      </S.ModalView>
    </S.Container>
  );
};

export default Main;
