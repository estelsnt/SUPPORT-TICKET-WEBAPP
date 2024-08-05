# users related routes

- user login (using Gmail)
    - route: /users/login
    - type: POST
    - headers: {'Content-Type': 'application/json'} 
    - body: {// json object returned from Gmail OAuth2}
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- user login (manual input)


- verifies a jwt token
    - route: /users/verify
    - method: POST
    - headers: {'Authorization: 'your jwt token'}
    - body: none
    - response: {token: 'jwt token', user: {id: string, name: string, email: string, picture: string, access: string}}

- get list of users given access type and search query