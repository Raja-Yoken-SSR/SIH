import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const buses = [
  { id: 'Bus 1', lat: 11.2588, lng: 75.7804 },
  { id: 'Bus 2', lat: 11.2645, lng: 75.7840 }
];



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 


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








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});