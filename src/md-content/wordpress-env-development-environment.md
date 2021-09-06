# @wordpress/env development environment

[@wordpress/env](wordpress-env-development-environment) allows you to create a development environment for your WordPress plugin or theme. It addresses the following use case:

***You want to test your theme or plugin without installing it on a live site, whether development or production.***

`@wordpress/env` requires Docker to be installed on your machine.There are instructions available for installing Docker on [Windows 10 Pro](https://docs.docker.com/docker-for-windows/install/), [all other versions of Windows](https://docs.docker.com/toolbox/toolbox_install_windows/), [macOS](https://docs.docker.com/docker-for-mac/install/), and [Linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script).

## Installing @wordpress/env

I've chosen to install the package globally rather than as a project dependency to make it easier to use accross multiple projects.

The install command looks like this:

```bash
npm -g i @wordpress/env
```

## Running @wordpress/env

Ensure that Docker is installed and running on your machine, then switch to the directory for your plugin or theme and run the following command:

```bash
wp-env start
```

This will start a Docker container with the WordPress environment (MySQL and WordPress) ready to run and your plugin or theme installed and configured for you.

Navigate to [http://localhost:8888](http://localhost:8888) to see the site. Go to [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin) to log in as the administrator. The default credentials are:

* username: `admin`
* password: `password`

### Running in a different port

`wp-env` uses port 8888 by default. You can configure the port that wp-env uses by specifying the `WP_ENV_PORT` environment variable when starting wp-env:

```bash
WP_ENV_PORT=3000 wp-env start
```

## Checking what resources are being used

If you're curious, you can check what resources wp-env is using by running this command from a terminal:

```bash
docker ps
```

## Stopping @wordpress/env

When you're done, you can stop the Docker container by running:

```bash
wp-env stop
```

This will stop any container started with `wp-env start` but will keep them around so you won't loose any work.

## Remove all content and start over

There may be times when you don't want to keep the work you have so far. You can remove all the content you've added to the WordPress environment by running:

```bash
wp-env clean all
wp-env start
```

Again be aware that the clean all command **will permanently delete any posts, pages, media, etc. in the local WordPress installation.**

## The nuclear option 🔥

When all else fails, you can use wp-env destroy to forcibly remove all of the underlying Docker containers and volumes. This will allow you to start from scratch.

To nuke everything run the following command:

```bash
wp-env destroy
```

You can start over if you want with `wp-env start`

***This will permanently delete any posts, pages, media, etc. in the local WordPress installation. It will also nuke any configuration changes you made to the system. Use it as a last resort!***

There are more options available to `wp-env`. Check the package's [Readme](https://www.npmjs.com/package/@wordpress/env) for more information
