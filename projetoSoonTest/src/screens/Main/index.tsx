import React from 'react';

import * as S from './styles';

import Map from '~/components/Map';
import Modal from '~/components/Modal';
import { useLocation } from '~/hooks/useLocation';

const Main = () => {
  const { loading } = useLocation();

  return (
    <S.Container>
      <S.MapView>
        <Map />
      </S.MapView>
      <S.ModalView>
        <Modal loading={loading} />
      </S.ModalView>
    </S.Container>
  );
};

export default Main;
