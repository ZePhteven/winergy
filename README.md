<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

`WinErgy API` is repository based on [Nest](https://github.com/nestjs/nest) framework, using a `PostgreSQL` database via `TypeOrm` and can be run on docker.

It is designed to be a concrete project that display some of my abilities in Back End developments.

## Installation

```bash
$ pnpm install
```

### Installation & running w/ Docker

For the first launch, you will need to setup your environment.

Copy & rename the `.env.sample` file to `.env.development` and launch that command :

```bash
# Create you docker env
$ docker compose --env-file=.env.development up --build

# Get the postgreSQL container Id
$ docker ps
## this will display a lisst like below :
CONTAINER ID   IMAGE                                        COMMAND                  CREATED        STATUS          PORTS                           NAMES
[...]
acb10ee8ccaf   postgres                                     "docker-entrypoint.s…"   11 hours ago   Up 6 minutes    0.0.0.0:5432->5432/tcp          winergy-postgres
[...]

# Go inside the terminal of this container (`acb10ee8ccaf` is my id)
$ docker exec -it acb10ee8ccaf bash
```

Then, in the docker container (/!\ be careful, copy/paste is different here, use SHIFT+INSERT), create the database :

```bash
# Switch to the postgres user
root@05b3a3471f6f:/# psql -U postgres

# Create the database
postgres=# CREATE DATABASE winergy

# Check that the database exists
postgres=# \l
## this will display a list like below :
   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 [...]
 winergy   | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
(4 rows)
```

### Running the app (w/o Docker)

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## TypeOrm

Since this repo use `TypeOrm`, you will need to run migrations in order to make it work :

### Migration

```bash
# create new migration
$ npx typeorm migration:create src/database/migrations/<Migration Name>

# run migration show
$ pnpm run typeorm migration:show
or
$ npx typeorm-ts-node-commonjs -d orm.config.ts migration:show

# run migration up
$ pnpm run typeorm migration:run
or
$ npx typeorm-ts-node-commonjs -d orm.config.ts migration:run

# run migration down
$ pnpm run typeorm migration:revert
or
$ npx typeorm-ts-node-commonjs -d orm.config.ts migration:revert
```

### Some features

This API is shield by a basic authentication system, so in order to try it, you will have to get & send a token with your requests.
Since I used Swagger, it should be easy to use.

Firstly, you'll have to get a token, by SignIn with the endpoint :

```json
POST : /auth/login
{
  "username": "jack",
  "password": "sparrow"
}
```

The reponse will include a `accessToken` property that you will have to use in the Authorize section. Be aware that the token have an expiration date, so you will have to replace it.
Note : You can change the duration by updating the `auth.service.ts` file

Then, use the API like you want, creating a new Bottle entity

```json
POST : /bottles
{
  "name": "Gato negro",
  "price": 12.5,
  "producerId": 1,
  "retailerId": 1,
  "type": 2,
  "year": 2020
}
```

or a Note entity :
```json
POST : /notes
{
  "bottleId": 1,
  "expertId": 1,
  "note": 5
}
```

Provided you have created entities for that, you will be able to use the `/search` endpoints for retrieving data.

For example, if we want to get the first `5` bottles for which the `price` is included in a range from `10` to `50` euros, ordered by the `note`, we will use that body :
```json
POST : /bottles/search
{
  "filter": { "price": {"type" : 2, "data": {"type" : 0, "value": [10, 50] } }},
  "pageIndex": 0,
  "pageSize": 5,
  "sortColumns": [
    {
      "name": "note",
      "direction": "desc"
    }
  ]
}
```

This request will get you that kind of response :

```json
{
  "data": [
    {
      "id": 1,
      "createdAt": "2023-10-31T23:15:45.190Z",
      "updatedAt": "2023-11-02T13:18:54.620Z",
      "name": "Gato negro",
      "price": "12.5",
      "producerId": 1,
      "retailerId": 1,
      "type": 2,
      "year": 2020,
      "note": "4.67"
    }
  ],
  "total": 1
}
```
