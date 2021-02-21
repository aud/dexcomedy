import {Weather} from './weather';
import {Dexcom} from './dexcom';
import {Alerting} from './alerting';

function SettingsPage(props) {
  return (
    <Page>
      <Dexcom />
      <Weather {...props} />
      <Alerting {...props} />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
