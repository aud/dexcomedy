import {Weather} from './weather';
import {Dexcom} from './dexcom';
import {Clock} from './clock';
import {Alerting} from './alerting';

function SettingsPage(props) {
  return (
    <Page>
      <Dexcom />
      <Clock  />
      <Weather {...props} />
      <Alerting {...props} />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
