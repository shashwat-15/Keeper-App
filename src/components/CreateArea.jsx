import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [showTitle, setShowTitle] = useState(false);

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

  function clickHandler() {
    setShowTitle(true);
  }

  return (
    <div>
      <form className="create-note">
        <input
          onChange={changeHandler}
          name="title"
          placeholder="Title"
          value={note.title}
          style={{ display: showTitle ? "block" : "none" }}
        />
        <textarea
          onChange={changeHandler}
          onClick={clickHandler}
          name="content"
          placeholder="Take a note..."
          rows={showTitle ? 3 : 1}
          value={note.content}
        />
        <Zoom in={showTitle}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
