# Storefront Backend Project
# Instructions to run

## Database setup

Perform these statements:

**Create user**

```SQL
CREATE USER full_stack_user WITH PASSWORD 'password123';
```

**Create Databases**
```SQL
CREATE DATABASE storefront_backend;
CREATE DATABASE storefront_backend_test;
```

**Grant privileges to user in both databases**

```sh
psql -d storefront_backend -U postgres;
GRANT ALL ON schema public TO full_stack_user;
exit
psql -d storefront_backend_test -U postgres;
GRANT ALL ON schema public TO full_stack_user;
exit
psql -d storefront_backend -U full_stack_user;
```
## Environment setup

**Ports and host**

The used port is :3000
The host can be changed in the .env file with the variable POSTGRES_HOST
Standard is localhost

**Environment**

Start with "yarn migrate" to create the tables for dev and test environment.

ENV file should look like this:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_backend
POSTGRES_TEST_DB=storefront_backend_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=password123
SALT_ROUNDS=10
ENV=dev
TOKEN_SECRET=tokensecret123!
```
Toggle the test and dev mode by changing the variable in the .env file.

## Running

I have provided the endpoints as postman collection in the file "storefront_backend.postman_collection.json".
To start the API use "yarn watch".

The server is available under localhost:3000/
First, create a user and save the authorization token to use the other API calls.
Insert the authorization token as a header value with the key "authorization".
It should now be possible to make all the API calls.

To run the tests change first the environment variable to ENV=test
In the terminal run then "yarn test".

Use "yarn migratetestdown" if something goes wrong and the test database has to be reset.

