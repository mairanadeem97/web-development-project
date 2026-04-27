require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
const productRoutes = require("./server/routes/product")
app.use("/users", userRoutes)
app.use("/products", productRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3500

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))