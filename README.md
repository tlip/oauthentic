# oauthentic

An Typescript authentication service bootstrap built with [Passport](https://github.com/jaredhanson/passport) and [Oauth2orize](https://github.com/jaredhanson/oauth2orize). User sessions are stored in a Redis cache with user database managed by [TypeORM](https://github.com/typeorm/typeorm/).


## Getting Started
* Make sure you have _at least_ `node v10.13.0+` and `yarn v1.13.0+` installed.
* Make sure you have both Redis and a relational database installed locally and running.
* Clone the repo
```sh
$ git clone https://github.com/flamingYawn/oauthentic.git
$ cd oauthentic
```
* Install dependencies
```sh
$ yarn
```
* Install `ts-node` and `typeorm` globally
```sh
$ yarn global add ts-node typeorm
```
* Create a new database named `oauth` in whatever RDB you're using.
* Replace the example environment variables in `.env`.
* Start the server for the first time
```sh
$ yarn start
```
* Run the initial DB migration
```sh
$ typeorm migration:run
```

And then you should be good to go.
