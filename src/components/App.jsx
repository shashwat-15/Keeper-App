import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import qs from "qs";

function App() {
  
  const [notes, setNotes] = useState([]);
  const [useEffectCall, setUseEffectCall] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/")
      .then(res => {
        setNotes(res.data);
        //console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      //console.log(useEffectCall);
  }, [useEffectCall]);

  function addNote(note) {
    const newNote = qs.stringify({
      title: note.title,
      content: note.content
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.post(
      'http://localhost:3001/addNote',
      newNote,
      headers
    ).then(res => {
      console.log("new note added!");
      setUseEffectCall(`add ${res.data}`);
    });
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:3001/${id}`)
      .then(res => {
        console.log(res.data);
        setUseEffectCall(`delete ${id}`);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea addButtonOnClick={addNote} />
      {notes.map((note) => {
        return (
          <Note
            key={note._id}
            _id={note._id}
            title={note.title}
            content={note.content}
            deleteButtonOnClick={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
