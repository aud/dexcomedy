import {Weather} from './weather';
import {Dexcom} from './dexcom';
import {Clock} from './clock';

function SettingsPage(props) {
  return (
    <Page>
      <Dexcom />
      <Weather {...props} />
      <Clock  />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
