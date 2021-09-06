# CDS 2020: Tabbed PWAs

What caught my attention from CDS2020, are these two upcoming features for PWAs.

The first one is tabbed presentation for PWAs. The idea is that new windows for the application will open as new tabs instead and keep the user in the PWA.

We implement this via the  `display_override` field in the web manifest. The field allows us to specify a prioritized list of display modes we want to use.

```json
{
    "display": "standalone",
    "display_override": ["tabbed", "minimal-ui"],
}
```

This will allow us to create tabs in our PWAs! This will be a critical feature for so many desktop PWAs.

Another interesting new API will allow our desktop PWAs to be launched on login to the device.

```js
if (navigator.runOnOsLogin) {
  navigator.runOnOsLogin.set({ mode: "windowed" })
    .then(() => {
        // Permission approved
    });
}
```

Not all PWAs will require launch on login but it's good to know that we have the option to do so.

## Final Note

These features are under development as part of [Project Fugu](https://medium.com/swlh/what-is-project-fugu-googles-initiative-to-unlock-all-native-device-features-for-the-web-892fafa726f9)

The current work on tabbed PWAs is behind flags (`#enable-desktop-pwas-tab-strip` and `#enable-desktop-pwas-tab-strip-link-capturing`) in Chrome Canary (version 89 as of this writing), I'd expect these features to appear as [Origin Trials](https://web.dev/origin-trials/) in the first half of 2021 and be released to the public after the trial is complete. However, that's just my expectation, it may or may not happen on that timeline.
