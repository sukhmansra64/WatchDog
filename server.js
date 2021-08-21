const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT|| 8080

//connect database
connectDB;

//initialize middlewares
app.use(express.json());

//routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));

app.get('/',(req,res)=>{
    res.status(200).json({msg: "Server working"});
});

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});
