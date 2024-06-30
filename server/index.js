import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


dotenv.config();
//this one allows us to pool our environment variable from dotenv file

const app = express(); //initialize express application
app.use(cors()); //additional middle layer
app.use(express.json({ limit : '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//ready to create a first route
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!!!!');
})

//to run this
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
    }

startServer();