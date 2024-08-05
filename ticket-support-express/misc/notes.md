# users related routes

- user login (using Gmail) - uses gmail oauth2, registers user if not yet, proceeds login
    - route: /users/login
    - type: POST
    - headers: {'Content-Type': 'application/json'} 
    - body: {// json object returned from Gmail OAuth2}
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- user login (manual input) - verifies user email and password, returns token
    - route: /users/login2
    - type: POST
    - headers: {'Content-Type': 'application/json'}
    - body: {email: string, password: string}
    - response: {status: boolean, token: 'jwt token'(if success), message: string}

- verifies a jwt token
    - route: /users/verify
    - method: POST
    - headers: {'Authorization': 'your jwt token'}
    - body: none
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- get list of users given access type and search query

- manually insert a user from system
    - route: /users/add
    - method: POST
    - headers: {'Authorization': 'your jwt token', 'Content-Type': 'application/json'}
    - body: {email: string, name: string, password: string, access: string}
    - response: {status: boolean, message: string}