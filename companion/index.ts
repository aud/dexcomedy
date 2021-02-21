import asap from "fitbit-asap/companion"
import {buildWeather, buildAlerting, buildClock, buildGloucose} from './builder';

const UPDATE_BUFFER = 30000; // 30s

(async () => {
  // Cancels all queued messages. It's recommended to call this function on
  // startup to limit messages to a single session.
  asap.cancel();

  const lazySend = async () => asap.send({
    alerting: buildAlerting(),
    clock: buildClock(),
    gloucose: await buildGloucose(),
    weather: await buildWeather(),
  });

  await lazySend();

  setInterval(async () => await lazySend(), UPDATE_BUFFER)
})();
