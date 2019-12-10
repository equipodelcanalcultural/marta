import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { CommentItem } from "./CommentItem";




const CommentList = ({ comments, title, city, logged, user, callback, usuarioActual }) => {



  let listaDeComentarios;
  if(comments != null) {

    listaDeComentarios = (comments.map((comment, index) => (
    
          <CommentItem
            key={`key#${title}#${index}`}
            title={title}
            username={comment.username}
            text={comment.text}
            id={comment._id}
            callback={callback}
            logged ={logged}
            usuarioActual = {usuarioActual}
          />
      
      ))
    )


  }






  return (
    <div>
      {listaDeComentarios}
    </div>
  );
};

export default CommentList;

