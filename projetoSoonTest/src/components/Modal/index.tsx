import React from 'react';

import Separator from '~/components/Separator';

import Avatar from '~/assets/icons/avatar.svg';
import ShapeIcon from '~/assets/icons/shape.svg';
import MessageIcon from '~/assets/icons/message.svg';
import CallIcon from '~/assets/icons/call.svg';
import Line from '~/assets/icons/line.svg';
import ToOval from '~/assets/icons/toOval.svg';
import Oval from '~/assets/icons/oval.svg';
import CarIcon from '~/assets/icons/car-black.svg';

import * as S from './styles';

const Modal: React.FC = () => {
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
      <S.ModalInputArea>
        <S.IconsArea>
          <ToOval />
          <Line />
          <Oval />
        </S.IconsArea>
        <S.InputFieldArea>
          <S.Input placeholder="Origem" />
          <Separator />
          <S.Input placeholder="Destino" />
        </S.InputFieldArea>
      </S.ModalInputArea>
      <S.ModalResumeArea>
        <S.CarIconArea>
          <CarIcon />
        </S.CarIconArea>
        <S.DistanceArea>
          <S.DistanceTitle>Distance</S.DistanceTitle>
          <S.DistanceValue>0.2 km</S.DistanceValue>
        </S.DistanceArea>
        <S.TimeArea>
          <S.TimeTitle>Time</S.TimeTitle>
          <S.TimeValue>2 min</S.TimeValue>
        </S.TimeArea>
        <S.PriceArea>
          <S.PriceTitle>Price</S.PriceTitle>
          <S.PriceValue>$25.00</S.PriceValue>
        </S.PriceArea>
      </S.ModalResumeArea>
      <S.ModalButton>
        <S.ButtonText>Cancel Request</S.ButtonText>
      </S.ModalButton>
    </S.ModalView>
  );
};

export default Modal;
