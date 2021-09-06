# WordPress Must Use (MU) Plugins

While researching Custom Post Types I found a little known technique to ensure plugins are installed and run regardless user interaction.

The idea is that the [Must Use Plugins](https://wordpress.org/support/article/must-use-plugins/) will be active by default and administrators will not be able to remove them from the admin Plugins GUI, making the must-use directory the perfect place to put code that must run to make the installation work, possibly like CPT and other customization plugins that we want/need to run indepdent of the theme we use.

Must-use plugins are not perfect. For all the advantages that they offer, they also have several and disadvantages that may render them less useful than you first thought

* **Advantages**
  * MU Plugins are always-on
    * No need to enable via admin
    * Administrators and users cannot disable them other than by deleting the plugin from the directory manually
  * Can be enabled by uploading file to the mu-plugins directory, No login necessary
  * PHP loads Must-Use plugins in alphabetical order ***before normal plugins***, meaning API hooks added in an mu-plugin apply to all other plugins
* **Disadvantages and Caveats**
  * Plugins in the must-use directory will not appear in the update notifications nor show their update status on the plugins page
    * You are responsible for learning about and performing updates to these plugins
  * WordPress only looks for PHP files right inside the mu-plugins directory, and not for files in subdirectories
    * You may want to create a proxy PHP loader file inside the mu-plugins directory that loads all the plugins your must-use plugins
  * [Activation hooks](https://codex.wordpress.org/Function_Reference#register_activation_hook) are not executed in plugins added to the must-use plugins folder
    * These hooks are used by many plugins to run installation code that sets up the plugin initially and/or uninstall code that cleans up when the plugin is deleted
    * Plugins depending on these hooks may not function in the mu-plugins folder
    * You should test all plugins  specifically in the mu-plugins directory before being deployed to a live site
