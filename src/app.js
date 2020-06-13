const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')

//Define Path For Express Config..
const app=express(path.join(__dirname,'../public'))
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(request,response)=>
{
    response.render('index',{
        title:'Weather app',
        name:'Prakhar'
    })
})

app.get('/about',(request,response)=>
{
    response.render('about',{
        title:'About Page',
        name:'Prakhar'
    })
})

app.get('/help',(request,response)=>
{
    response.render('help',{
        title:'Help Page!',
        name:'Prakhar'
    })
})

app.get('/weather',(request,response)=>
{
    if(!request.query.address)
    {
        return response.send({
            error:'Must enter and address to get the weather'
        })
    }  
    
    geocode(request.query.address,(error,{lattitude, longitude, location}={})=>
    {
        if(error)
        {
            return response.send({
                error
            })
        }

        forecast(lattitude,longitude,(error, forecastData)=>{
            if(error)
            {
                return response.send({
                    error
                })
            }

            response.send({
                forecast:forecastData,
                location,
                address:request.query.address
            })

        })
    })
    
    
    
    // response.send({
    //     location:request.query.address
    // })
})

app.get('/products',(request,response)=>
{
    if(!request.query.search)
    {
        return response.send({
            error:'Must enter search term'
        })
    }

    console.log(request.query.search)
    response.send({
        product:[]
    })
})

app.get('/help/*',(request,response)=>
{
    response.render('404.hbs',{
        title:'404',
        name:'PrakharSharma',
        errorMessage:'Help page not found!'
    })
})

app.get('*',(request,response)=>
{
   response.render('404',{
          title:'404',
          name:'Prakhar',
          errorMessage:'Page Not found'
   })
})


app.listen(3000,()=>
{
    console.log('Server is UP on port 3000')
})