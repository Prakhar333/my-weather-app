const request=require('request')
// const geocode=(address,callback)=>
// {
//      const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoicHJha2hhcnNoYXJtYSIsImEiOiJja2F6ZTJrMGkwMnF5MnhyejVrdGhzeGh6In0.HLIbCMQVtbQkztchXpL6jA'

//      request({url:url,json:true },(error,response)=>
//      {
//           if(error)
//           {
//                callback('Unable to connect',undefined)
//           }
//           else if(response.body.features.length===0){
//                callback('Unable to find location',undefined)
               
//           }else{
               
//                callback(undefined,{
//                     latitude:response.body.features[0].center[0],
//                     longitude:response.body.features[0].center[1],
//                     location:response.body.features[0].place_name
//                })
//           }

//      })
// }
const geocode=(address,callback)=>
{
     const url='https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=db720badcbe44932a6cf50acf57f30c3'

     request({url , json:true },(error,{body})=>
     {
          if(error)
          {
               callback('Unable to connect',undefined)
          }
          else if(body.results.length===0){
               callback('Unable to find location',undefined)
               
          }else{
               
               callback(undefined,{
                    lattitude:body.results[0].geometry.lat,
                    longitude:body.results[0].geometry.lng,
                    location:body.results[0].formatted
               })
          }

     })
}

module.exports=geocode