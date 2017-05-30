# My project's README


# first install
`npm install -g grunt-cli bower yo generator-karma generator-angular`

Install ruby:  http://rubyinstaller.org/downloads/
Install compass: `gem install compass`

Then go to angular folder then type in console  `npm install`

# develop

Run `grunt` for prod building and `grunt serve` for developing



#php virtualhost for angular app

```
<VirtualHost *:80>
    SetEnv APPLICATION_ENV "development"
    ServerName carpooling.dev
    DocumentRoot "/Users/grzegorz/OneDrive/Uczelnie/UEK/SPA/spa_projekt/angular/dist"
    
    <Directory "/Users/grzegorz/OneDrive/Uczelnie/UEK/SPA/spa_projekt/angular/dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```


# backed api

creatend in python with flask framework
go to python-server and run
`pip install -r requirements.tx`