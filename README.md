Simple watch face to see your latest blood glucose (mmol/L) levels from Dexcom: https://gallery.fitbit.com/details/98464861-e584-4c18-973c-ae4f686badbc

<screenshots>
  <img width="248" alt="Screen Shot 2020-01-18 at 5 09 11 PM" src="https://user-images.githubusercontent.com/13060190/72671241-57cd0680-3a15-11ea-9ed1-a4e169fe4000.png">


Additional features:
* Threshold alerting. If your blood sugar is outside of the configured high/low
 thresholds, the watchface will send an alert to you. If the alert is muted, you will not
 be alerted again until you have dropped out of the threshold
* Trending notifier. If your bloodsugar is trending towards a certain direction, the arrows next to the bloodsugar reflect that (similar to Dexcom share)

Contributing:
* Bugfixes & any other contributions are very welcome
* If there's a feature you'd like to see, let me know (submit a GitHub issue)!

Development:
* Install the Fitbit simulator. This allows you to develop locally without having to deploy to a physical device. The installation instructions for your OS can be found here: https://dev.fitbit.com/getting-started/
* Familiarize yourself with the CLI commands: https://dev.fitbit.com/build/guides/command-line-interface/ 
* `npx fitbit` to get into the Fitbit shell
* `bi` to build and install (defaults to simulator device)

Todo:
* Support US Dexcom accounts (the Dexcom API changes slightly)
* Support mg/dL view
