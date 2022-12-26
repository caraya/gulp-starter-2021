# Subresource integrity: what it means and how it works

When you use libraries like jQuery from CDN, you will see code like this:

```html
<script
  src="https://code.jquery.com/jquery-3.6.2.min.js"
  integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA="
  crossorigin="anonymous"></script>
```

I've always been curious as to what is the `integrity` attribute, why is it there and why do we need the `crossorigin` attribute.

This post will look at crossorigin integrity and how it can help secure web applications.

## Crossorigin integrity

According to the [Subresource Integrity Specification](https://w3c.github.io/webappsec-subresource-integrity/):

> Sites and applications on the web are rarely composed of resources from only a single origin. For example, authors pull scripts and styles from a wide variety of services and content delivery networks, and must trust that the delivered representation is, in fact, what they expected to load. If an attacker can trick a user into downloading content from a hostile server (via DNS [[RFC1035](https://www.rfc-editor.org/rfc/rfc1035)] poisoning, or other such means), the author has no recourse. Likewise, an attacker who can replace the file on the Content Delivery Network (CDN) server has the ability to inject arbitrary content.
>
> Delivering resources over a secure channel mitigates some of this risk: with TLS [[TLS](https://www.rfc-editor.org/rfc/rfc8446)], HSTS [[RFC6797](https://www.rfc-editor.org/rfc/rfc6797)], and pinned public keys [[RFC7469](https://www.rfc-editor.org/rfc/rfc7469)], a user agent can be fairly certain that it is indeed speaking with the server it believes it’s talking to. These mechanisms, however, authenticate only the server, not the content. An attacker (or administrator) with access to the server can manipulate content with impunity. Ideally, authors would not only be able to pin the keys of a server, but also pin the content, ensuring that an exact representation of a resource, and only that representation, loads and executes.

Crossorigin inntegrity addresses a pain point for securing web applications. How do we make sure that scripts we load from third parties have not been tampered with?

By associating the file we're downloading with a cryptographic digest we have better assurances that the file itself hasn't been tampered with.

The code to link to a file using subresource integrity checks look like this:

```html
<script
  src="https://code.jquery.com/jquery-3.6.3.js"
  integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM="
  crossorigin="anonymous"></script>
```

Subresource Integrity uses two attributes in the script tag:

### Integrity

The `integrity` attribute is a combination of the name of the algorithm you used to generate the key, in this case `sha256`, a dash `-` and the string representation of the hash wrapped in single or double quotation marks.

This attribute gives the browser something to compare the file against. If the hash in the attribute doesn't match the hash generated for the file then it is safe to assume the file was tampered with.

We will discuss how to generate the hashes later in the post.

### Crossorigin

When the requested resource is not on the same origin the `crossorigin` attribute must be present to check the integrity of the file. Without a crossorigin attribute, the browser ignore the `integrity` attribute as if it was not set,  losing all the security SRI brings in the first place.

The `crossorigin` attribute ensures that the `integrity` attribute is honored.

With `crossorigin="anonymous"` no credentials are sent to the `cross-origin` site hosting the content but the browser will send an `Origin` HTTP header.

**If the server denies including the resource (by not setting the `Access-Control-Allow-Origin` HTTP header), the resource will not be used by the browser.**

## Generating Integrity hashes

You can generate hashes for your own files with [Openssl](https://www.openssl.org/) using the following command

```bash
openssl dgst -sha384 -binary FILENAME.js | openssl base64 -A
```

Where you replace `FILENAME.js` with the name of the file you want to generate the hash for.

## Links and resources

* [Subresource Integrity Specification](https://w3c.github.io/webappsec-subresource-integrity/) &mdash; Editor's Draft
* [Using SRI to protect from malicious JavaScript](https://www.htmhell.dev/adventcalendar/2022/3/)
* [SRI Hash Generator](https://www.srihash.org/)
* [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) &mdash; MDN
* [subresource integrity support](https://caniuse.com/subresource-integrity) &mdash; [caniuse.com](https://caniuse.com/)
* [HTML attribute: crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) &mdash; MDN
