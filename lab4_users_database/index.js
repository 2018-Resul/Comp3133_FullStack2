const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');

const app = express();
app.use(express.json());

var dbUrl = "mongodb+srv://resul:resulpassword@comp3123resul.xubgo.mongodb.net/Users?retryWrites=true&w=majority";


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(userRouter);

app.listen(3000, () => { console.log('Server is running at port 3000...') });