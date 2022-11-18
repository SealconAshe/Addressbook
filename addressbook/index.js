//NOTE: This project has models, public, routes and views folders.
//models file was used to create the mongodb schema.
//public file was used to create CSS codes.
//routes file was used to create the routes for Postman application as an alternative to editing.
//views folder was created for html files to hold together and tidy.
//main application file is index.js



// IMPORTS ///////////////////////////////////////////////////////////////////////////////////////
import express from 'express'; //import express 
import bodyParser from 'body-parser'; //import bodyparser middleware
import usersRoutes from './routes/users.js'; //import routes for POSTMAN Mode
import mongoose from 'mongoose'; //import mongoose
import Contact from './models/Contact.js'; //import mongodb schemas
//////////////////////////////////////////////////////////////////////////////////////////////////
const app = express(); //created app
const PORT = 3000; // server port number
app.use(express.static('public')); //to use css file, describe the folder named public
app.set('view engine','ejs'); //activated ejs template to embed js codes in html
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// MONGODB PLUGIN DEFINITION /////////////////////////////////////////////////////////////////////
//username = "sinan";
//password = "1KoEOGhKr5jVTilG"
//mongoDB Compass Link = mongodb+srv://sinan:1KoEOGhKr5jVTilG@addressbookv1.iezicwe.mongodb.net/test
const dbURL = 'mongodb+srv://sinan:1KoEOGhKr5jVTilG@addressbookv1.iezicwe.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dbURL) //connect to MongoDB server
    .then((result) => {console.log('MongoDB Connection is Established')}) //after connection, write to console
    .catch((err) => {console.log(err)}) //if there is an error, write to console error message
//////////////////////////////////////////////////////////////////////////////////////////////////
//middlewares
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use(express.urlencoded({ extended: true}))
//////////////////////////////////////////////////////////////////////////////////////////////////
// pages /////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req,res) => {
    Contact.find().sort({createdAt: 1})
        .then((result)=> {
            res.render('index.ejs', {title: 'Mainpage', contacts: result})
}) .catch((err) => {
    console.log(err)})})


app.get('/contacts', (req,res) => {
    Contact.find().sort({createdAt: 1})
        .then((result)=> {
            res.render('contacts.ejs', {title: 'Contacts', contacts: result})
}) .catch((err) => {
    console.log(err)})})


app.get('/detailcontacts/:id', (req,res) => {
    const id = req.params.id
    Contact.findById(id)
    .then((result) => {
        res.render('detailcontacts',{contacts: result, title: 'details'})
    }).catch((err) => {
        res.status(404).render('nofound', {title: ':D :D :D'})})})
//////////////////////////////////////////////////////////////////////////////////////////////////
// Edit pages ////////////////////////////////////////////////////////////////////////////////////
app.get('/edit', (req, res) => {
    Contact.find().sort({createdAt: 1})
        .then((result)=> {
            res.render('edit', {title: 'Editor', contacts: result})
}) .catch((err) => {
    console.log(err)})})

    app.get('/edit/add', (req,res) => {
    res.render('add', {title: 'New Contact'})
})

app.get('/edit/update', (req,res) => {
    res.render('update', {title: 'Patch Page'})
})


app.post('/edit/add', (req,res) => {
    const contact = new Contact(req.body)
    contact.save()
    .then((result) => {
        res.redirect('/edit')
    }) .catch((err) => {
        res.status(404).render('faultyinput', {title: ':D :D :D'})
        console.log(err)
    })
})

app.delete('/edit/delete/:id', (req,res) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id)
    .then((result) =>{
        res.json({link:'/edit'})
    }).catch((err) => {
        console.log(err);
    })
})

//IF YOU CLICK UPDATE LINK ON BROWSER THE INFORMATIONS WILL UPDATE. However, there is a problem here.
//this problem is: if you click update link page'll go update page but this page is not working.
//So, If you click update link then you must go back the edit page.
app.patch('/edit/update/:id', (req,res) => {
    const id= req.params.id
    Contact.findByIdAndUpdate(id, { firstname: 'Sinan' }, //YOU MUST CHANGE AS MANUAL THIS LINE FOR UPDATE
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs); //Write to console previous user informations
    }
})
    .then((result) =>{
        res.json({link:'/edit'})
    }).catch((err) => {
        console.log(err);
    })
})
//////////////////////////////////////////////////////////////////////////////////////////////////
//Search Contact ////////////////////////////////////////////////////////////////////////////////
Contact.find({firstname: 'Kemal'}, (err,result) => {
    if(err){
        console.log(err)
    } else{
        console.log(result)
    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////
//Search and Update Contact information ///////////////////////////////////////////////////////////////////
let doc = await Contact.findOneAndUpdate(
    {firstname: 'Sinan', lastname:'Atıcı'},
    {firstname: 'Kemal', lastname: 'Güven', address: 'Tekirdağ', number: 651654, email: 'asd@gmail.com'},
    {new: true}
    );



//////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req,res) => {res.status(404).render('nofound', {title: ':D :D :D'})})//this must be last statement.
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)) // for backticks press alt+96
//////////////////////////////////////////////////////////////////////////////////////////////////