# Use .htaccess to prevent access to files

http://m0n.co/04


```apacheconf
# SECURE LOOSE FILES
<IfModule mod_alias.c>
	RedirectMatch 403 (?i)(^#.*#|~)$
	RedirectMatch 403 (?i)/readme\.(html|txt)
	RedirectMatch 403 (?i)\.(ds_store|well-known)
	RedirectMatch 403 (?i)/wp-config-sample\.php
	RedirectMatch 403 (?i)\.(7z|bak|bz2|com|conf|dist|fla|git|inc|ini|log|old|psd|rar|tar|tgz|save|sh|sql|svn|swo|swp)$
</IfModule>
```
