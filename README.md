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
`pip install -r requirements.txt`

then run server:
`python server.py`



## backend api methods:
All requests shoud point to http://carpooling.dev:5000 with actions

### /user/login
params: email, password

login user

### /user/register
params: email, password, login, car, plates, desc

registers and login new user

### /user/get/<string:id>
params: <string:id>  - id user to get

retrieve user data

### /routes 
retrieves list of available routes

### /routes/<string:id>

params: <string:id>  - id route to get

retrieves route data

### /routes/join
params: route_id

signs user for route

### /routes/leave
params: route_id

unsigns user from route


### /blog
retrieves list of available blog posts

### /blog/post/<string:id>
params:  <string:id>  id of post blog to get

retrives blog post details

### /blog/save
params: title,text

saves blog post, requires logged user


