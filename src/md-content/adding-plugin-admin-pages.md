# Plugin Topics: Adding Plugin Admin Pages

If we want to allow users to configure our plugin, we can add menus to the admin pages either as a top-level menu or a submenu of an existing menu.

When used with the settings and options APIs we get control of how users configure the plugin from the admin area, assuming that they have permission to do so.

## Top Level Menus

[Top-Level Menus](https://developer.wordpress.org/plugins/administration-menus/top-level-menus/) are what people see when they first view the admin area. This means that our admin page has more visibility but, depending on the plugin, it may be better to use a submenu

The first step is to create a function that outputs the HTML. In this function, we will perform the necessary security checks and render the options we’ve registered using the Settings API.

<div class="message info">
  <p><strong>Note:</strong></p>
  <p>Wrap your HTML using a <code>&lt;div></code> with a class of <code>wrap</code>.
</p></div>

```php
<?php
function rivendellweb_options_page_html() {
?>
  <div class="wrap">
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
    <form action="options.php" method="post">
      <?php
      // output security fields for the registered setting "rivendellweb_options"
      settings_fields( 'rivendellweb_options' );
      // output setting sections and their fields
      // (sections are registered for "rivendellweb", each field is registered to a specific section)
      do_settings_sections( 'rivendellweb' );
      // output save settings button
      submit_button( __( 'Save Settings', 'textdomain' ) );
      ?>
    </form>
  </div>
  <?php
  }
```

The second step is to register the Rivendellweb menu. Make sure you attach your function as a callback to the [admin_menu](https://developer.wordpress.org/reference/hooks/admin_menu/) hook.

```php
<?php
function rivendellweb_options_page() {
  add_menu_page(
      'Rivendellweb',
      'Rivendellweb Options',
      'manage_options',
      'rivendellweb',
      'rivendellweb_options_page_html',
      plugin_dir_url(__FILE__) . 'images/icon_rivendellweb.png',
      20
  );
}

add_action( 'admin_menu', 'rivendellweb_options_page' );
```

For a list of parameters and what each, see the add_menu_page() in the reference.

## Sub Menus

[Sub-Menus](https://developer.wordpress.org/plugins/administration-menus/sub-menus/) place the admin page as a submenu of an existing page. For most plugins, this makes more sense than creating a top-level menu.

Just like with top-level menus, adding a submenu is a two-step process.

The first step creates a function that will output the HTML. In this function, we will perform the necessary security checks and render the options we’ve registered using the Settings API.

```php
<?php
function rivendellweb_options_page_html() {
    // check user capabilities
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post">
            <?php
            // output security fields for the registered setting "rivendellweb_options"
            settings_fields( 'rivendellweb_options' );
            // output setting sections and their fields
            // (sections are registered for "rivendellweb", each field is registered to a specific section)
            do_settings_sections( 'rivendellweb' );
            // output save settings button
            submit_button( __( 'Save Settings', 'textdomain' ) );
            ?>
        </form>
    </div>
    <?php
}
```

The second step is to register the Sub-menu. Attach the registration to the `admin_menu` action hook.

```php
<?php
function rivendellweb_options_page()
{
    add_submenu_page(
        'tools.php',
        'Rivendellweb Options',
        'Rivendellweb Options',
        'manage_options',
        'rivendellweb',
        'rivendellweb_options_page_html'
    );
}
add_action('admin_menu', 'rivendellweb_options_page');
```

For a list of parameters and what each do see the [add_submenu_page()](https://developer.wordpress.org/reference/functions/add_submenu_page/) in the reference.

## Settings API

You must define a new setting using [register_setting()](https://developer.wordpress.org/reference/functions/register_setting/), it will create an entry in the `{$wpdb->prefix}_options` table.

You can add new sections on existing pages using [add_settings_section()](https://developer.wordpress.org/reference/functions/add_settings_section/).

You can add new fields to existing sections using [add_settings_field()](https://developer.wordpress.org/reference/functions/add_settings_field/).

<div class="message danger">
  <p><strong>Alert:</strong></p>
  
  <p><code>register_setting()</code> as well <code>add_settings_*()</code> functions should be added to the <code>admin_init</code> action hook.</p>
</div>

This is a full example of settings:

```php
<?php
function rivendellweb_settings_init() {
    register_setting('reading', 'rivendellweb_setting_name');
 
    add_settings_section(
        'rivendellweb_settings_section',
        'Rivendellweb Settings Section', 'rivendellweb_settings_section_callback',
        'reading'
    );
 
    add_settings_field(
        'rivendellweb_settings_field',
        'Rivendellweb Setting', 'rivendellweb_settings_field_callback',
        'reading',
        'rivendellweb_settings_section'
    );
}
 
/**
 * register rivendellweb_settings_init to the admin_init action hook
 */
add_action('admin_init', 'rivendellweb_settings_init');
 
/**
 * callback functions
 */
 
function rivendellweb_settings_section_callback() {
    echo '<p>Rivendellweb Section Introduction.</p>';
}
 
// field content cb
function rivendellweb_settings_field_callback() {
    $setting = get_option('rivendellweb_setting_name');
    ?>
    <input type="text" name="rivendellweb_setting_name" value="<?php echo isset( $setting ) ? esc_attr( $setting ) : ''; ?>">
    <?php
}
```

### Registering Settings

See [register_setting()](https://developer.wordpress.org/reference/functions/add_settings_field/) in the Function Reference for an explanaton about the used parameters.

### Addings Settings Sections

Sections are the groups of settings you see on WordPress settings pages with a shared heading. In your plugin, you can add new sections to existing settings pages rather than creating a whole new page. This makes your plugin simpler to maintain and creates fewer new pages for users to learn.

Please [add_settings_section()](https://developer.wordpress.org/reference/functions/register_setting/) for full explanation about the used parameters.

### Adding Fields

Refer to the Function Reference about [add_settings_field()](https://developer.wordpress.org/reference/functions/add_settings_section/) for information about the used parameters

### Getting Settings

Getting settings is accomplished with the [get_option()](https://developer.wordpress.org/reference/functions/get_option/) function.

The function accepts two parameters: the name of the option and an optional default value for that option.

```php
<?php
$setting = get_option('rivendellweb_setting_name');
```

## Options API

The Options API allows developers to create, read, update and delete WordPress options. ***As far as I understand it, the Settings API lays out the settings page and the Options API handles storing and retrieving the options from the database.***

### Where Options are Stored?

Options are stored in the `{$wpdb->prefix}_options` table. `$wpdb->prefix` is defined by the `$table_prefix` variable set in the wp-config.php file.

### How Options are Stored?

Options may be stored in the WordPress database in one of two ways: as a single value or as an array of values.

#### Single Value

When saved as a single value, the option name refers to a single value.

```php
<?php
// add a new option
add_option('rivendellweb_custom_option', 'hello world!');
// get an option
$option = get_option('rivendellweb_custom_option');
```

#### Array of Values

When saved as an array of values, the option name refers to an array, which itself may be comprised key/value pairs.

***If you have a large number of options to set, using arrays of values is the better solution since adding an array reduced the number of computationally expensive transactions required to save the options.***

```php
<?php
// array of options
$data_r = array('title' => 'hello world!', 1, false );
// add a new option
add_option('rivendellweb_custom_option', $data_r);
// get an option
$options_r = get_option('rivendellweb_custom_option');
// output the title
echo esc_html($options_r['title']);
```

#### Available functions

The following functions are available as part of the Options API. The difference between the `*_site_option` functions and their plain counterparts is that the `site` functions are meant for WordPress multi site networks where the other ones are meant for individual sites.

* Add Option
  * [add_option()](https://developer.wordpress.org/reference/functions/add_option/)
  * [add_site_option](https://developer.wordpress.org/reference/functions/add_site_option/)
* Get Option
  * [get_ottion()](https://developer.wordpress.org/reference/functions/get_option/)
  * [get_site_option()](https://developer.wordpress.org/reference/functions/get_site_option/)
* Update Option
  * [update_option()](https://developer.wordpress.org/reference/functions/update_option/)
  * [update_site_option()](https://developer.wordpress.org/reference/functions/update_site_option/)
* Delete Option
  * [delete_option()](https://developer.wordpress.org/reference/functions/delete_option/)
  * [delete_site_option()](https://developer.wordpress.org/reference/functions/delete_site_option/)
