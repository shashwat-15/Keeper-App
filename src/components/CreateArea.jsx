import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function changeHandler(event) {
    const { name: targetName, value: newValue } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [targetName]: newValue
      };
    });
  }

  function addNote(event) {
    props.addButtonOnClick(note);
    setNote({
      title: "",
      content: ""
    });

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          onChange={changeHandler}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={changeHandler}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
