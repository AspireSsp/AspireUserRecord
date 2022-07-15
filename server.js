const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/DbConnnection');


// Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to Uncaught Exception');
    process.exit(1); 
})


// configuring the port
dotenv.config({path:'src/config/config.env'});
// database connection
connectDB()

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port  ${PORT}`);
});


///    unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to Unhandled promise Rejection');
       
    server.close(()=>{
        process.exit(1);
    });
})