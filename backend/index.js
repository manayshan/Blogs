const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const userRoutes = require('./routes/userRoutes');
const User = require('./models/userModel');

const app = express();

mongoose.connect('mongodb://localhost/blogs', {useNewUrlParser: true} );

var port = process.env.port || 8000;
app.use(cors());
app.use(
    bodyParser.urlencoded({
    extended:true
    })
);
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use('/users', userRoutes);

app.get("/", function(req, res){
    res.render("html.ejs");
})
app.get("/:id", function(req, res) {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, user) {
        if(err) {
            res.json({ Status:"error", Error:err});
        }
        else{
            res.json({ Status:"success", Data: user});
        }
    });
});

app.listen(port, ()=>{
    console.log('Server is running on', port);
});