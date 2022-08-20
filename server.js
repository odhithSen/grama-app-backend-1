//import dependancies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/api_routes.js";

const app = express ();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


// should make this an .env variyable
const CONNECTION_URL = "mongodb+srv://odhithSen:bVGaMLuIj5n5SZ5w@cluster0.0p0tv.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true})
// .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
// .catch((error)=> console.log(error.message));


app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))
app.use("/", routes)
