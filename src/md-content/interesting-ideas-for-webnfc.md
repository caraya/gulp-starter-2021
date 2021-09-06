# Interesting ideas for WebNFC

One of the things I've always loved is [NFC (Near Field Communication)](https://en.wikipedia.org/wiki/Near-field_communication). A technology that allows for short range contactless communication between two devices.

As part of Project Fugu, Google developed [WebNFC](https://web.dev/nfc/) to provide a simple API for NFC communication. As with many of the Fugu APIS, there has been pushback from other browsers about possible security concerns. These security concerns and the fact that Chrome for iOS is just a skin on top of WebKit View, mean that the API is only available to Chrome for Android at the moment. Still it is good to take a look at the API, see how it works and brainstorm some ideas for how to use it.

<!-- 
[NFC comes to the web](https://cxlabs.sap.com/2021/07/27/nfc-comes-to-the-web/) -->

## Getting everything ready

```js
if ('NDEFReader' in window) {
  /* Scan and write NFC tags */
}
```

The `NDEFReader` object is the entry point in Web NFC that exposes functionality for preparing reading and/or writing actions that are fulfilled when an NDEF tag comes in proximity. The NDEF in NDEFReader stands for `NFC Data Exchange Format`, a lightweight binary message format standardized by the [NFC Forum](https://nfc-forum.org/).

The NDEFReader object is for acting on incoming NDEF messages from NFC tags and for writing NDEF messages to NFC tags within range.

```js
const ndef = new NDEFReader();
ndef.scan().then(() => {
  console.log("Scan started successfully.");
  ndef.onreadingerror = () => {
    console.log("Cannot read data from the NFC tag. Try another one?");
  };
  ndef.onreading = event => {
    console.log("NDEF message read.");
  };
}).catch(error => {
  console.log(`Error! Scan failed to start: ${error}.`);
});
```

## Brainstorming

Examples of sites that may use Web NFC include:

* Museums and art galleries can display additional information about a display when the user touches their device to an NFC card near the exhibit
* Inventory management sites can read or write data to the NFC tag on a container to update information on its contents
* Conference sites can use it to scan NFC badges during the event
* Stores with items on display can provide additional information about the products on display when the user touches their device to an NFC tag near the item
