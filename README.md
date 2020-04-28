<p align='center'><img src='./images/graphql.png' width=300></p>
<p align='center'><img src='./images/prisma_.png' width=500 height=170></p>
<br />

## Bloging Application API using GraphQL and Prisma
#### Here is the [datamodel.graphql](./prisma/datamodel.graphql)
     
### First install all the required packages and tools
- `docker` and `docker-compose` from here
    [Official Docker Downloads](https://docs.docker.com/get-docker/)
- This project is using Prisma v1.34, you can download from npm library<br />
    ` > npm i prisma`
#### To run this project follow these steps
- First create a `config` directory in the root of the project and create three .env vars
    ```
    ./conifg
    |_
      |____ prod.env
      |____ dev.env
      |____ test.env
    ```
- For each deployment type config the env vars, like the following
    ```
        .env
        |__
            PRISMA_ENDPOINT=http://localhost:3000/SERVICE_NAME/STAGE_NAME
            PRISMA_SECRET="some_secret_series_of_chars"
            JWT_SECRET="Another_secret_series_of_chars"
    ```
- Go to `prisma` directory and copy your database credentials (In this project I'm using Postgresql, but you can use any database ) to `docker-compose.yml` and finally run the following commands in your terminal
    ````
        ./prisma
        |
        |___
        |    datamodel.graphql
        |___
        |    docker-compose.yml
        |___
             prisma.yml
    ````
`> docker-compose up -d` <br />

##### It will initiate docker container in which our prisma server will run <br />

`> prisma deploy -e ../config/dev.env` <br /><br />
Go to root dir and run 
``` 
    npm get-schema
```
This will fetch required datamodel from prisma endpoint running at `http://localhost:4466`, a file called `prisma.graphql` will be created in `./src/generated/`

- At last return back to root directory and run `npm run dev` , this will run the app in development mode. After this go to `localhost:3000`, you'll see graphql playground with which you can excute graphql queries from browser.

### Running the tests ( Using JEST )

- First deploy prisma test environment using `prisma deploy -e ../config/test.env`,
    - Also don't forget to give different service and stage name to PRISMA_ENDPOINT in test mode. <br />
- `> npm run test`

## License
 This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details