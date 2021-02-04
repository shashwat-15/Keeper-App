const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const router = express.Router();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", router);

mongoose.connect("mongodb://localhost:27017/notesDB", {useUnifiedTopology: true, useNewUrlParser: true});

const notesSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model("Note", notesSchema);

app.route("/")
    .get(function(req, res){
        Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
    });

app.route("/addNote")
    .post(function(req, res){
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        });
        newNote.save()
            .then(() => res.send(newNote._id))
            .catch(err => res.status(400).json("Error: "+ err));
    });

app.route("/:noteId")
    .delete((req,res) => {
        Note.findByIdAndDelete(req.params.noteId)
        .then(() => res.send("Deleted successfully"))
        .catch(err => res.status(400).json("Error: "+ err));
    });


app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});