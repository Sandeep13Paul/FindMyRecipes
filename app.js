const express = require('express');
const  mongoose = require('mongoose');
const app = express();
const path = require('path');
const Recepie = require('./models/blog');

// connect to database
const dburi = "mongodb+srv://netninja:test1234@cluster0.noj8wgu.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("connected to db");
    app.listen(5500, () => {console.log("server started at port 5500")});
    
})
.catch((err) => {
    console.log(err);
})

// path += "\\public";

app.set('view engine', 'ejs');
// app.set('views', path);
app.set('views', path.join(__dirname, 'public'));

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.redirect('/recepies');
})

app.get('/about', (req, res) => {
    res.render('about', { root: __dirname });
})

app.get('/contact', (req, res) => {
    res.render('contact', { root: __dirname });
})

//blog routes
app.get('/recepies', (req, res) => {
    Recepie.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { root: __dirname, recepies: result });
    })
    .catch()
})

app.post('/recepies', (req, res) => {
    const recepie = new Recepie(req.body);

    recepie.save()
    .then((result) => {
        res.redirect('/recepies');
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/create', (req, res) => {
    res.render('create', { root: __dirname });
})

app.get('/recepies/:id', (req, res) => {
    const id = req.params.id;

    Recepie.findById(id)
    .then((result) => {
        res.render('details', { recepie: result });
    })
    .catch((err) => {
        console.log(err);
    })
})

app.delete('/recepies/:id', (req, res) => {
    const id = req.params.id;

    Recepie.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/recepies' });
    })
    .catch((err) => {
        console.log(err);
    })
})

