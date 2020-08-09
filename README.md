![GitHub](https://img.shields.io/github/license/bouteillerAlan/ab-api?style=flat-square)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=alert_status)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=security_rating)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=code_smells)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=sqale_index)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=ai%3Aservice_sonar&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ai%3Aservice_sonar&branch=develop)

🔗 [Install](#install) - 
[.env file](#env-file) - 
[Test](#test) -
[Roadmap](#roadmap)

# ab-api

Personal clean nest api

# Description

The objective of this repo is to offer me an nest api base already built to save time.

The update of the packages being the "only" to do

# Summary

- [💬 Description](#description) 
- [🎉 Install](#install) 
- [🔧 .env file](#env-file) 
- [⚗ Test](#test)
    - [Operation](#operation)
    - [Edit](#edit)
- [🔐 User & Admin level](#user--admin-level)
- [🚀 Roadmap](#roadmap)

# Install

> If your database does not need a password and user does not indicate them in the `.env` file the connection url will adapt itself

- [ ] Update the package with `yarn`
- [ ] add `.env` (see [§ .env](#env-file))
- [ ] create db user *if necessary*

```mongojs
use mydb;
db.createUser({user: "toto", pwd: "mypswd", roles: [{role: "readWrite", db: "mydb"}], mechanisms:["SCRAM-SHA-1"]});
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
jwt_secret = secret for the jwt
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

# User & Admin level

The application accepts two levels (roles): `admin` and` user`.

To allow a simpler and more global management of access rights there are two controllers in the `users` folder:
- one for `user`
- one for `admin`

Each of these controllers has the function that allows you to create the user with its role.
The assignment of this role cannot be modified via the creation or modification request.

# Roadmap

- [x] add CONTRIBUTING.md
- [x] add CODE_OF_CONDUCT.md
- [x] add issues templates
- [x] delete endpoint
    - [x] users
    - [x] categories
    - [x] articles
- [ ] check rest api best practices
- [x] set `.env.test` for test env
- [x] bcrypt
- [ ] add security
    - [x] jwt 
    - [x] roles
    - [ ] id in payload
    - [ ] login endpoint
    - [ ] logout endpoint
- [ ] check security handbook
- [ ] mongo login/out test
- [ ] crud users test
- [ ] crud categories test
- [ ] crud articles test
