# My project's README


# Angular project generator

``` https://github.com/yeoman/generator-angular ```


# first install
`npm install -g grunt-cli bower yo generator-karma generator-angular`

Install ruby:  http://rubyinstaller.org/downloads/
Install compass: `gem install compass`

Then go to angular folder then type in console  `npm install`

# develop

Run `grunt` for building and `grunt serve` for preview



#php virtualhost

```
<VirtualHost *:80>
    SetEnv APPLICATION_ENV "development"
    ServerName carpooling.dev
    DocumentRoot "/Users/grzegorz/OneDrive/Uczelnie/UEK/SPA/spa_projekt"
    
    <Directory "/Users/grzegorz/OneDrive/Uczelnie/UEK/SPA/spa_projekt">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>

```