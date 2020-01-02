const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

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
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// app.get("/", function(req, res){
//     res.render("html.ejs");
// });

app.listen(port, ()=>{
    console.log('Server is running on', port);
});