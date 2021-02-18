import {Weather} from './weather';

function SettingsPage() {
  return (
    <Page>
      <Weather />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
