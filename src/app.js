const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//configure express path
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

app.use(express.static(publicDirPath))

//set handlebar and views property
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.listen(port, () => {
    console.log('server is running on port' + port)
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App!!",
        name: "Shivani Agrawal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Shivani Agrawal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page...",
        message: "Sample message",
        name: "Shivani Agrawal"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

   if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(address, (error, {latitude,longitude,location} = {}) => {
        if(error) {
            return  res.send({ error })
        }
        forecast(latitude,longitude,(error,data) => {
            if(error) {
                return  res.send({ error })
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: "404",
        errorMsg:"help article not found",
        name: "Shivani Agrawal"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: "404",
        errorMsg:"My 404 page",
        name: "Shivani Agrawal"
    })
})