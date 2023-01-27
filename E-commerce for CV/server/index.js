const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

dotenv.config()


const app = express()
const { Schema } = mongoose;
const productSchema = new Schema({
    imgUrl: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true
})

const Products = mongoose.model("test_2", productSchema)
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("<h1>Admin Panel</h1>")
})

//GET ALL DATAS

app.get("/products", (req, res) => {
    Products.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.status(404).json({ message: err })
        }
    })
})


//GET PRODUCT BY ID

app.get("/products/:id", (req, res) => {
    const { id } = req.params
    Products.findById(id, (err, docs) => {
        if (!err) {
            if (docs) {
                res.send(docs)
            } else {
                res.status(404).json({ message: "nOT Found" })
            }
        } else {
            res.status(404).json({ message: err })
        }
    })
})

//POST PRODUCT
app.post("/products", (req, res) => {
    const newObj = new Products({
        imgUrl: req.body.imgUrl,
        name: req.body.name
    })
    newObj.save()
    res.send("Data created")
})

//DELETE PRODUCT BY ID

app.delete("/products/:id", (req, res) => {
    const { id } = req.params
    Products.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.send("Deleted data")
        } else {
            res.status(404).json({ message: err })
        }
    })
})



const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)
const PORT = process.env.PORT
mongoose.set('strictQuery', false);
mongoose.connect(url, (err) => {
    if (!err) {
        console.log("DB CONNNECTED");
        app.listen(PORT, () => {
            console.log("SERVER START");
        })
    }
})