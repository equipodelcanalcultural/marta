import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CommentInput from './commentInput';

const CommentItem = ({ title,
  username,
  text,
  id,
  updateComment,
  deleteComment,
  logged,
  currentUser }) => {
  const [textoParaMostrar, setTextoParaMostrar] = useState(text);
  const [element, setElement] = useState();
  const [showSomething, setShowSomething] = useState(true);
  const [repeat, setRepeat] = useState(false);

  const updateThisComment = (input, targetId) => {
    setTextoParaMostrar(input);
    setElement(commentElement);
   // updateComment(input, targetId);
  }

  const deleteThisComment = (targetId) => {
    setShowSomething(false);
    deleteComment(targetId);
  }

  const updateAndReset= (input,targetId) =>{
    updateComment(input,targetId);
    setElement(commentElement)
  }
  /*Variables para render condicional de botones Edit y Delete.
    Si el usuario está loggeado y el comment pertenece a currentUser,
    aparecen los dos botones*/

  let editButton;
  let deleteButton;
  if (logged && currentUser == username) {
    editButton = (
      <button
        title={'Edit'}
        onClick={() => {
          setElement(textBoxElement);
          console.log(id);
        }}
      >
        Edit
      </button>
    );
    deleteButton = (
      <button title={'Delete'} onClick={() => deleteThisComment(id)}> Delete </button>
    );
  }

  /*Elemento que muestra un comentario y, si corresponde, dos botones (Edit, Delete) */
console.log('comment item', username)
  const commentElement = (
    <view>
      <span>{textoParaMostrar}</span>
      {/* {editButton} */}
      {deleteButton}
    </view>
  );

  /*Textbox para editar comentarios que reemplaza al elemento anterior 
  cuando uno hace click en Edit*/

  const textBoxElement = (
    <div className="row justify-content-center">
      <CommentInput
        title={title}
        placeholder={text}
        callback={updateThisComment}
        id={id}
      ></CommentInput>
      <button title={'Back'}
        onClick={() => {
          setElement(commentElement);
        }}
      >
        Back
      </button>
    </div>
  );

  let algoParaMostrar;

  if (showSomething) {
    algoParaMostrar = (<div>
      <h6>{username}</h6>
      {element}
    </div>)
  }

  /*En el primer render se pone regularItem como valor del hook element*/
  useEffect(() => setElement(commentElement), []);

  console.log(textoParaMostrar);
  return (
    <Fragment>
      {algoParaMostrar}
    </Fragment>
  );
};

export default CommentItem;