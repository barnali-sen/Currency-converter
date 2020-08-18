const request = require('request')


const currency = (callback)=>{
    //console.log("currency")
    const url = 'https://free.currconv.com/api/v7/currencies?apiKey=cb67654087f294a5426f';
    request({url:url,json:true},(error,response)=>
    {                                   
        if(error){
            callback('Unable to connect to server!',undefined)
        }else{
            const data = response.body.results
            callback(undefined,data)
        }
    })
}
module.exports = currency