# Nnginx Sample Configurations

```nginx
# Nginx Server Configuration File
# https://nginx.org/en/docs/

# Run as a unique, less privileged user for security reasons.
# Default: nobody nobody
# https://nginx.org/en/docs/ngx_core_module.html#user
# https://en.wikipedia.org/wiki/Principle_of_least_privilege
user www-data;

# Sets the worker threads to the number of CPU cores available in the system for
# best performance. Should be > the number of CPU cores.
# Maximum number of connections = worker_processes * worker_connections
# Default: 1
# https://nginx.org/en/docs/ngx_core_module.html#worker_processes
worker_processes auto;

# Maximum number of open files per worker process.
# Should be > worker_connections.
# Default: no limit
# https://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile
worker_rlimit_nofile 8192;

# Provides the configuration file context in which the directives that affect
# connection processing are specified.
# https://nginx.org/en/docs/ngx_core_module.html#events
events {
  # If you need more connections than this, you start optimizing your OS.
  # Should be < worker_rlimit_nofile.
  # Default: 512
  # https://nginx.org/en/docs/ngx_core_module.html#worker_connections
  worker_connections 8000;
}

# Log errors and warnings to this file
# This is only used when you don't override it on a `server` level
# Default: logs/error.log error
# https://nginx.org/en/docs/ngx_core_module.html#error_log
error_log /var/log/nginx/error.log warn;

# The file storing the process ID of the main process
# Default: logs/nginx.pid
# https://nginx.org/en/docs/ngx_core_module.html#pid
pid /var/run/nginx.pid;

http {

  # Hide Nginx version information.
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#server_tokens
  server_tokens off;

  # Specify media (MIME) types for files.
  # https://www.iana.org/assignments/media-types/media-types.xhtml
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#types

  include mime.types;

  # Sets default media type to octet-stream
  # Unless we override it later
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#default_type
  # Default: text/plain
  default_type application/octet-stream;

  # Serve all resources labeled as `text/html`
  # or `text/plain` with the media type
  # `charset` parameter set to `UTF-8`.
  # https://nginx.org/en/docs/http/ngx_http_charset_module.html#charset
  charset utf-8;

  # Update charset_types to match updated mime.types.
  # `text/html` is always included by charset module.
  # Default: text/html text/xml text/plain
  # text/vnd.wap.wml application/javascript
  # application/rss+xml
  # https://nginx.org/en/docs/http/ngx_http_charset_module.html#charset_types
  charset_types
      text/css
      text/plain
      text/vnd.wap.wml
      text/javascript
      text/markdown
      text/calendar
      text/x-component
      text/vcard
      text/cache-manifest
      text/vtt
      application/json
      application/manifest+json;

  # Include $http_x_forwarded_for within default format used in log files
  # https://nginx.org/en/docs/http/ngx_http_log_module.html#log_format
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  # Log access to this file
  # This is only used when you don't override it on a `server` level
  # Default: logs/access.log combined
  # https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log
  access_log /var/log/nginx/access.log main;

  # How long to allow each connection to stay idle.
  # Longer values are better for each individual client, particularly for SSL,
  # but means that worker connections are tied up longer.
  # Default: 75s
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout
  keepalive_timeout 20s;

  # Speed up file transfers by using `sendfile()` to copy directly between
  # descriptors rather than using `read()`/`write()``.
  # For performance reasons, on FreeBSD systems w/ ZFS this option should be
  # disabled as ZFS's ARC caches frequently used files in RAM by default.
  # Default: off
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile
  sendfile on;

  # Don't send out partial frames; this increases throughput since TCP frames
  # are filled up before being sent out.
  # Default: off
  # https://nginx.org/en/docs/http/ngx_http_core_module.html#tcp_nopush
  tcp_nopush on;

  # Enable gzip compression.
  # https://nginx.org/en/docs/http/ngx_http_gzip_module.html

  # Enable gzip compression.
  # Default: off
  gzip on;

  # Compression level (1-9).
  # 5 is a perfect compromise between size and CPU usage, offering about 75%
  # reduction for most ASCII files (almost identical to level 9).
  # Default: 1
  gzip_comp_level 5;

  # Don't compress anything that's already small and unlikely to shrink much if at
  # all (the default is 20 bytes, which is bad as that usually leads to larger
  # files after gzipping).
  # Default: 20
  gzip_min_length 256;

  # Compress data even for clients that are connecting to us via proxies,
  # identified by the "Via" header (required for CloudFront).
  # Default: off
  gzip_proxied any;

  # Tell proxies to cache both the gzipped and regular version of a resource
  # whenever the client's Accept-Encoding capabilities header varies;
  # Avoids the issue where a non-gzip capable client (which is extremely rare
  # today) would display gibberish if their proxy gave them the gzipped version.
  # Default: off
  gzip_vary on;

  # Compress all output labeled with one of the following MIME-types.
  # `text/html` is always compressed by gzip module.
  # Default: text/html
  gzip_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/vnd.ms-fontobject
    application/wasm
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/bmp
    image/svg+xml
    text/cache-manifest
    text/calendar
    text/css
    text/javascript
    text/markdown
    text/plain
    text/xml
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy;

  # Specify file cache expiration.
  include h5bp/web_performance/cache_expiration.conf;

  # Add X-XSS-Protection for HTML documents.
  map $sent_http_content_type $x_xss_protection {
    #           (1)    (2)
    ~*text/html "1; mode=block";
  }

  # Add X-Frame-Options for HTML documents.
  map $sent_http_content_type $x_frame_options {
    ~*text/html DENY;
  }

  # Add Content-Security-Policy for HTML documents.content-security-policy.conf
  map $sent_http_content_type $content_security_policy {
    ~*text/(html|javascript)|application/pdf|xml "default-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests";
  }

  # Add Referrer-Policy for HTML documents.conf
  map $sent_http_content_type $referrer_policy {
    ~*text/(css|html|javascript)|application\/pdf|xml "strict-origin-when-cross-origin";
  }

  # Add X-UA-Compatible for HTML documents.x-ua-compatible.conf
  map $sent_http_content_type $x_ua_compatible {
    ~*text/html "IE=edge";
  }

  # Add Access-Control-Allow-Origin.
  map $sent_http_content_type $cors {
    # Images
    ~*image/ "*";

    # Web fonts
    ~*font/                         "*";
    ~*application/vnd.ms-fontobject "*";
    ~*application/x-font-ttf        "*";
    ~*application/font-woff         "*";
    ~*application/x-font-woff       "*";
    ~*application/font-woff2        "*";
  }

  # Include files in the conf.d folder.
  # `server` configuration files should be placed in the conf.d folder.
  # The configurations should be disabled by prefixing files with a dot.
  include conf.d/*.conf;
}
```
