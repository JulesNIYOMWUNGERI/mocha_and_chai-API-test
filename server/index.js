import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import videoRouter from './routes/videoRouter.js';





const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());


app.get('/api/welcome',(req,res) => {
    res.status(200).send({message:"welcome to the mocha and chai test API"});
});


app.use('/api/videos',videoRouter);




const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server is running on port:http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));



export default app;



