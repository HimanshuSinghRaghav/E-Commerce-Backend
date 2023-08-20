import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import registerRouter from './routes/register.route.js'
import loginRouter from './routes/login.route.js'
import config from 'config'
import userRouter from './routes/users.route.js'

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR : jwt private key is not defined')
  process.exit(1)
}
const app = express();

// Connect to MongoDB
mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('MongoDB connection error:', error));

const port = process.env.PORT | 3000;
// Set up middleware
app.use(express.json()); 
app.use(cors());

// User Endpoints
app.use('/user', registerRouter);
app.use('/user' , loginRouter);
app.use('/user' , userRouter)


app.use('/seller', registerRouter);
app.use('/seller' , loginRouter);

app.get('/' , (req, res)=>res.send("server running in development"))
// Start the server
app.listen(port, () => {
  console.log('Server started server sunning at http://localhost:3000');
});
