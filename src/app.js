const path  = require('path')
const express = require('express')
const hbs = require('hbs')
const geotag = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths or express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectorypath))

/* Route Handelers */
//rednder index view {render dynamic values}
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Details',
        name : 'Rukmal Senarath',
        navlinkcssHOME: 'nav-item active',
        navlinkcssABOUT: 'nav-item ',
        navlinkcssHELP: 'nav-item '
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us ',
        name : 'Rukmal Senarath',
        navlinkcssHOME: 'nav-item ',
        navlinkcssABOUT: 'nav-item active',
        navlinkcssHELP: 'nav-item '
    })
}) 

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help  ',
        message: "Here is all the help you can get",
        name : 'Rukmal Senarath',
        navlinkcssHOME: 'nav-item ',
        navlinkcssABOUT: 'nav-item ',
        navlinkcssHELP: 'nav-item active'
    })
})

//also called end point
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "no address found"
        })
    }
    //destructuring
    geotag.geoCode(req.query.address,(error,{location, latitude,  longitude} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast.forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send(
                    {
                        error : error
                    }
                )
            }
            res.send({
                forecast : forecastdata,
                location, //shorthand syntax
                address : req.query.address
            })
        } )
    })
})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: "404 Not Found",
        innertitle : "Undefined Help",
        message: "Undefine Help Page ERROR : 404"
    })
})

app.get('*', (re,res) => {
    //this route handler should be in the last of all route handlers
    res.render('404',{
        title: "404 Not Found",
        innertitle : "Undefined Page",
        message: "Undefine Page ERROR : 404"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})