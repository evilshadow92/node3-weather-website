const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const name = 'Arturo Maciel'

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You need to provide an address'
        })
    }
    geocode(req.query.address, (error, {longitud, latitud, location} = {}) => {
        if(error){
            return res.send({ error })
            
        }
        forecast(longitud, latitud,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
                
            })
            
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'about me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'HELP',
        title: 'help',
        name
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error 404',
        errorMsg: 'Help article not found',
        name
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    else{
        res.send({
            products: []
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMsg: 'Page not found',
        name
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})