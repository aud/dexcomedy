import { geolocation } from "geolocation";

interface Coords {
  latitude: string;
  longitude: string;
}

export async function coordinates(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    const successHandler = ({coords: {latitude, longitude}}) => {
      resolve({latitude, longitude});
    }

    const errorHandler = error => reject(error);

    geolocation.getCurrentPosition(successHandler, errorHandler, {
      timeout: 60 * 1000
    });
  });
}
