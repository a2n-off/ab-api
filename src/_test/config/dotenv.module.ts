const options = process.env.NODE_ENV === 'github_action' ? '' : { path: `${__dirname}/.env.test` };
require('dotenv').config(options);
