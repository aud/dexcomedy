import {STORAGE_KEYS} from "../common/config"

export const Weather = () => {
  const titleMarkup = (
    <Text bold>
      title
    </Text>
  );

  const descriptionMarkup = (
    <Text>
      Description
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <TextInput
        label="Open Weather Map API Key"
        settingsKey={STORAGE_KEYS.OPEN_WEATHER_MAP_API_KEY}
      />
    </Section>
  );
}
