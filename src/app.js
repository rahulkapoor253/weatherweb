const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = 3000;
console.log(path.join(__dirname, '../public'));
const app = express();
const partialPath = path.join(__dirname, './views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);//let hbs know about the partials
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        year : '2020'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        year : '2020'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        year : '2020'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address to fetch weather'
        });
    }

    //init the destructure properties with defaults to avoid crash
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        //call forecast with long lat
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast : forecastResponse,
                location : location
            });
        });
    });
    //res.send("Weather fetched...");
});

app.get('*', (req, res) => {
    res.render('error404', {
        title : 'Error Page',
        year : '2020'
    });
});

app.listen(port, () => {
    console.log("listening on port " + port);
});