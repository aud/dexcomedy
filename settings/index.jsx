import {
  DEXCOM_USERNAME_KEY,
  DEXCOM_PASSWORD_KEY,
  DEXCOM_LOW_GLOUCOSE_THRESHOLD,
  DEXCOM_HIGH_GLOUCOSE_THRESHOLD
} from '../common/dexcom-config';

const DexcomSecretsSection = () => {
  const titleMarkup = (
    <Text bold>
      Dexcom Username and Password (from Dexcom CLARITY)
    </Text>
  );

  const descriptionMarkup = (
    <Text>
      These credentials are required to access the Dexcom API in order to read your gloucose levels.
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <TextInput title="Username" label="Username" settingsKey={DEXCOM_USERNAME_KEY} />
      <TextInput title="Password" label="Password" settingsKey={DEXCOM_PASSWORD_KEY} />
    </Section>
  );
}

const ThresholdSection = () => {
  const titleMarkup = (
    <Text bold>
      Dexcom Alerting Thresholds
    </Text>
  );

  const descriptionMarkup = (
    <Text>
      These values will be used as the thresholds for alerting. If these values are unset, the low will default to 4.4 and high 11.1
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <TextInput
        title="High gloucose threshold"
        label="High gloucose threshold"
        settingsKey={DEXCOM_HIGH_GLOUCOSE_THRESHOLD}
      />

      <TextInput
        title="Low gloucose threshold"
        label="High gloucose threshold"
        settingsKey={DEXCOM_LOW_GLOUCOSE_THRESHOLD}
      />
    </Section>
  );
}

function SettingsPage() {
  return (
    <Page>
      <DexcomSecretsSection />
      <ThresholdSection />
    </Page>
  );
}

registerSettingsPage(SettingsPage);
