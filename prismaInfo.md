[Skip to content](https://vercel.com/shinjadongs-projects/invitation/stores/integration/prisma/store_MvvFBXxOzRKZAVKz/guides#geist-skip-nav)[](https://vercel.com/shinjadongs-projects)

[![shinjadong's projects](https://vercel.com/api/www/avatar?teamId=team_MLloqpQSzp48DlMesZV9rCAi&s=44 "shinjadong's projects")shinjadong&#39;s projects**Pro**](https://vercel.com/shinjadongs-projects)

[![](https://vercel.com/api/v0/deployments/dpl_CzNA54cbrXmAVmEhuZpHEsgpVhGM/favicon?project=invitation&readyState=READY&teamId=team_MLloqpQSzp48DlMesZV9rCAi)invitation](https://vercel.com/shinjadongs-projects/invitation)

* [Changelog](https://vercel.com/changelog)
* [Help](https://vercel.com/help)
* [Docs](https://vercel.com/docs)

![](https://vercel.com/api/www/avatar/950cce4d5cecfc5a5f47abb6f4651ee4994c3b98?s=72)

# invitation

[](https://vercel.com/shinjadongs-projects/invitation/stores)

[All Databases](https://vercel.com/shinjadongs-projects/invitation/stores)[Installation](https://vercel.com/shinjadongs-projects/~/integrations/products/prisma/icfg_WmzOD3CgGzKJSKiUEz8tU3MB)Prisma Postgres

Status

Available

Created

49s ago

Plan

Free

Period Total

[See Installation](https://vercel.com/shinjadongs-projects/~/integrations/products/prisma/icfg_WmzOD3CgGzKJSKiUEz8tU3MB/settings)

Quickstart

```bash

```

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODZjMTY4ZDMtNzk1OS00MzdkLTlhNjQtOTkwZmJiZTk5ZDMwIiwidGVuYW50X2lkIjoiODg0YzJlMTkyYmY1OTgwNThhODlkZjRmNjJlMzg4NGFhMDQ5MzM2OWJhM2QyM2RlYjI1OWNhYTAyYmVhOWZkYyIsImludGVybmFsX3NlY3JldCI6ImZlYjgwYTQ0LTQ3NDMtNDQxMy05ZjI5LWRjMWQ4NGFlY2EyYyJ9.YF4pDd5kYvfcJFjFFiRqNlhmWlvTQcq7NzisOPZgTM0"
```

[Projects](https://vercel.com/shinjadongs-projects/invitation/stores/integration/prisma/store_MvvFBXxOzRKZAVKz/projects)[Settings](https://vercel.com/shinjadongs-projects/invitation/stores/integration/prisma/store_MvvFBXxOzRKZAVKz/settings)[Getting Started](https://vercel.com/shinjadongs-projects/invitation/stores/integration/prisma/store_MvvFBXxOzRKZAVKz/guides)[Usage](https://vercel.com/shinjadongs-projects/invitation/stores/integration/prisma/store_MvvFBXxOzRKZAVKz/usage)

RESOURCES

[Website](https://www.prisma.io/postgres?utm_source=vercel&utm_medium=marketplace)

[Docs](https://www.prisma.io/docs/postgres?utm_source=vercel&utm_medium=marketplace)[Support](https://www.prisma.io/support?utm_source=vercel&utm_medium=marketplace)[Pricing](https://www.prisma.io/pricing?utm_source=vercel&utm_medium=marketplace)[X] ![Framework logo](https://api-frameworks.vercel.sh/framework-logos/next.svg)Next.js

1

Set up a Next.js project

Use `create-next-app` to create a Next.js CRUD demo with Prisma Postgres using the official [Next.js example with Prisma Postgres](https://github.com/vercel/next.js/tree/canary/examples/prisma-postgres), navigate into the project directory and install dependencies:

```js
npx create-next-app@latest --template prisma-postgres my-prisma-postgres-appcd my-prisma-postgres-appnpm install
```

2

Connect Vercel project

Connect the `my-prisma-postgres-app` application on your local machine with a project in your Vercel team by running the following command:

```js
vercel link
```

3

Pull the database URL from Vercel

Now you can pull the `DATABASE_URL` environment variable from Vercel like so:

```js
vercel env pull .env.development.local
```

This will update your local `.env` file and configure your database connection to this Prisma Postgres instance.

4

Run migrations and seed the database

Create the database schema in your Prisma Postgres instance by running a migration:

```js
npx prisma migrate dev --name init
```

This
 will create a local SQL migration file and apply it against your remote
 database. Now, create some sample data so the UI won’t look empty when
you run the app:

```js
npx prisma db seed
```

5

Deploy the app to Vercel

Finally, you can use the `vercel` CLI to deploy your application:

```js
vercel deploy
```

[](https://vercel.com/home)

* [Home](https://vercel.com/home)
* [Docs](https://vercel.com/docs)
* [Guides](https://vercel.com/guides)
* [Help](https://vercel.com/help)
* [Contact](https://vercel.com/contact)
* 

[Loading status…](https://vercel-status.com)Select a display theme:[ ] system[X] light[ ] dark© 2025, Vercel Inc.
