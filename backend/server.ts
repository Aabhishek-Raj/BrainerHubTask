import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
import userRoute from "./routes/user";

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRoute);

mongoose.connect(process.env.MONGO_URI!)     
    .then(() => {
        console.log("Database Connected")
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch(console.error)