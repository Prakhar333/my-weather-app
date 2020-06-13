const request=require('request')


const forecast=(lattitude,longitude,callback)=>
{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&%20&appid=684d1c8bfe9174032337af94da3add58&units=metric'
    request({url, json:true},(error,{ body })=>
    {
        if(error){
            callback('Unable to connect!',undefined)
        }

        else if(body.message>0){
            callback('Unable to fetch such coordinates',undefined)

        }
        else
        {
            callback(undefined,body.current.weather[0].main+ ' today. Currently its '+body.current.temp+' degrees out. '+body.hourly[0].weather[0].description+' outside')
        }
    })
}

module.exports=forecast

