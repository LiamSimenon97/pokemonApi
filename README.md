This is a pokemon api

## Setup
- Create a .env file with your information in of your database like this example with your information:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5003/pokemon?connection_limit=5&pool_timeout=0"
```

- First install all packages with the command:
```bash
npm i
```
- run the command:
```bash
docker compose up
```
- After this type command:
```bash
npx prisma migrate deploy && npx prisma generate && npx prisma db seed
```

Everything is setup

## Start application 

- to start the application type command:
```bash
 npm start or npm run start:dev
```
- to import files from the external api type command :
```bash
npx ts-node importData/importPokemon.command.ts import-data --nameOrId="303"
```
The 303 at the end can be the id or name of the pokemon you want to import 
This will also save a image of the pokemon to a folder named importData/imagesSaved
- For the team you will need a hardcode jwt token to access it : 123456789123456789123456789

## Not finished/will not work
- testing
- We can run the database and app in docker but we will need to manually seed it(seeding it while composing it gives an connection pool timeout error);

- to see the swagger output you can go to : http://localhost:3000/api

