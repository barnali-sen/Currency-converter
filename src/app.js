const path = require('path')
const express = require('express')
const hbs = require('hbs')

const currency = require('./utils/currency')
const convert = require('./utils/convert')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Currency converter',
        name:'Barnali sen'
    })
})

app.get('/currencies',(req,res)=>{
    currency((error,currencydata)=>{
        if(error){
            return res.send({
                e : error
            })
        }
        res.send({
            value : currencydata
        })
    })
})

app.get('/convert',(req,res)=>{
    if(!req.query.q){
        return res.send({
            error : 'Please provide the country codes!'
        })
    }
    convert(req.query.q,(error,convertedValue)=>{
        res.send({
            result : convertedValue
        })    
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        title: 'Currency converter',
        name:'Barnali sen',
        errorMsg : 'Page not found'
    })
})

app.listen(6500,()=>{
    console.log('6500 is up!')
})
