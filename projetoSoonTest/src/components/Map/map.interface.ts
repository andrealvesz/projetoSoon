type Coords = {
  lat: number;
  lng: number;
};
export interface MapInterface {
  myCoords: Coords;
  coordsCar: Coords;
  showDirection: boolean;
}
