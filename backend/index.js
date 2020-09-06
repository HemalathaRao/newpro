const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const stripe=require("stripe")("sk_test_51GibA2IbKrGGxAljJXHruIT59kPYQMjvmtF9Pp0v2tzMDIHJA9iF4dInZHv69O0gPmsgdgm2yLG2jrMT8OUoWhUY00XOfILVyu")
const uuid=require("uuid/v4")
//Load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
const colleges = require("./routes/colleges");
const events = require("./routes/events");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const category = require("./routes/category");
const student = require("./routes/student");
// const registeredlist = require("./routes/registeredlist");

//initialize app with express
const app = express();

//bodyparser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// payment
app.get("/payment",(req,res)=>{
  res.send("works")
})

app.post("/payment",(req,res)=>{
  const{product,token}=req.body;
  console.log("PRODUCT",product)
  console.log("PRICE",product.price)
  const idempotencyKey=uuid()

  return stripe.customers.create({
    email:token.email,
    source:token.id
  }).then(customer=>{
    stripe.charges.create({
      amount:product.price *100,
      currency:"usd",
      customer:customer.id,
      receipt_email:token.email,
      description:`purchase of product.name`,
      shipping:{
        name:token.card.name,
        address:{
          country:token.card.address_country
        }
      }
    },{idempotencyKey})
  }).then(result=>res.status(200).json(result))
  .catch(err=>console.log(err))
})
//Mount routers
app.use("/api/v1/colleges", colleges);
app.use("/api/v1/events", events);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/category", category);
app.use("/api/v1/students", student);
// app.use("/api/v1/registeredlist", registeredlist);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error :${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
