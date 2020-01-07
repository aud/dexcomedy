import {DEXCOM_USERNAME_KEY, DEXCOM_PASSWORD_KEY} from '../common/dexcom-config';

function settings() {
  return (
    <Page>
      <Section>
        <TextInput title="Username" label="Username" settingsKey={DEXCOM_USERNAME_KEY} />
        <TextInput title="Password" label="Password" settingsKey={DEXCOM_PASSWORD_KEY} />
      </Section>
    </Page>
  )
}

registerSettingsPage(settings);
