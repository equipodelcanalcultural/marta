import React from "react";
import { useState } from "react";


export default function CommentInput(props) {
  const [textInput, setTextInput] = useState();
const {callback, placeholder, id} = props
  return (
    <form>
      <input
        onChange={e => {
          setTextInput(e.target.value);
        }}
        id="comments"
        type="text"
        placeholder={placeholder}
        value={textInput}
        width="10em"
      ></input>
      <button
        variant="primary"
        type="submit"
        onClick={
          (event) => {
            event.preventDefault();
            event.stopPropagation();
            callback(textInput,id);
          }
        }
      >
        Send
      </button>
    </form>
  );
}