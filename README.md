# Economy Express

An API to track personal income and expenses.

## Get started

### Prerequisites

Be sure you have installed
* Node.js >= 18
* MySql Server

### Clone the repo

```sh
git clone https://github.com/napolesmoa1006/economy-express.git
```

### Install Dependencies

```sh
npm install
```

### APILayer account
To use Economy Express, you need an [APILayer](https://apilayer.com/) account to get all the currencies. This operation will only be performed once, when the database is created.

### Configure the api
Rename the file [sample.env](sample.env) to **.env** and edit the environment variables according to your needs.

```dosini
PORT="Port that will be used by the API"
NODE_ENV="development" #production
#The default user is used to insert the initial data into the database. It cannot be used to perform operations.
DEFAULT_USER_USERNAME="A random name"
DEFAULT_USER_PASSWORD="A random password"
#The SECRET TOKEN is used to generate the authentication token (JWT)
SECRET_TOKEN="String with 32 random characters"
API_LAYER_KEY="Token belonging to the APILayer account"

# Development
DEV_DB_USERNAME="A MySql user"
DEV_DB_PASSWORD="Password user"
DEV_DB_NAME="Database name"
DEV_DB_HOST="Host where MySql is installed"
DEV_DB_PORT="Port used by MySql"
DEV_DB_DIALECT=mysql
```

### Initialize database
```sh
npm run restart-database
```

### Run api
```sh
npm run dev
```

To use the api go to http://localhost:3000 or modify the url according to the port specified in the configuration
