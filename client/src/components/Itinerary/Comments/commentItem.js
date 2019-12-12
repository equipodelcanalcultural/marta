import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CommentInput from './commentInput';

const CommentItem = props => {
  const [element, setElement] = useState();
  const {
    key,
    title,
    username,
    text,
    id,
    updateComment,
    deleteComment,
    logged,
    currentUser
  } = props;

  /*Variables para render condicional de botones Edit y Delete.
    Si el usuario está loggeado y el comment pertenece a currentUser,
    aparecen los dos botones*/
const updateAndReset= (input,targetId) =>{
  updateComment(input,targetId);
  setElement(regularItem)
}

  let editButton;
  let deleteButton;
  if (logged && currentUser == username) {
    editButton = (
      <button
        onClick={() => {
          setElement(editItem);
          console.log(id);
        }}
      >
        Edit
      </button>
    );
    deleteButton = (
      <button onClick={() => deleteComment(id)}> Delete </button>
    );
  }

  /*Elemento que muestra un comentario y, si corresponde, dos botones (Edit, Delete) */

  const regularItem = (
    <div>
      <span>{text}</span>
      {editButton}
      {deleteButton}
    </div>
  );

  /*Textbox para editar comentarios que reemplaza al elemento anterior 
  cuando uno hace click en Edit*/

  const editItem = (
    <div className="row justify-content-center">
      <CommentInput
        title={title}
        placeholder={text}
        callback={updateAndReset}
        id={id}
      ></CommentInput>
      <button
        onClick={() => {
          setElement(regularItem);
        }}
      >
        Back
      </button>
    </div>
  );

  /*En el primer render se pone regularItem como valor del hook element*/
  useEffect(() => setElement(regularItem), []);

  return (
    <Fragment>
      <h6>{username}</h6>
      {element}
    </Fragment>
  );
};
export default CommentItem;
