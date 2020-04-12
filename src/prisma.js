import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
