const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// practice1
// ujfHJ88nK7ZYpWar



const uri = "mongodb+srv://practice1:ujfHJ88nK7ZYpWar@cluster0.upsvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('practiceUser').collection("userName");

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        });

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const service = await userCollection.insertOne(newUser);
            res.send(service);
        });

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.deleteOne(query);
            res.send(user);
        })
    }
    finally {

    }
}


run().catch(console.dir());




app.listen(port, () => {
    console.log("Practice server is Listening", port);
});