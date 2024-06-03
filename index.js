require("dotenv").config();
const express = require('express');
const app = express()
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.DATABASE_URL;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        const userCollection = client.db("best-shopping").collection("userCollection");
        const shoesCollection = client.db("best-shopping").collection("shoesCollection");
        await client.db("admin").command({ ping: 1 });
        console.log("Database is connected");
    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`best-shopping is listening on port ${port}`)
})