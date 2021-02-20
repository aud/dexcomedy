import {STORAGE_KEYS} from "../common/config"

export const Alerting = props => {
  const titleMarkup = (
    <Text bold>
      Enable and configure alerting settings.
    </Text>
  );

  const descriptionMarkup = (
    <Text>
      These values will be used as the thresholds for alerting.
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <Toggle
        label="Enable"
        settingsKey={STORAGE_KEYS.ALERTING.ENABLED}
      />

      <TextInput
        label="Low threshold"
        settingsKey={STORAGE_KEYS.ALERTING.LOW_THRESHOLD}
        disabled={!(props.settings[STORAGE_KEYS.ALERTING.ENABLED] === "true")}
      />

      <TextInput
        label="High threshold"
        settingsKey={STORAGE_KEYS.ALERTING.HIGH_THRESHOLD}
        disabled={!(props.settings[STORAGE_KEYS.ALERTING.ENABLED] === "true")}
      />
    </Section>
  );
}
