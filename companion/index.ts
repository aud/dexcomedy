import asap from "fitbit-asap/companion"
import {buildWeather, buildAlerting, buildClock, buildGloucose} from './builder';

(async () => {
  // Cancels all queued messages. It's recommended to call this function on
  // startup to limit messages to a single session.
  asap.cancel();

  asap.send({
    alerting: buildAlerting(),
    clock: buildClock(),
    gloucose: await buildGloucose(),
    weather: await buildWeather(),
  });
})();
