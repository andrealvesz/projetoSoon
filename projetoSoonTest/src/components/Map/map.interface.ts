export type Coords = {
  latitude: number;
  longitude: number;
};
export interface MapInterface {
  myCoords: Coords;
  coordsCar: Coords;
  showDirection: boolean;
}
