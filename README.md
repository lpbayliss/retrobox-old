# next-template

## Docker

`docker build . -t retrobox --build-arg FONTAWESOME_NPM_AUTH_TOKEN=secret`

`docker run -p 3000:3000 -e NODE_ENV=production -e DATABASE_URL=postgresql://user:mysecretpassword@host.docker.internal:5432/?schema=public retrobox`
