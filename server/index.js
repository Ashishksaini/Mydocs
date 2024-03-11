const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log("DB connection successful!"));

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
    );
    
    
const { server } = require('./app.js');
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log("Server is running on the PORT " + PORT);
})
