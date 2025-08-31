import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bustracker",
  password: "postgres",
  port: 5432,
});

const app = express();
const port = 8080;

const buses = [
  { id: 'Bus 1', lat: 11.2588, lng: 75.7804 },
  { id: 'Bus 2', lat: 11.2645, lng: 75.7840 }
];

let driverLocations = {};

app.use(cors());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());


app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.post("/submit",(req,res)=>{
    var role=req.body.role;
    if(role=="passenger"){
        res.render("index.ejs");
    }
    else{
        res.render("driver.ejs");
    }
})


app.post("/update-location", (req, res) => {
  const { driverId, lat, lng } = req.body;
  console.log(`Driver ${driverId} Location: Latitude=${lat}, Longitude=${lng}`);
  res.json({ status: "Location received" });
});

app.get("/driver-location", (req, res) => {
  res.json(driverLocations); // send all driver locations
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});