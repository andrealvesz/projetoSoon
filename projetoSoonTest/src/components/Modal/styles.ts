import styled from 'styled-components/native';

export const ModalView = styled.View`
  background: #fff;
  width: 343px;
  border-radius: 8px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  padding: 9px 15px 9px 16px;
  align-items: center;
  background: #f7f7f7;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const InfoUserArea = styled.View`
  margin-right: 43px;
`;

export const AvatarArea = styled.View`
  margin-right: 14px;
`;
export const InfoUserName = styled.Text`
  font-family: SF-UI-Display-Semibold;
  font-size: 17px;
  color: #242e42;
  margin-bottom: 4px;
`;

export const InfoUserShape = styled.View`
  flex-direction: row;
`;

export const InfoNote = styled.Text`
  margin-left: 5px;
  font-family: SF-UI-Display-Regular;
  font-size: 15px;
  color: #c8c7cc;
`;

export const UserContactArea = styled.View`
  flex-direction: row;
`;

export const ModalInputArea = styled.View`
  flex-direction: row;
  padding: 21px 0px 21px 19px;
  border-bottom-width: 1px;
  border-color: #efeff4;
  align-items: center;
`;

export const IconsArea = styled.View`
  align-items: center;
  margin-right: 14px;
`;

export const InputFieldArea = styled.View`
  flex: 1;
`;

export const InputArea = styled.View``;

export const Input = styled.TextInput`
  font-family: SF-UI-Display-Regular;
  font-size: 17px;
  color: #242e42;
  padding: 0;
`;

export const ModalResumeArea = styled.View`
  flex-direction: row;
  padding: 15px 19px;
  justify-content: space-between;
  align-items: center;
`;

export const CarIconArea = styled.View``;

export const DistanceArea = styled.View`
  align-items: center;
`;

export const DistanceTitle = styled.Text`
  font-family: SF-UI-Display-Semibold;
  font-size: 13px;
  color: #c8c7cc;
  text-transform: uppercase;
  margin-bottom: 9px;
`;

export const DistanceValue = styled.Text`
  font-family: SF-UI-Display-Bold;
  font-size: 15px;
  color: #242e42;
`;

export const TimeArea = styled.View`
  align-items: center;
`;

export const TimeTitle = styled.Text`
  font-family: SF-UI-Display-Semibold;
  font-size: 13px;
  color: #c8c7cc;
  text-transform: uppercase;
  margin-bottom: 9px;
`;

export const TimeValue = styled.Text`
  font-family: SF-UI-Display-Bold;
  font-size: 15px;
  color: #242e42;
`;

export const PriceArea = styled.View`
  align-items: center;
`;

export const PriceTitle = styled.Text`
  font-family: SF-UI-Display-Semibold;
  font-size: 13px;
  color: #c8c7cc;
  text-transform: uppercase;
  margin-bottom: 9px;
`;

export const PriceValue = styled.Text`
  font-family: SF-UI-Display-Bold;
  font-size: 15px;
  color: #242e42;
`;

export const ModalButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background: #242e42;
  margin: 0 16px 19px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-family: SF-UI-Display-Semibold;
  font-size: 17px;
  color: #fff;
  text-align: center;
  padding: 13px;
`;
