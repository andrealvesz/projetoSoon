import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import Separator from '~/components/Separator';
import { useLocation } from '~/hooks/useLocation';

import { ModalInterface } from './modal.interface';

import Avatar from '~/assets/icons/avatar.svg';
import ShapeIcon from '~/assets/icons/shape.svg';
import MessageIcon from '~/assets/icons/message.svg';
import CallIcon from '~/assets/icons/call.svg';
import Line from '~/assets/icons/line.svg';
import ToOval from '~/assets/icons/toOval.svg';
import Oval from '~/assets/icons/oval.svg';
import CarIcon from '~/assets/icons/car-black.svg';

import * as S from './styles';

const Modal: React.FC<ModalInterface> = ({ loading }) => {
  const {
    myLocName,
    searchByAddress,
    cancelRequest,
    distance,
    duration,
    localizationCar,
    showDirection,
    price,
  } = useLocation();
  const [myLocation, setMyLocation] = useState('');

  const getLocation = async () => {
    myLocation !== ''
      ? await searchByAddress(myLocation)
      : myLocName
      ? await searchByAddress(myLocName)
      : Alert.alert('', 'Antes de solicitar, informe sua localização!');
  };

  return (
    <S.ModalView>
      <S.ModalHeader>
        <S.AvatarArea>
          <Avatar />
        </S.AvatarArea>
        <S.InfoUserArea>
          <S.InfoUserName>Gregory Smith</S.InfoUserName>
          <S.InfoUserShape>
            <ShapeIcon />
            <S.InfoNote>4.9</S.InfoNote>
          </S.InfoUserShape>
        </S.InfoUserArea>
        <S.UserContactArea>
          <MessageIcon style={{ marginRight: 16 }} />
          <CallIcon />
        </S.UserContactArea>
      </S.ModalHeader>

      {!showDirection && (
        <S.ModalInputArea>
          <S.IconsArea>
            <ToOval />
          </S.IconsArea>
          <S.InputFieldArea>
            <S.Input
              value={myLocation ? myLocation : myLocName}
              onChangeText={setMyLocation}
              placeholder="Informe sua localização"
            />
          </S.InputFieldArea>
        </S.ModalInputArea>
      )}

      {showDirection && (
        <S.ModalInputArea>
          <S.IconsArea>
            <ToOval />
            <Line />
            <Oval />
          </S.IconsArea>
          <S.InputFieldArea>
            <S.Input
              value={myLocation ? myLocation : myLocName}
              onChangeText={setMyLocation}
              placeholder="Informe sua localização"
              editable={false}
            />
            <Separator />
            <S.Input value={localizationCar} editable={false} />
          </S.InputFieldArea>
        </S.ModalInputArea>
      )}

      {distance > 0 && (
        <S.ModalResumeArea>
          <S.CarIconArea>
            <CarIcon />
          </S.CarIconArea>
          <S.DistanceArea>
            <S.DistanceTitle>Distance</S.DistanceTitle>
            <S.DistanceValue>
              {distance.toFixed(2).replace('.', ',')} km
            </S.DistanceValue>
          </S.DistanceArea>
          <S.TimeArea>
            <S.TimeTitle>Time</S.TimeTitle>
            <S.TimeValue>{parseInt(duration.toFixed(2))} min</S.TimeValue>
          </S.TimeArea>
          <S.PriceArea>
            <S.PriceTitle>Price</S.PriceTitle>
            <S.PriceValue>R${price?.toFixed(2).replace('.', ',')}</S.PriceValue>
          </S.PriceArea>
        </S.ModalResumeArea>
      )}

      <S.ModalButton
        onPress={showDirection ? cancelRequest : getLocation}
        disabled={loading ? true : false}
      >
        {loading ? (
          <ActivityIndicator size={23} style={{ padding: 13 }} color="#fff" />
        ) : (
          <S.ButtonText>
            {showDirection ? 'Cancelar' : 'Solicitar'}{' '}
          </S.ButtonText>
        )}
      </S.ModalButton>
    </S.ModalView>
  );
};

export default Modal;
