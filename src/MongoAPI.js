// DotEnv will let us access the .env file containing env variables
require('dotenv').config()

// Set up Express
const express = require("express")
const app = express()

// Set up Mongoose to pull from MongoDB with a schema
const mongoose = require('mongoose')

// Set up CORS so you can integrate stuff into other pages
const cors = require("cors")
app.use(cors())

// Set up Mongo connection
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
// "Replace myFirstDatabase with the name of the database that connections will use by default"
// code chunk pulled from MongoDB Atlas --> UMich DPSS Data --> Overview tab --> Connect button
const uri = `mongodb+srv://${username}:${password}@umich-dpss-data.7otst.mongodb.net/CrimeLog?retryWrites=true&w=majority`;

//const collection = client.db("CrimeLog").collection("DatesHarvested");

mongoose.connect(uri)

const recordSchema = new mongoose.Schema({
  id: String,
  date : Date, 
  description : String,
  location : String,
  address : String,
  disposition : String,
  narrative : String,
  status : String,
  latitude : Number,
  longitude : Number,
  isoDate: Date
})

const Record = mongoose.model("CrimeReports", recordSchema, "CrimeReports")

// {location: "700 KMS PLACE"}
// {description: "ARSON"}

app.get("/test", async (request,response) => {
  Record.find({description: "ARSON"}).then(result => {
      result.forEach(note => {console.log(note)})
      response.send(result)
  })
})

app.get("/test/:YYYY", async (request,response) => {
  console.log("Captured from URL")
  console.log(request.params.YYYY)
  response.send({})
})

app.get("/test/:YYYY/:MM/:DD", async (request,response) => {
  let year = request.params.YYYY;
  let month = request.params.MM;
  let date = request.params.DD;

  console.log("Captured from URL")
  console.log(year, month, date)

  let temp = new Date(`${year}-${month}-${date}T00:00:00.000Z`)
  console.log(temp)
  response.send({})
})

app.get("/attemptdate", async (request,response) => {
  Record.find({isoDate: {
    "$gte": new Date("2022-01-01T00:00:00.000Z"),
    "$lt": new Date("2022-01-30T23:59:00.000Z")
  }}).then(result => {
    //result.forEach(note => {console.log(note)})
    console.log(result)
    console.log(result.length)
    response.send(result)
  })
})

/*
// Should this just take the raw YYYY-MM-DD? Does splitting it accomplish anything?
app.get("/getDate/:YYYY/:MM/:DD", async (request,response) => {
  Record.find({isoDate: {
    "$gte": new Date(`${request.params.YYYY}-${request.params.MM}-${request.params.DD}T00:00:00.000Z`),
    "$lte": new Date(`${request.params.YYYY}-${request.params.MM}-${request.params.DD}T23:59:00.000Z`) 
  }}).then(result => {
    console.log(`${request.params.YYYY}-${request.params.MM}-${request.params.DD}`)

    console.log(result)
    console.log(result.length)
    response.send(result)
  })
})
*/


app.get("/getDate/:datestr", async (request,response) => {
  Record.find({isoDate: {
    "$gte": new Date(`${request.params.datestr}T00:00:00.000Z`),
    "$lte": new Date(`${request.params.datestr}T23:59:00.000Z`) 
  }}).then(result => {
    console.log(`${request.params.datestr}`)

    console.log(result)
    console.log(result.length)
    response.send(result)
  })
})


app.get("/", (request,response) => {
	response.send("<h1>Hello World</h1>")
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})