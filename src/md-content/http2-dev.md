# HTTP2 Development in Node Using Self Signed Certs

There may be times when we want to test our application with SSL or want to configure it and use it locally. Even though newer APIs whitrelist `localhost` for development I still would rather have HTTPS/SSL enabled to make sure that other parts of my apps work as intended

My preferred arpproach is to use the `NODE_EXTRA_CA_CERTS` [environment variable](https://nodejs.org/api/cli.html#cli_node_extra_ca_certs_file) to give Node the path to a file containing one or more certificates that you want to use. The extra certificates are used **in addition** to the list of Certificate Authorities that Node already trusts.

For example, if I want to trust a self-signed certificate that I created on my machine, I might execute the following command in my terminal or add it to my `.bashrc`:

```bash
export NODE_EXTRA_CA_CERTS=/c/code/server.crt.
```


## Generating certificates for local development

If you want to generate a certificate for local development, something like this will work:

```bash
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt
```

Please note you’ll want to set the Common Name to be **localhost** if you intend to work locally, as opposed to 127.0.0.1. You also need to execute all your local requests to **localhost** as opposed to 127.0.0.1. More info on that here.

## Links and Resources

* [Developing HTTPS Services in Node with Self-Signed Certificates](https://mattcbaker.com/post/developing-https-node-local/)
