![GitHub](https://img.shields.io/github/license/bouteillerAlan/ab-api?style=flat-square)

[[Description](#description)] | [[Install](#install)] | [[.env file](#env-file)] | [[Test](#test)] | [[Roadmap](#roadmap)]

# ab-api

Personal clean nest api

# Description

The objective of this repo is to offer me an nest api base already built to save time.

The update of the packages being the "only" to do

# Install

> If your database does not need a password and user does not indicate them in the `.env` file the connection url will adapt itself

- [ ] Update the package with `yarn`
- [ ] add `.env` (see [§ .env](#env-file))
- [ ] create db user *if necessary*

```mongojs
use mydb;
db.createUser({user: "toto", pwd: "mypswd", roles: [{role: "readWrite", db: "mydb"}]});
```
- [ ] launch in dev with `yarn dev` or in prod with `yarn build` `yarn start:prod`

# .env file

For development env : `.env.development`

For test env : `.env.test` in `src/_test/config`

For prod env : `.env`

```bash
db_user = the db user
db_pass = the db password
db_uri  = the db address
db_port = the db port
db_name = the db name 
bcrypt_salt = saltRounds for bcrypt
```

# Test

## operation

Launch test with `yarn test`.

The script consumes the `.env.test` file **that you have to create** in the `src/_test/config` folder.

## edit

- Each config file need to be write in typescript.
- Each config file need to be place in the `config` folder.
- Each test file need to be named after the following scheme : `number_file-name`
  > Example `10_app.spec.ts`

  This allows the jest sequencer (in `src/_test/config`) to run the files in the desired order.
- Each test need to be fragmented with `describe` and `it` block

# Roadmap

- [x] add CONTRIBUTING.md
- [x] add CODE_OF_CONDUCT.md
- [x] add issues templates
- [ ] users, categories, articles delete endpoint
- [ ] check rest api best practices
- [x] set `.env.test` for test env
- [x] bcrypt
- [ ] add security
    - [ ] jwt 
    - [ ] roles
    - [ ] id in payload
- [ ] check security handbook
- [ ] mongo login/out test
- [ ] crud users test
- [ ] crud categories test
- [ ] crud articles test
