import {Weather} from './weather';
import {Dexcom} from './dexcom';

function SettingsPage(props) {
  return (
    <Page>
      <Dexcom />
      <Weather />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
