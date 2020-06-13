const request=require('request')
const geocode=(address,callback)=>
{
     const url='https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=db720badcbe44932a6cf50acf57f30c3'

     request({url:url,json:true },(error,response)=>
     {
          if(error)
          {
               callback('Unable to connect',undefined)
          }
          else if(response.body.results.length===0){
               callback('Unable to find location',undefined)
               
          }else{
               
               callback(undefined,{
                    latitude_and_longitude:response.body.results[0].annotations.DMS,
                    location:response.body.results[0].formatted
               })
          }

     })
}

geocode('boston',(error,data)=>
{
 console.log('error',error)
 console.log('data',data)
})