# Retrobox

Retrobox is a tiny utility for collecting and sharing retro items so you don't forget about them on the big day.

## What's inside?

This project uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: An Express API applying some Clean Architecture patterns
- `web`: An [Next.js](https://nextjs.org) app
- `ui`: React component library
- `them`: Chakra UI theme config
- `database`: Prisma config
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Setup

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```

### Database

You can use the following commands for managing the database and migrations

- `db:migrate:deploy`
- `db:push`
- `db:seed`
- `generate`

### Deploy

Retrobox is hosted on Fly.io, each deployment is separate and can be done with the `deploy:api` or `deploy:web` commands

## Docker

You can spin up a postrgres database with the following command, ensuring you have docker installed already of course.

`docker run -d --name retrobox-postgres -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=retrobox postgres`
