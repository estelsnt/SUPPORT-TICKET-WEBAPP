###### instructions
- install node js
- install mysql
- install a web server
- fill up the config.json(description below) with your environment info
- open console on ticket-support-express and run 
    - "npm install"
    - "npm run seed" 
    - for development environment run
        - "npm run dev"
    - for production environment run
        - "npm install -g pm2"
        - "npm run prod"
- open console on ticket-support-react and run
    - "npm install"
    - for development run
        - "npm run dev"
    - for production run
        - "npm run build" (creates build files on dist/ copy this to your web root)

###### config.json
- GOOGLE_CLIENT_ID: your google oauth2 api key
- EXPRESS_PORT: backend express will use this port
- MTSQL_PORT: default mysql port is 3306, no need to change. or perhaps
- BACKEND_BASE_URL: the url for the running express app, change to domain name on your production server
                    ex: https://itrackmobilesupport.online:3000 or if express app is reversed proxy: https://itrackmobilesupport.online/api
                    react front end will use this url
- FRONT_END_BASE_URL: the default is /. but if you deployed the front end in subdirectory then change it. ex: /support
- MYSQL_HOST: default mysql database host: localhost or something like 12.0.0.1
- MYSQL_USER: mysql user name
- MYSQL_PASSWORD: mysql password
- MYSQL_DATABASE: database name for this system
- WEB_ROOT: path where your web server will host the front end. ex: C://xampp/htdocs, /apache2/html, etc,..
            upon building the front end it should copy the build files to this path
- SECRET_KEY: used for generating JSON Web Tokens

###### notes
- you should change cors information on ticket-support-express/index.js
- by default all users are clients.
- default admin user is your ADMIN_EMAIL in config.json and password is: 123456