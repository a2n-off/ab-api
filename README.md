![GitHub](https://img.shields.io/github/license/bouteillerAlan/ab-api?style=flat-square)

# ab-api

Personal clean nest api

# Description

The objective of this repo is to offer me an nest api base already built to save time.

The update of the packages being the "only" to do

# Install

- [ ] Update the package with `yarn`
- [ ] add `.env` (see [§ .env](#.env))
- [ ] create db user

```mongojs
use mydb;
db.createUser({user: "toto", pwd: "mypswd", roles: [{role: "readWrite", db: "mydb"}]});
```
- [ ] launch in dev with `yarn dev` or in prod with `yarn build` `yarn start:prod`

# .env file

For development env : `.env.development`

For test env : `.env`

For prod env : `.env`

```bash
db_user = the db user
db_pass = the db password
db_uri  = the db address
db_port = the db port
db_name = the db name 
```

# Test

Launch test with `yarn test`.

The script consumes the `.env` file.

Each test file must be named according to the following scheme : `number_file-name`.

> Example `10_app.spec.ts`

This allows the jest sequencer to run the files in the desired order.

# Roadmap

- [ ] users, categories, articles delete endpoint
- [ ] check rest api best practices
- [ ] set `.env.test` for test env
- [ ] bcrypt
- [ ] add security
    - [ ] jwt 
    - [ ] roles
    - [ ] id in payload
- [ ] check security handbook
- [ ] crud users test
- [ ] crud categories test
- [ ] crud articles test
