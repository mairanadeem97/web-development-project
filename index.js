require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
const categoryRoutes = require("./server/routes/category")
const productRoutes = require("./server/routes/product")
const cartRoutes = require("./server/routes/cart")  
const orderRoutes = require("./server/routes/order") 
//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/users", userRoutes)
app.use("/categories", categoryRoutes)
app.use("/products", productRoutes)
app.use("/carts", cartRoutes);   
app.use("/orders", orderRoutes);  

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3500

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`)) 
