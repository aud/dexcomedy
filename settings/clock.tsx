import {STORAGE_KEYS} from "../common/config"

export const Clock = () => {
  const titleMarkup = (
    <Text bold>
      Clock settings
    </Text>
  );

  const descriptionMarkup = (
    <Text>
      Configure 12 or 24 hour clock
    </Text>
  );

  return (
    <Section title={titleMarkup} description={descriptionMarkup}>
      <Select
        label="Clock format (12 or 24 hour)"
        settingsKey={STORAGE_KEYS.CLOCK.FORMAT}
        options={[
          {name: "12"},
          {name: "24"},
        ]}
      />
    </Section>
  );
}
