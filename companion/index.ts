import asap from "fitbit-asap/companion"
import {buildWeather, buildAlerting, buildGloucose} from './builder';
import {settingsStorage} from "settings";

const UPDATE_BUFFER = 30000; // 30s

// Send refresh message if settings have changed. The watchface will be
// reloaded in app, which refreshes the settings. This isn't great, but it's
// cleaner than having to manage new setting updates with the current watch
// face.
settingsStorage.addEventListener("change", () => {
  asap.send({type: "refresh"});
});

(async () => {
  // Cancels all queued messages. It's recommended to call this function on
  // startup to limit messages to a single session.
  asap.cancel();

  const lazySend = async () => asap.send({
    alerting: buildAlerting(),
    gloucose: await buildGloucose(),
    weather: await buildWeather(),
    type: "update",
  });

  await lazySend();

  setInterval(async () => await lazySend(), UPDATE_BUFFER)
})();
