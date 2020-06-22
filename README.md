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

```bash
db_user = the db user
db_pass = the db password
db_uri  = the db address
db_port = the db port
db_name = the db name 
```
