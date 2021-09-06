# Sending performance data to Google analytics

## Sending Web Vitals Data To Analytics

The Web Vitals library has documentation on their README for how to work with Google Tag Manager (the analytics implementation most people use). See [Send the results to Google Tag Manager](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-tag-manager) for the code and this [comment on Github](https://github.com/GoogleChrome/web-vitals/pull/28#discussion_r422701126) for implementation details.

```html
<script type="module">
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToGTM({name, delta, id}) {
  // Assumes the global `dataLayer` array exists, see:
  // https://developers.google.com/tag-manager/devguide
  dataLayer.push({
    event: 'web-vitals',
    event_category: 'Web Vitals',
    event_action: name,
    event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // The `id` value will be unique to the current page load.
    event_label: id,
  });
}

getCLS(sendToGTM);
getFID(sendToGTM);
getLCP(sendToGTM);
```

## Sending user timings to Google analytics

Google Analytics (and I imagine other analytics providers too) give you a way to upload data to your analytics account and use it to do further analysis.

I am currently researching how to send these measurements to Google Analytics or Tag Manager. For the later it should be possible to create a custom layer and push the content to it like we did for Web Vitals data.

My understanding is that this code would push our custom timings to Google Tag Manager, assuming we've already created the User Timings layer for this data to populate.

```html
<script type="module">
function sendToGTM({name, delta, id}) {
  // Assumes the global `dataLayer` array exists, see:
  // https://developers.google.com/tag-manager/devguide
  dataLayer.push({
    event: 'User Timings',
    event_category: 'User Timings',
    event_action: name,
    event_value: delta,
    event_label: id,
  });
}

getCLS(sendToGTM);
getFID(sendToGTM);
getLCP(sendToGTM);
```
