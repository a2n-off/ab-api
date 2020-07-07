# ab-api

personal nest api

# launch project

1 - create db user
```mongojs
use mydb;
db.createUser({user: "toto", pwd: "mypswd", roles: [{role: "readWrite", db: "mydb"}]});
```

2 - add `.env` (see § .env)

# .env

For development env : `.env.development`

```bash
db_user = the db user
db_pass = the db password
db_uri  = the db address
db_port = the db port
db_name = the db name 
```

# test

Launch test with `yarn test`.

The script consumes the `.env` file.

Each test file must be named according to the following scheme : `number_file-name`.

> Example `10_app.spec.ts`

This allows the jest sequencer to run the files in the desired order.
