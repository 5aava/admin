# Hacktory admin

## DEVELOP ENV

Install and start with `npm`
```sh
npm i
npm run build
npm run dev
```
Build develop client \
Start server with `pm2 DEVELOP ENV`
```sh
npm run build
pm2 start ./start.js -n develop
```
---
## PRODUCTION ENV
Build production client \
Start server with `pm2 PRODUCTION ENV`

```sh
npm run prod
pm2 start ./start.js -n production
```
---

## TEST ENV

Run and check all `tests`

```
npm run test
```
---


## Config

In folder [./config/README.md](./config/README.md)


## Logs

In folder `./logs/`
