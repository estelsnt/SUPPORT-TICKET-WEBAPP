# users related routes

- user login (using Gmail) - uses gmail oauth2, registers user if not yet, proceeds login
    - route: /users/login
    - type: POST
    - headers: {'Content-Type': 'application/json'} 
    - body: {// json object returned from Gmail OAuth2}
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- user login (manual input) - verifies user email and password, returns login status and a token
    - route: /users/login2
    - type: POST
    - headers: {'Content-Type': 'application/json'}
    - body: {email: string, password: string}
    - response: {status: boolean, message: string, token: 'JWT token'}

- verifies a jwt token
    - route: /users/verify
    - method: POST
    - headers: {'Authorization': 'your jwt token'}
    - body: none
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- get list of users given access type and search query
    - route: /users/<access(admin, user, client)>?query=<query string>
    - method: GET
    - headers: {'Authorization': 'your jwt token'}
    - body: none
    - response: {status: boolean, message: int, data: [{access: string, email: string, id: int, name: string, picture: string}, ...]}

- manually insert a user from system
    - route: /users/add
    - method: POST
    - headers: {'Authorization': 'your jwt token', 'Content-Type': 'application/json'}
    - body: {email: string, name: string, password: string, access: string}
    - response: {status: boolean, message: string}

- edit user account
    - route: /users/edit
    - method: POST
    - headers: {'Authorization': 'your jwt token', 'Content-Type': 'application/json'}
    - body: {email: string, name: string, password: string, access: string}
    - response: (status: boolean, message: string)

- disable a user
    - route: /users/disable
    - method: POST
    - headers: {'Authorization': 'your jwt token', 'Content-Type': 'application/json'}
    - body: {email: string}
    - response: {status: boolean, message: string}

# categories related api