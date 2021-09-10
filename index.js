const express = require('express'); 
const hbs = require('hbs'); 
const wax = require('wax-on');
const axios = require('axios')

const baseURL = "https://petstore.swagger.io/v2"; // --> note 1


/* 1. SETUP EXPRESS */
let app = express();

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs'); 

// 1C. SETUP STATIC FOLDER
app.use(express.static('public'));

// 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// 1E. ENABLE FORMS
app.use(express.urlencoded({extended:false}));

// 2. ROUTES
app.get('/', (req,res)=>{
    res.render('base')
})

app.get('/pets', async (req,res)=>{
    // --> note 2
    let response = await axios.get(baseURL + '/pet/findByStatus', {
        params:{
            'status':'available' 
        },
    })

    res.render('all_pets',{
        'all_pets': response.data // --> note 3
    })
})


// 3. RUN SERVER
app.listen(3000, ()=>console.log("Server started"))