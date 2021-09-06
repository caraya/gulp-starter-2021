# Working with Jetpack in development mode

Plugins like [Jetpack](https://jetpack.com/) don't work at all in development environments that don't use a fully qualified domain name or a domain that uses non-standard local domains (like `site.local` or `site.dev`), making it impossible to use any of its features unless we use [Development Mode](https://jetpack.com/support/development-mode/).

 To enable development mode we need to define the `JETPACK_DEV_DEBUG` in `wp-config.php`. The code looks something like this:

```php
 <?php
 define( 'JETPACK_DEV_DEBUG', true );
```

While in Development Mode, some features will not be available since they require WordPress.com for their functionality, for example Related Posts and Publicize. Other features will have reduced functionality to give developers a good-faith representation of the feature.

So we still need to test our code on a live staging server before pushing it to production, but Jetpack development mode is a good fist step.
