const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const pathToPage = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathToPage))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app",
        name: "Stefan"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Stefan"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        help: "This is a help message",
        name: "Stefan"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Provide valid location."
        })
        
    }
    
    const {address} = req.query
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            res.send({error});
        } else {
            //const {latitude, longitude, location} = response ? response : {};
            forecast(latitude, longitude, (error, forecast) => {
                if(error){
                    return res.send({
                        error
                    })
                } else {
                    res.send({
                        forecast,
                        location,
                        address
                    })
                }
            });
        }
    })
})

app.get("/products", (req, res)=> {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("help-article-not-found", {
        title: "Error 404",
        name: "Stefan",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("page-not-found", {
        title: "Error 404:",
        errorMessage: "Page not found",
        name: "Stefan"
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})