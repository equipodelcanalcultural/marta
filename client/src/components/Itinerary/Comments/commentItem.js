import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CommentInput from './commentInput';

function CommentItem ({ title,
  username,
  text,
  id,
  updateComment,
  deleteComment,
  logged,
  currentUser })  {
 
    const [element, setElement] = useState();
    const [showSomething, setShowSomething] = useState(true);
    const [textoParaMostrar, setTextoParaMostrar] = useState(text);


    const updateThisComment = async (input, targetId) => {
      if (input) {
    setTextoParaMostrar(input);
    updateComment(input, targetId);
      } 
      else 
      setElement(commentElement)
    }

    const deleteThisComment = (targetId) => {
    setShowSomething(false);
    deleteComment(targetId);
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

  const commentElement = (
    <view>
      <span>{textoParaMostrar}</span>
       {editButton} 
      {deleteButton}
    </view>
  );

  /*Textbox para editar comentarios que reemplaza al elemento anterior 
  cuando uno hace click en Edit*/

  const textBoxElement = (
    <div className="row justify-content-center">
      <CommentInput
        title={title}
        placeholder={textoParaMostrar}
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

  useEffect(() => {setElement(commentElement)}, [textoParaMostrar]);

  return (
    <Fragment>
      {algoParaMostrar}
    </Fragment>
  );
};

export default CommentItem;