const path = require('path')
const express = require('express');
const { log } = require('console');
const hbs =require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// def paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials/')

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

// handlebars setup engine and views location
app.set('view engine','hbs')
app.set('views', path.join(viewsDir))
hbs.registerPartials(partialsDir)

// setup static directory to serve
app.use(express.static(publicDir))


app.get('',(req, res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Jos'
  })
})

app.get('/about',(req, res) => {
  res.render('about',{
    title: 'about',
    name: 'Jos'
  })
})

app.get('/help',(req, res) => {
  res.render('help',{
    title: 'Help',
    text: 'Helpfull text ?',
    name: 'Jos'
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address"
    })
  }

  geocode(req.query.address, (error,{lat , lon , location} = {}) => { // empty obj value when no argument is provided
    if (error) {
      return res.send({error}); // shorthand for {error : error} 'destruterized obj
    }
  
    
    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
  
  
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
  
  
    })
  })


})

app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }
  
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    errorTitle: 'Help article not found!',
    linkText: "return to help page",
    link: "/help",
    name: "jos"
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    errorTitle: 'page not found!',
    linkText: "return to main page",
    link: "/",
    name: "jos"
  })
})

app.listen(3000, () => {
  console.log('Server is up!');
})

