const express= require('express');
const bodyParser=require('body-parser');


const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


const employee =require('./models/employee.schema');
const mongoose =require('mongoose');

const adminRoutes=require('./routes/admin');
const employeeRoutes=require('./routes/employee');
// fxcs8U0AcU7v8yDp
//augmgRFJHvNcWiJj
mongoose.connect("mongodb+srv://arjun:augmgRFJHvNcWiJj@cluster0.hpbgs.mongodb.net/empl?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(()=>{
        console.log('connected to database');
        })
    .catch(()=>{
        console.log('error occured')
    });

app.use((req,res,next)=>{
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    //   );
    next();
}  );
// app.use(app.router);
// routes.initialize(app);
app.use("/api/admin",adminRoutes);
app.use("/api/employee",employeeRoutes);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false  }));








module.exports = app;