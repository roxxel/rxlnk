import { Db, MongoClient, ServerApiVersion } from "mongodb";

const globalForMongo = global as unknown as {mongo: Db | undefined, client: MongoClient | undefined}

export const rxdb = async () => {
    if (globalForMongo.mongo) {
        return globalForMongo.mongo
    }
    const client = new MongoClient(process.env.MONGO_CONNECTION_URL!, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
    });
    await client.connect()
    const db = await client.db('rxlnk')
    globalForMongo.mongo = db
    globalForMongo.client = client
    return globalForMongo.mongo
}
