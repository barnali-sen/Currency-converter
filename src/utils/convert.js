
const request = require('request');


const convert = (val,callback)=>{
    const url = 'https://free.currconv.com/api/v7/convert?q='+encodeURIComponent(val)+'&compact=ultra&apiKey=cb67654087f294a5426f';
    request({url : url,json : true},(error,{body})=>{
        if(error){
            callback('unable to connect convert!',undefined)
        }else if(body.error){
            callback('Inappropriate query!',undefined)
        }else{
            callback(undefined,body)
        }
    })
}
module.exports = convert