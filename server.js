const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    
    fs.appendFile('server.log', log, (err) => {
        if(err) {
            console.log('Unable to append log to file');
        }
    });
    next();
});
//app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//               pageTitle: 'The site is currently under MAINTENANCE!!!'
//               })
//})


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       message: 'Welcome to this site'
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});



app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});





































