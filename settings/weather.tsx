import {STORAGE_KEYS} from "../common/config"

export const Weather = props => {
  const titleMarkup = (
    <Text bold>
      Enable and configure weather settings.
    </Text>
  );

  const descriptionMarkup = (
    <Text>

      Note: the API key is required as its used to pull the weather from
      https://openweathermap.org/. Signup is free and takes less than 5
      minutes. Create an account and enter in your API key in the field below.

      https://home.openweathermap.org/users/sign_in
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <Toggle
        label="Enable"
        settingsKey={STORAGE_KEYS.WEATHER.ENABLED}
      />

      <Select
        label="Unit (celcius or fahrenheit)"
        settingsKey={STORAGE_KEYS.WEATHER.UNIT}
        options={[
          {name: "fahrenheit"},
          {name: "celcius"},
        ]}
        disabled={!(props.settings[STORAGE_KEYS.WEATHER.ENABLED] === "true")}
      />

      <TextInput
        label="Open Weather Map API Key (required)"
        settingsKey={STORAGE_KEYS.WEATHER.API_KEY}
        disabled={!(props.settings[STORAGE_KEYS.WEATHER.ENABLED] === "true")}
      />
    </Section>
  );
}
