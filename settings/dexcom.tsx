import {STORAGE_KEYS} from "../common/config"

export const Dexcom = () => {
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
      <TextInput label="Dexcom username" settingsKey={STORAGE_KEYS.DEXCOM.USERNAME} />
      <TextInput label="Dexcom password" settingsKey={STORAGE_KEYS.DEXCOM.PASSWORD} />

      <Select
        label="Unit (mg/dL or mmol)"
        settingsKey={STORAGE_KEYS.DEXCOM.UNIT}
        options={[
          {name: "mg/dL"},
          {name: "mmol"},
        ]}
      />
    </Section>
  );
}
