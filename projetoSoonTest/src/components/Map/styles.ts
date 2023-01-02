import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View``;

export const MapArea = styled.View``;

export const styles = StyleSheet.create({
  mapa: {
    width,
    height,
  },
});
